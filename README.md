🎮 Smart Rehab : AI- Powered Gamified Physiotherapy System

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
![Image](https://github.com/user-attachments/assets/032a3c80-78fd-4be0-be2b-9c2af38c6efa)

🧑‍⚕User Roles:

- Patient: Plays games and follows personalized exercise routines

- Doctor: Monitors patient activity, assigns tasks, tracks performance via dashboard

📊 Future Improvements:

1. Add voice and gesture-based commands

2. Improve ML models with personalized calibration

3. Add leaderboard/motivation systems for gamified progress

Screenshots of The Work: 

1.![Image](https://github.com/user-attachments/assets/0b1f970c-8d43-4e21-a320-23e64517e9c9)
  
2. ![Image](https://github.com/user-attachments/assets/f7a14fea-32db-47e9-8d99-6c8b17894ce7)

3. ![Image](https://github.com/user-attachments/assets/0791a7dd-245a-4298-a8b1-9646a5722c97)

Live demo of the video:

https://github.com/user-attachments/assets/e16f3a07-c8ea-400a-8986-9b115826d077
