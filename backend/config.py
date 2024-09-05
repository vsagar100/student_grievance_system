import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:////home/azureuser/code/grv_project/DB/grievance_system.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')  # Use environment variable in production
