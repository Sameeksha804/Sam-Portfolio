# Personal Portfolio Website

A modern, responsive personal portfolio website built with Flask and featuring a contact form with email functionality.

## 🌟 Features

- Responsive design that works on all devices
- Interactive UI with smooth transitions
- Contact form with email functionality
- Resume download capability
- Static file serving for CSS, JavaScript, and images
- Modern and clean user interface

## 🛠️ Technologies Used

- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript
- **Email**: Flask-Mail
- **Environment Variables**: python-dotenv
- **Logging**: Python's built-in logging module

## 📋 Prerequisites

Before running this project, make sure you have:

- Python 3.x installed
- pip (Python package installer)
- A Gmail account for email functionality

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/Sameeksha804/Portfolio-Website.git
cd Portfolio-Website
```

2. Install the required packages:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file in the root directory with the following variables:
```
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

Note: For Gmail, you'll need to use an App Password. You can generate one in your Google Account settings under Security > 2-Step Verification > App passwords.

## 💻 Running the Application

1. Start the Flask development server:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

## 📁 Project Structure

```
portfolio/
├── app.py              # Main Flask application
├── test_email.py       # Email testing script
├── static/            # All static assets (css, js, images, assets)
└── pages/            # HTML templates
```

## 📧 Contact Form

The portfolio includes a contact form that sends emails using Flask-Mail. The form includes:
- Name
- Email
- Message

All messages are sent to the configured email address with a professional HTML template.

## 🔒 Security

- Email credentials are stored in environment variables
- Form validation is implemented on both client and server side
- Error handling and logging are implemented throughout the application

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sameeksha804/Portfolio-Website/issues).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sameeksha Shrivastava**
- Email: simisuchi804@gmail.com
- GitHub: [@Sameeksha804](https://github.com/Sameeksha804)

---

⭐️ If you like this project, please give it a star on GitHub!
