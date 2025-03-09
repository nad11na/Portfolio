#routes.py

from flask import Blueprint, render_template

# Create a Blueprint for the main routes
main = Blueprint('main', __name__)

@main.route('/')
def home():
    return render_template('home.html', title="Main Page")

@main.route('/about')
def about():
    return render_template('about.html', title="About Me")

@main.route('/portfolio')
def portfolio():
    return render_template('portfolio.html', title="Some of My Best Work")
