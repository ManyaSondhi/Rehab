Video link: 


# 🕹 RehabGamer: Gamified Rehabilitation Web Portal

[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com/)

RehabGamer is a full-stack gamified rehabilitation portal designed to assist patients with interactive therapy using hand tracking games. The platform offers role-based access for both patients and healthcare providers, complete with dashboards for tracking progress and performance metrics in real-time.

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [System Architecture](#-system-architecture)
- [Setup Instructions](#-setup-instructions)
- [Using RehabGamer](#-using-rehabgamer)
- [Game Options](#-game-options)
  - [Fruit Ninja-Style Game](#fruit-ninja-style-game)
  - [Balloon Popping Game](#balloon-popping-game)
- [Project Structure](#-project-structure)
- [Performance Metrics](#-performance-metrics)
- [Troubleshooting](#-troubleshooting)
- [Future Roadmap](#-future-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- Dual Role Access System
  - Patient portal with personalized therapy tracking
  - Doctor dashboard with comprehensive patient management
  
- Multiple Interactive Rehabilitation Games
  - Fruit Ninja-style game using Python/Pygame
  - Browser-based Balloon Popping game
  - Real-time hand tracking with webcam input
  - Difficulty progression to match patient recovery stages
  
- Performance Analysis
  - Reaction time graphs and historical data
  - Progress tracking with visual representations
  - Session reporting for healthcare providers

- User-Friendly Interface
  - Intuitive navigation and gameplay controls
  - Visually engaging design to encourage patient engagement
  - Responsive layout for different devices

## 🚀 Technologies Used

### Backend
- Python 3.7+ - Core programming language
- Flask 2.0+ - Web framework for serving the application
- OpenCV - Computer vision for webcam processing
- MediaPipe - Hand tracking and pose estimation
- Pygame - Game logic and rendering for Python game
- Subprocess/Threading - For launching game from web interface

### Frontend
- HTML5/CSS3 - Structure and styling
- JavaScript - Interactive elements and client-side logic
- Bootstrap 5 - Responsive design framework
- Chart.js - Data visualization for performance metrics
- TensorFlow.js/MediaPipe.js - Browser-based hand tracking

### Planned Additions
- SQLAlchemy - Database ORM for persistent storage
- Flask-Login - For enhanced authentication

## 🏗 System Architecture

The system follows a multi-tier architecture:

1. Presentation Layer - Flask templates serving HTML/CSS/JS
2. Application Layer - Flask routes handling requests and responses
3. Game Engine Layer - Both Python and JavaScript-based games
4. Computer Vision Layer - OpenCV/MediaPipe for hand tracking
5. Data Layer (planned) - Database for storing user information and metrics

Data flows:

User Interaction → Flask Web Interface → Game Launch (Python or Browser) → Hand Tracking
                                                    ↓
Performance Data Storage ← Result Processing ← Game Completion


## ⚙ Setup Instructions

### Prerequisites
- Python 3.7 or higher
- Webcam (built-in or external)
- Git (for cloning the repository)
- Modern web browser (Chrome/Firefox/Edge recommended)

### Installation

1. Clone the repository
   bash
   git clone https://github.com/yourusername/RehabGamer.git
   cd RehabGamer
   

2. Set up a virtual environment (recommended)
   bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   

3. Install dependencies
   bash
   pip install -r requirements.txt
   

4. Run the application
   bash
   python app.py

5. Access the web portal
   - Open your browser and navigate to http://127.0.0.1:5000
   - Default credentials:
     - Patient: username: patient1, password: rehab123
     - Doctor: username: doctor1, password: doctor123

### System Requirements
- Processor: Dual-core 2.0 GHz or better (for smooth hand tracking)
- RAM: 4GB minimum, 8GB recommended
- Camera: 720p webcam or better
- Operating System: Windows 10/11, macOS 10.14+, Ubuntu 18.04+
- Browser: Chrome 88+, Firefox 86+, or Edge 88+ for browser-based games

## 🌐 Using RehabGamer

### Complete User Journey

1. Installation and Setup
   - Install required libraries using pip install -r requirements.txt
   - Run the application with python app.py
   - Once running, a link will be displayed in your terminal (typically http://127.0.0.1:5000)
   - Open this link in your web browser

2. Landing Page
   ![WhatsApp Image 2025-04-13 at 15 17 54_63782de2](https://github.com/user-attachments/assets/1b11ddb1-27ec-45e9-904c-0d60e5b594bc)

   - On the landing page, you'll be presented with two options:
     - "I am a Patient"
     - "I am a Therapist"
   - Select the appropriate role for your needs

3. Authentication
   ![WhatsApp Image 2025-04-13 at 15 17 54_46b5a289](https://github.com/user-attachments/assets/c032f0a8-73e8-4a00-90b1-f76fc2e2adae)
   
   - After selecting your role, you'll be directed to the login page
   - For new users: Click "Sign Up" to create a new account
   - For existing users: Enter your credentials and click "Login"
   - Default credentials are provided in the Setup Instructions section

4. Patient Experience
   
   - After logging in as a patient, you'll see your personalized dashboard
   -
    ![WhatsApp Image 2025-04-13 at 15 17 54_1fbd06ce](https://github.com/user-attachments/assets/d2f7af1b-8e9a-4993-848d-718c766b11af)
   ![WhatsApp Image 2025-04-13 at 15 17 54_89bd2300](https://github.com/user-attachments/assets/0886f954-c0fd-49ef-8da9-e785748010d0)

   - Your dashboard displays:
     - Your personal information and therapy schedule
 - Historical performance data and progress charts
     - Game selection options for your therapy session

   a. Selecting and Playing Games
   ![WhatsApp Image 2025-04-13 at 15 17 54_45369f5d](https://github.com/user-attachments/assets/57e93fb2-f078-4901-803e-a358a66f933e)

   - Choose from available rehabilitation games:
     - Fruit Ninja-style Game
     - Balloon Popping Game
   - Click on your preferred game to launch it
   - Allow camera access when prompted
   - Follow the on-screen instructions for gameplay

   b. Post-Game Analysis
   ![WhatsApp Image 2025-04-13 at 15 17 54_f50e4e12](https://github.com/user-attachments/assets/e39933ac-d782-40d4-b240-e1099d8605e8)
    ![WhatsApp Image 2025-04-13 at 15 17 54_89bd2300](https://github.com/user-attachments/assets/0886f954-c0fd-49ef-8da9-e785748010d0)

   - Once your game session ends, you'll see real-time analysis of your performance
   - Metrics include reaction time, movement range, accuracy, and session duration
   - This data is automatically saved to your profile for long-term progress tracking

6. Therapist Experience
   ![WhatsApp Image 2025-04-13 at 15 18 16_2d2ceb1a](https://github.com/user-attachments/assets/28c20fc6-4499-4aa3-9bc1-506a8c59d9d6)

   ![WhatsApp Image 2025-04-13 at 15 18 16_a9566a9f](https://github.com/user-attachments/assets/f9412e67-a602-48cb-b1d7-cefb6a126580)
![WhatsApp Image 2025-04-13 at 15 18 16_75b5dfcd](https://github.com/user-attachments/assets/c7c3ac54-cd32-434d-9c5a-81aaec6dde7c)

   - After logging in as a therapist, you'll see your professional dashboard
   - Your dashboard displays:
     - List of all your patients with search functionality
     - Summary statistics for quick assessment
     - Recent activity and performance alerts
   
   a. Patient Management
   - Select a patient from your list to view their detailed profile
   - Review comprehensive analytics of their therapy progress
   - Customize therapy parameters and game difficulty based on their needs
   - Schedule new therapy sessions or modify existing ones

   b. Performance Analysis
   - View detailed graphs showing patient performance over time
   - Access session-by-session breakdown of metrics
   - Generate reports for medical records or insurance purposes

## 🎮 Game Options

### Fruit Ninja-Style Game
![WhatsApp Image 2025-04-13 at 15 22 16_dd55bb1c](https://github.com/user-attachments/assets/cde10b4d-4645-439c-8bc6-c1a1b4fb78a1)


- Implementation: Python + Pygame
- Launch Process: Launches in a separate window from the web interface
- Gameplay:
  - Fruits rise from the bottom of the screen in randomized patterns
  - Slice fruits with your hand movement (tracked via webcam)
  - Bombs occasionally appear as hazards to be avoided
  - Scoring system with combo multipliers

### Balloon Popping Game
![WhatsApp Image 2025-04-13 at 15 23 32_69ff3557](https://github.com/user-attachments/assets/93cb8c1b-b822-4145-950d-c81b58615bd2)


- Implementation: HTML5 + JavaScript + Browser-based hand tracking
- Location: templates/balloon-game.html
- Gameplay:
  - Colorful balloons float upward on the screen
  - Pop balloons by hovering your index finger over them
  - Score increases with each successful pop
  - Runs directly in the browser - no separate window needed

#### Using the Balloon Game
1. Navigate to the patient dashboard
2. Select "Balloon Popping Game" from the game options
3. Allow camera access when prompted
4. Position your hand in front of the camera
5. Use your index finger to pop balloons
6. Game automatically tracks score and performance
7. Results are saved to your profile upon completion

## 📁 Project Structure

![WhatsApp Image 2025-04-13 at 13 01 03_a7f5f74c](https://github.com/user-attachments/assets/49219dfe-c3fb-416c-8eb0-62b2b4ca6217)



## 📊 Performance Metrics

The system tracks the following rehabilitation metrics:

1. Reaction Time
   - Average time to respond to stimuli (fruits/balloons)
   - Trend analysis over multiple sessions

2. Movement Range
   - X and Y coordinate extremes during gameplay
   - Visualization of coverage area

3. Accuracy
   - Percentage of successful interactions
   - Miss/hit ratio analysis

4. Session Duration
   - Total active therapy time
   - Rest intervals and fatigue indicators

These metrics are presented visually to both patients and healthcare providers to monitor progress and adjust therapy plans accordingly.

## 🔧 Troubleshooting

### Common Issues and Solutions

1. Webcam Not Detected
   - Ensure no other applications are using the webcam
   - Check device manager to verify webcam is properly installed
   - Try running the application with administrator privileges
   - For browser games, ensure you've granted camera permissions

2. Game Performance Issues
   - Close resource-intensive background applications
   - Ensure adequate lighting for optimal hand tracking
   - Reduce resolution in the settings if necessary

3. Hand Tracking Problems
   - Position your hand within 20-70cm from the camera
   - Avoid complex backgrounds that may interfere with detection
   - Ensure there is sufficient contrast between your hand and background

4. Python Game Launch Issues
   - Verify all dependencies are correctly installed
   - Check Python version compatibility (3.7+ required)
   - Ensure Pygame is properly configured for your system

5. Browser Game Issues
   - Try a different browser (Chrome recommended)
   - Update your browser to the latest version
   - Clear browser cache and cookies
   - Disable browser extensions that might interfere with camera access

## 🧠 Future Roadmap

### Short-term Goals (Next 3 Months)
- Add more browser-based games for varied rehabilitation needs
- Implement database integration for persistent user data
- Enhance analytics dashboard with more detailed metrics

### Mid-term Goals (6-12 Months)
- Create mobile application version for iOS and Android
- Implement telehealth features for remote doctor monitoring
- Add multi-user concurrent sessions for group therapy

### Long-term Vision
- Integration with physical rehabilitation hardware
- Machine learning for adaptive difficulty based on patient progress
- Expanded suite of games targeting different therapy needs

## 🤝 Contributing

Contributions to RehabGamer are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch
   bash
   git checkout -b feature/your-feature-name
   
3. Commit your changes
   bash
   git commit -m "Add feature: description of your changes"
   
4. Push to your branch
   bash
   git push origin feature/your-feature-name
   
5. Open a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.
