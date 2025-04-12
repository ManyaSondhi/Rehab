🎮 Smart Rehab : AI- Powered Gamified Physiotherapy System

**PPT LINK**: https://docs.google.com/presentation/d/1uQ7eZVSqoBkCOuFI6G35DP9UNb1IGg_-/edit?usp=sharing&ouid=106386376938120088072&rtpof=true&sd=true
🧠 Problem Statement

Traditional physiotherapy for stroke, injury, or surgery recovery is often monotonous and lacks real-time feedback, leading to low patient motivation and slow recovery. In-person therapy can also be costly and inaccessible, especially in remote areas. There's a need for an engaging, affordable solution that provides personalized exercises with real-time feedback.

✅ About the Project

RehabGamer is an AI-powered, game-based rehabilitation platform that makes physical therapy engaging and effective. It tracks patient movement using AI and integrates it into fun, interactive games. Therapists can monitor progress and adjust exercises based on real-time performance data.This ensures personalized recovery while allowing remote monitoring.

💡 Tech Stack

- Frontend - HTML, CSS, JavaScript, Flask Templates, Canvas API

- Backend - Flask, Node.js

- Motion Tracking - MediaPipe, OpenCV

- Games - JavaScript (with p5.js), HTML5 Canvas
  
- Deployment - Replit, GitHub

  

✨Key Features

1. Gamified Rehabilitation:
Turns physiotherapy into an engaging fruit-slicing game, making exercises fun and motivating for patients.

2. AI-Based Hand Tracking:
Uses MediaPipe to track hand movements in real time with just a webcam—no sensors or wearables needed.

3. Web-Based and Installation-Free:
Runs entirely in the browser. Patients can access therapy from anywhere without downloading any software.

4. Real-Time Feedback:
Live scoring and life count keep users engaged and informed about their performance during gameplay.

5. Performance Visualization:
After each session, players receive a graphical summary of their progress using Chart.js, helping track improvement over time.

6. Privacy-Friendly:
All motion detection runs locally. No personal or video data is stored or transmitted, ensuring patient privacy.

How It Works
 
- Launch the Web App:
The user opens the RehabGamer platform in a desktop browser (Chrome or Firefox recommended).

- Webcam Access & Hand Detection:
The browser requests access to the webcam. MediaPipe’s AI-powered hand tracking processes the live video feed to detect hand landmarks.

- Real-Time Gameplay:
Fruits and bombs fall from the top of the screen using the Canvas API. The user slices fruits by swiping their hand through them in real time.

  A) +2 points for every fruit sliced
  
  B) -1 life for hitting a bomb
  
  C) Game ends after 3 lives

- Session Summary:
At the end of each session, the dashboard showcases accuracy, reaction time, score chart and many more for proper analysis.

- Future Therapist View (Coming Soon):
Doctors will be able to log in, assign patients, and monitor progress through session histories and movement analytics.

🎮 Games Included

- Fruit Ninja – A slicing game where patients use swift hand movements to cut fruits, enhancing hand-eye coordination and reflexes.

- Balloon Popping Game – Players pop on-screen balloons with hand gestures, promoting fine motor control and upper limb mobility.

- Hand Yoga – A calming exercise game guiding users through therapeutic hand poses to improve flexibility and reduce stiffness.

- Piano Master – A rhythm-based game where users tap virtual piano keys, helping with finger precision, timing, and coordination.

Tech structure:
https://photos.app.goo.gl/p6AB9ny8id2guavH8

🧑‍⚕User Roles:

- Patient: Plays games and follows personalized exercise routines

- Doctor: Monitors patient activity, assigns tasks, tracks performance via dashboard

**Describe your Dependencies/ Show Stopper here**:

1. Real-Time Hand Tracking: Accuracy and latency of hand tracking (TensorFlow.js/MediaPipe) are crucial for effective feedback.

2. Webcam Performance: Smooth webcam feed is required for correct hand tracking and game interaction.

3. Backend Scalability: The backend must handle multiple users and real-time data processing without slowdowns.

4. Frontend-Backend Integration: Smooth communication between the frontend and backend is essential for accurate data processing.

5. Data Security: Proper encryption and security measures are needed to protect sensitive patient data.


📊 Future Improvements:

1. Add voice and gesture-based commands

2. Improve ML models with personalized calibration

3. Add leaderboard/motivation systems for gamified progress

Screenshots of The Work: 

https://drive.google.com/drive/folders/1i_7SdnE15dYO8e5D-Kpmb6VifKpJ9AcV?usp=sharing

Live demo of the video:

https://drive.google.com/file/d/1ilg4l-QE3JxxMV1Ybg2HC7B2Npb2IkPN/view?usp=sharing
