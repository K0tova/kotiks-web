from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Email configuration
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')  # Load email from .env
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')  # Load password from .env

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    sender_email = data.get('email')
    message_body = data.get('message')

    if not sender_email or not message_body:
        return jsonify({'error': 'Email and message are required'}), 400

    try:
        # Create the email
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = "New Contact Form Submission"
        msg.attach(MIMEText(f"Message from {sender_email}:\n\n{message_body}", 'plain'))

        # Send the email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)

        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': 'Failed to send email'}), 500

if __name__ == '__main__':
    app.run(port=5000)