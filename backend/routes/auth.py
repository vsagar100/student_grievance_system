from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import User
from sqlalchemy.exc import SQLAlchemyError
from flask_bcrypt import check_password_hash  # Import bcrypt password verification
import logging

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signin', methods=['POST'])
def signin():
    try:
        if not request.is_json:
            return jsonify({"status": "error", "message": "Invalid JSON format"}), 400

        email = request.json.get('email', '').strip()
        password = request.json.get('password', '').strip()

        if not email or not password:
            return jsonify({"status": "error", "message": "Email and password are required"}), 400

        user = User.query.filter_by(email=email).first()
        print(f"{user.password:<20}")
        #print(f"{generate_password_hash(password).decode('utf-8')}")
        if not user:            
            return jsonify({"status": "error", "message": "Invalid email or password"}), 401

        # Use bcrypt to verify the provided password against the stored hashed password
        if not check_password_hash(user.password, password):
            return jsonify({"status": "error", "message": "Invalid email or password"}), 401

        # Create access token if authentication is successful
        access_token = create_access_token(identity={'user_id': user.user_id, 'role': user.role})

        return jsonify({
            "status": "success",
            "message": "Login successful",
            "token": access_token,
            "user": {
                "user_id": user.user_id,
                "username": user.username,
                "email": user.email,
                "role": user.role
            }
        }), 200

    except SQLAlchemyError as e:
        logging.error(f"Database error: {str(e)}")
        return jsonify({"status": "error", "message": "Internal server error"}), 500

    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        return jsonify({"status": "error", "message": "Internal server error"}), 500
