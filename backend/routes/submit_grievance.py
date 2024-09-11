from flask import Blueprint, request, jsonify
from flask import current_app
from werkzeug.utils import secure_filename
from textblob import TextBlob  # Import TextBlob for sentiment analysis
import os
from models import db, Grievance
import uuid
import datetime  # For setting created_date and modified_date

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
def set_priority_based_on_sentiment(sentiment):
    if sentiment == 'negative':
        return 'high'
    elif sentiment == 'neutral':
        return 'medium'
    else:
        return 'low'

@submit_grievance_bp.route('/submit', methods=['POST'])
def submit_grievance():
    try:
        # Get form data
        category = request.form.get('category')
        description = request.form.get('description')
        student_id = request.form.get('student_id')

        # Default status - initially setting to 'submitted'
        status = 'submitted'

        # Analyze sentiment of the grievance description
        sentiment = analyze_sentiment(description)

        # Automatically set priority based on sentiment
        priority = set_priority_based_on_sentiment(sentiment)  # chatGPT to set based on sentiment

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

        return jsonify({'status': 'success', 'message': 'Grievance submitted successfully', 'sentiment': sentiment, 'priority': priority, 'status': status, 'created_by': created_by, 'created_date': created_date, 'modified_by': modified_by, 'modified_date': modified_date, 'file_path': file_path}), 200

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
