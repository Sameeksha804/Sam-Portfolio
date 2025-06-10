from flask import Flask
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'simisuchi804@gmail.com'
app.config['MAIL_PASSWORD'] = 'iynl xxlp iokd kemt'  # Your app password
app.config['MAIL_DEFAULT_SENDER'] = 'simisuchi804@gmail.com'

mail = Mail(app)

def test_email():
    with app.app_context():
        try:
            html_content = '''
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        background-color: #4a90e2;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        border-radius: 5px 5px 0 0;
                    }
                    .content {
                        background-color: #f9f9f9;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 0 0 5px 5px;
                    }
                    .message {
                        background-color: white;
                        padding: 15px;
                        border-radius: 5px;
                        margin-top: 15px;
                        border-left: 4px solid #4a90e2;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #666;
                        font-size: 0.9em;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>Test Email</h2>
                </div>
                <div class="content">
                    <p>This is a test email from your portfolio website.</p>
                    <div class="message">
                        <p>If you're receiving this email, it means your email configuration is working correctly!</p>
                    </div>
                </div>
                <div class="footer">
                    <p>This message was sent from your portfolio website.</p>
                </div>
            </body>
            </html>
            '''
            
            msg = Message(
                subject='Test Email from Portfolio',
                recipients=[app.config['MAIL_USERNAME']],
                html=html_content
            )
            mail.send(msg)
            print("Test email sent successfully!")
        except Exception as e:
            print(f"Error sending test email: {str(e)}")

if __name__ == '__main__':
    test_email() 