from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from textblob import TextBlob  # Import TextBlob for sentiment analysis
import os
from models import db, Grievance
import uuid

get_grievances_bp = Blueprint('get_grievances', __name__)

@get_grievances_bp.route('/get/all', methods=['GET'])
def get_grievances():
    try:
        # Fetch all grievances from the database
        grievances = Grievance.query.all()
        grievances_list = [
            {
                'id': grievance.grievance_id,
                'category': grievance.category,
                'description': grievance.description,
                'status': grievance.status,  # Assuming there's a 'status' column in the table
                'sentiment': grievance.sentiment,
                'priority': grievance.priority,
                'file_path': grievance.file_path,
                'created_by': grievance.created_by,
                'created_date': grievance.created_date.strftime('%Y-%m-%d %H:%M:%S'),
                'modified_by': grievance.modified_by,
                'modified_date': grievance.modified_date.strftime('%Y-%m-%d %H:%M:%S')
            }
            for grievance in grievances
        ]
        return jsonify(grievances_list), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
