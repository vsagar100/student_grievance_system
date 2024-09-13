from flask import Blueprint, request, jsonify
from flask import current_app
from werkzeug.utils import secure_filename
from textblob import TextBlob  # Import TextBlob for sentiment analysis
import os
from models import db, Grievance
import uuid
import datetime  # For setting created_date and modified_date

from notifications import send_notification

submit_grievance_bp = Blueprint('submit_grievance', __name__)

# Path for saving uploads
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '../uploads')

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx'}

# Check if the file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Function to analyze sentiment using TextBlob
def analyze_sentiment(description):
    analysis = TextBlob(description)
    polarity = analysis.sentiment.polarity

    if polarity > 0:
        return 'positive'
    elif polarity < 0:
        return 'negative'
    else:
        return 'neutral'

# Function to auto-set the priority based on the issue description's sentiment
def set_priority_based_on_sentiment(description):
    blob = TextBlob(description)
    polarity = blob.sentiment.polarity

    # Assign priority based on polarity
    if polarity < -0.5:
        return "high"
    elif -0.5 <= polarity <= 0.1:
        return "medium"
    else:
        return "low"
        
# Function to categorize grievance description
def categorize_grievance(description):
    # Define keywords for each category
    academic_keywords = ['professor', 'lecture', 'exam', 'course', 'assignment', 'class']
    facilities_keywords = ['hostel', 'lab', 'canteen', 'library', 'wifi', 'water', 'electricity']
    administration_keywords = ['admission', 'registration', 'fee', 'scholarship', 'staff', 'administration']

    # Convert description to lowercase for easier comparison
    description_lower = description.lower()

    # Check for keywords and assign category
    if any(word in description_lower for word in academic_keywords):
        return "Academic"
    elif any(word in description_lower for word in facilities_keywords):
        return "Facilities"
    elif any(word in description_lower for word in administration_keywords):
        return "Administration"
    else:
        return "General"



@submit_grievance_bp.route('/submit', methods=['POST'])
def submit_grievance():
    try:
        # Get form data
        
        description = request.form.get('description')
        student_id = request.form.get('student_id')

        category = categorize_grievance(description)  #request.form.get('category')

        # Default status - initially setting to 'submitted'
        status = 'submitted'

        # Analyze sentiment of the grievance description
        sentiment = analyze_sentiment(description)

        # Automatically set priority based on sentiment
        priority = set_priority_based_on_sentiment(description)

        # Set system user ID (for demo purposes, let's assume it's hardcoded)
        gbl_system_user_id = current_app.config['SYSTEM_USER_ID'] #g.get('SYSTEM_USER_ID', 'Default Value')
                

        # Check if category and description are provided
        if not category or not description:
            return jsonify({'status': 'error', 'message': 'Category and description are required fields.'}), 400

        # Handle file upload
        file = request.files.get('file')
        file_path = None
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            unique_filename = str(uuid.uuid4()) + "_" + filename
            file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
            file.save(file_path)

        # Get current date and time for created_date and modified_date
        current_date_time = datetime.datetime.utcnow()
        print(f"{gbl_system_user_id}")
        # Create new grievance object
        grievance = Grievance(
            student_id=student_id,
            category=category,
            description=description,
            status=status,  # Status set as 'submitted'
            sentiment=sentiment,  # Store sentiment in the database
            priority=priority,  # Set priority based on sentiment
            created_by=gbl_system_user_id,
            created_date=current_date_time,  
            modified_date=current_date_time, 
            modified_by=gbl_system_user_id,  # Set modified_by to the same as created_by initially
            file_path=file_path
        )

        # Save grievance to the database
        db.session.add(grievance)
        db.session.commit()
        
        grievance_id = grievance.grievance_id
        user_id = student_id
        notification_message = f"Your grievance (ID: {grievance_id}) has been successfully submitted."
        
        # Send email notification (for now, we simulate it)
        if not send_notification(user_id=user_id, grievance_id=grievance_id, message=notification_message, notification_type='email'):
            raise Exception("Failed to send notification")


        return jsonify({'status': 'success', 'message': 'Grievance submitted successfully', 'sentiment': sentiment, 'priority': priority, 'status': status}), 200
        # , 'created_date': created_date, 'modified_by': modified_by, 'modified_date': modified_date, 'file_path': file_path}), 200

    except Exception as e:
        print(f"{str(e)}")
        return jsonify({'status': 'error', 'message': str(e)}), 500
