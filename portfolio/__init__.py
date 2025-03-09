#init.py

import os
from flask import Flask
from .routes import main

def create_app():
    app = Flask(__name__, instance_relative_config=True)

    # Load configurations (if needed)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_default_secret_key')

    # Ensure the instance folder exists
    os.makedirs(app.instance_path, exist_ok=True)


    app.register_blueprint(main)

    return app
