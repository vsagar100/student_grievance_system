from flask import Flask, jsonify  
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    @app.route('/api/test', methods=['GET'])
    def test():
        return jsonify({"status": "success", "message": "The server is running correctly!"})


    with app.app_context():
        # Import the blueprint inside the function
        from routes.auth import auth_bp
        app.register_blueprint(auth_bp, url_prefix='/api/auth')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
