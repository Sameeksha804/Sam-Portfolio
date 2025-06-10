from flask import Flask, render_template, request, jsonify, send_file, send_from_directory
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__, 
    static_folder='.',  # Serve files from the root directory
    template_folder='pages'
)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', 'simisuchi804@gmail.com')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD', 'iynl xxlp iokd kemt')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME', 'simisuchi804@gmail.com')

# Debug email configuration
logger.debug(f"Email configuration: {app.config['MAIL_USERNAME']}")
logger.debug(f"Email password set: {'Yes' if app.config['MAIL_PASSWORD'] else 'No'}")

mail = Mail(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/css/<path:filename>')
def serve_css(filename):
    return send_from_directory('css', filename)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('js', filename)

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('images', filename)

@app.route('/download-resume')
def download_resume():
    try:
        return send_file(
            'assets/resume.pdf',
            as_attachment=True,
            download_name='Sameeksha_Shrivastava_Resume.pdf'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        if not data:
            logger.error("No data provided in request")
            return jsonify({'error': 'No data provided'}), 400

        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        logger.debug(f"Received form data - Name: {name}, Email: {email}, Message: {message}")

        if not all([name, email, message]):
            logger.error("Missing required fields")
            return jsonify({'error': 'All fields are required'}), 400

        # Create HTML email template
        html_content = f'''
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }}
                .header {{
                    background-color: #4a90e2;
                    color: white;
                    padding: 20px;
                    text-align: center;
                    border-radius: 5px 5px 0 0;
                }}
                .content {{
                    background-color: #f9f9f9;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 0 0 5px 5px;
                }}
                .message {{
                    background-color: white;
                    padding: 15px;
                    border-radius: 5px;
                    margin-top: 15px;
                    border-left: 4px solid #4a90e2;
                }}
                .footer {{
                    text-align: center;
                    margin-top: 20px;
                    color: #666;
                    font-size: 0.9em;
                }}
            </style>
        </head>
        <body>
            <div class="header">
                <h2>New Contact Form Message</h2>
            </div>
            <div class="content">
                <p><strong>From:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <div class="message">
                    <p><strong>Message:</strong></p>
                    <p>{message}</p>
                </div>
            </div>
            <div class="footer">
                <p>This message was sent from your portfolio website contact form.</p>
            </div>
        </body>
        </html>
        '''

        # Create email message with HTML content
        msg = Message(
            subject=f'New Contact Form Message from {name}',
            recipients=[app.config['MAIL_USERNAME']],
            html=html_content
        )

        logger.debug("Attempting to send email...")
        # Send email
        mail.send(msg)
        logger.info("Email sent successfully")
        return jsonify({'message': 'Email sent successfully!'}), 200

    except Exception as e:
        logger.error(f"Error sending email: {str(e)}", exc_info=True)
        return jsonify({'error': f'Failed to send email: {str(e)}'}), 500

# For local development
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

# For Vercel deployment
app = app 