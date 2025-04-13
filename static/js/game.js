// game.js - Handles the game functionality and score tracking

// Fruit class for game objects
class Fruit {
    constructor(gameWidth, gameHeight) {
        // Random fruit type with weighted probability
        const rand = Math.random();
        if (rand < 0.1) {
            this.type = "bomb";
        } else if (rand < 0.5) {
            this.type = "apple";
        } else if (rand < 0.8) {
            this.type = "banana";
        } else {
            this.type = "pineapple";
        }
        
        // Points value based on fruit type
        this.pointValue = {
            "apple": 1,
            "banana": 2,
            "pineapple": 3,
            "bomb": -1
        }[this.type];
        
        // Ensure we have valid dimensions
        gameWidth = gameWidth || 800;
        gameHeight = gameHeight || 600;
        
        // Initial position and velocity
        this.x = Math.random() * (gameWidth - 100) + 50;
        this.y = gameHeight; // Start at bottom of screen
        this.vx = Math.random() * 3 - 1.5;
        this.vy = -(Math.random() * 5 + 15); // Negative to go up
        this.gravity = 0.5;
        
        // State properties
        this.sliced = false;
        this.sliceTime = null;
        this.spawnTime = Date.now();
        
        // Load image with explicit onload handling
        this.image = new Image();
        this.image.src = `/static/images/game/${this.type}.svg`;
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
            console.log(`${this.type} image loaded successfully`);
        };
        this.image.onerror = (err) => {
            console.error(`Error loading ${this.type} image:`, err);
        };
        
        // Load sliced image halves if this is a fruit (not bomb)
        if (this.type !== "bomb") {
            this.slicedImages = [
                new Image(),
                new Image()
            ];
            this.slicedImages[0].src = `/static/images/game/${this.type}_half1.svg`;
            this.slicedImages[1].src = `/static/images/game/${this.type}_half2.svg`;
            
            // Monitor loading of sliced images
            this.slicedImages[0].onload = () => console.log(`${this.type}_half1 loaded`);
            this.slicedImages[1].onload = () => console.log(`${this.type}_half2 loaded`);
            this.slicedImages[0].onerror = (err) => console.error(`Error loading ${this.type}_half1:`, err);
            this.slicedImages[1].onerror = (err) => console.error(`Error loading ${this.type}_half2:`, err);
        }
        
        // Size
        this.width = 60;
        this.height = 60;
        this.slicedWidth = 40;
        this.slicedHeight = 40;
        
        // Add debug info
        console.log(`Created ${this.type} at (${this.x}, ${this.y}) with velocity (${this.vx}, ${this.vy})`);
    }
    
    update() {
        // Apply physics
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        
        // Add rotation effect after slicing
        if (this.sliced) {
            this.vx1 = this.vx - 0.5;
            this.vx2 = this.vx + 0.5;
        }
        
        // Return true if still active, false if off-screen
        return this.y < window.innerHeight + 100;
    }
    
    draw(ctx) {
        if (!this.sliced) {
            // Draw the whole fruit
            ctx.drawImage(this.image, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        } else if (this.type !== "bomb") {
            // Draw the sliced halves
            ctx.drawImage(this.slicedImages[0], this.x - this.width/2 - 10 + this.vx1, this.y - this.height/2, this.slicedWidth, this.slicedHeight);
            ctx.drawImage(this.slicedImages[1], this.x - this.width/2 + 10 + this.vx2, this.y - this.height/2, this.slicedWidth, this.slicedHeight);
        }
    }
    
    checkSlice(fingerX, fingerY) {
        if (this.sliced) return false;
        
        // Calculate distance between finger and fruit center
        const distance = Math.hypot(this.x - fingerX, this.y - fingerY);
        
        // Check if finger is within slicing distance
        if (distance < this.width/2) {
            this.sliced = true;
            this.sliceTime = Date.now();
            return true;
        }
        
        return false;
    }
    
    getReactionTime() {
        if (!this.sliceTime) return null;
        return (this.sliceTime - this.spawnTime) / 1000; // in seconds
    }
}

// Game variables
let gameActive = false;
let videoElement, canvasElement, canvasCtx;
let hands, camera;
let fruits = [];
let score = 0;
let lives = 3;
let startTime;
let frameId;
let fingerPos = { x: 0, y: 0 };
let reactionTimes = [];
let spawnInterval;
let userRole = "patient"; // Default role

// Game statistics UI elements
const scoreDisplay = document.querySelector('.score-value');
const livesDisplay = document.querySelector('.lives-value');
const timeDisplay = document.querySelector('.time-value');
const gameStatus = document.querySelector('.game-status');

// Initialize the game page
function initGame() {
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '/login';
        return;
    }
    
    // Update player name
    const playerName = document.querySelector('.player-name');
    if (playerName) {
        playerName.textContent = user.name || "Player";
    }
    
    // Get game canvas
    canvasElement = document.getElementById('game-canvas');
    if (!canvasElement) return;
    
    canvasCtx = canvasElement.getContext('2d');
    
    // Create role selection modal
    createRoleSelectionModal();
    
    // Set up event listeners for game controls
    const startButton = document.getElementById('start-game');
    if (startButton) {
        startButton.addEventListener('click', () => {
            // First time, show role selection
            if (!sessionStorage.getItem('selectedRole')) {
                showRoleSelectionModal();
            } else {
                userRole = sessionStorage.getItem('selectedRole');
                startGame();
            }
        });
    }
    
    const endButton = document.getElementById('end-game');
    if (endButton) {
        endButton.addEventListener('click', () => endGame());
    }
    
    // Update game instructions
    const instructionNote = document.querySelector('.instruction-note');
    if (instructionNote) {
        instructionNote.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <p>🎮 This game uses your webcam to track hand movement. Allow camera access to play! 👋</p>
        `;
    }
    
    // Update how to play instructions
    const gameInstructions = document.querySelector('.game-instructions ol');
    if (gameInstructions) {
        gameInstructions.innerHTML = `
            <li>📷 Allow camera access when prompted</li>
            <li>👋 Position your hand in front of the camera</li>
            <li>👆 Use your index finger to slice fruits that appear on screen</li>
            <li>💣 Avoid bombs - slicing them will cost you a life</li>
            <li>🏆 Try to get the highest score possible!</li>
        `;
    }
    
    // Add emojis to the game status
    updateGameStatus('Ready to play! 🎮');
    updateScoreDisplay(0);
    updateLivesDisplay(3);
}

// Create role selection modal
function createRoleSelectionModal() {
    // Check if modal already exists
    if (document.getElementById('role-selection-modal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'role-selection-modal';
    modal.className = 'results-modal';
    modal.style.display = 'none';
    
    modal.innerHTML = `
        <div class="results-modal-content">
            <div class="results-header">
                <h2>🎮 Select Your Role</h2>
            </div>
            <div class="results-body" style="text-align: center; padding: 20px 0;">
                <p style="margin-bottom: 20px;">Please select your role to continue:</p>
                
                <div style="display: flex; justify-content: space-around; margin-top: 30px;">
                    <button id="patient-role" class="btn btn-primary" style="display: flex; flex-direction: column; align-items: center; padding: 20px;">
                        <span style="font-size: 40px; margin-bottom: 10px;">👨‍⚕️</span>
                        <span>Patient</span>
                    </button>
                    
                    <button id="therapist-role" class="btn btn-outline" style="display: flex; flex-direction: column; align-items: center; padding: 20px;">
                        <span style="font-size: 40px; margin-bottom: 10px;">👩‍⚕️</span>
                        <span>Therapist</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('patient-role').addEventListener('click', () => {
        selectRole('patient');
    });
    
    document.getElementById('therapist-role').addEventListener('click', () => {
        selectRole('therapist');
    });
}

// Show role selection modal
function showRoleSelectionModal() {
    const modal = document.getElementById('role-selection-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Handle role selection
function selectRole(role) {
    userRole = role;
    sessionStorage.setItem('selectedRole', role);
    
    // Hide modal
    const modal = document.getElementById('role-selection-modal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Update UI based on role
    if (role === 'therapist') {
        // Add therapist-specific UI elements if needed
        updateGameStatus('Therapist Mode: Monitoring patient progress 👩‍⚕️');
    } else {
        updateGameStatus('Patient Mode: Ready to play! 🎮');
    }
    
    // Start game
    startGame();
}

// Update game status with emoji
function updateGameStatus(status) {
    if (gameStatus) {
        gameStatus.textContent = status;
    }
}

// Update score display with emoji
function updateScoreDisplay(value) {
    if (scoreDisplay) {
        scoreDisplay.innerHTML = `${value} <span style="font-size: 0.8em;">🍎</span>`;
    }
}

// Update lives display with emoji
function updateLivesDisplay(value) {
    if (livesDisplay) {
        // Create heart emojis based on lives
        const hearts = Array(value).fill('❤️').join(' ');
        livesDisplay.innerHTML = `${value} <span style="font-size: 0.8em;">${hearts}</span>`;
    }
}

// Start the game
async function startGame() {
    if (gameActive) return;
    gameActive = true;
    
    // Reset game state
    score = 0;
    lives = 3;
    fruits = [];
    reactionTimes = [];
    startTime = Date.now();
    
    // Update UI
    document.getElementById('start-game').style.display = 'none';
    document.getElementById('end-game').style.display = 'inline-block';
    updateGameStatus('Game in progress! 🎮');
    updateScoreDisplay(score);
    updateLivesDisplay(lives);
    
    try {
        // Simplified approach with direct webcam access
        videoElement = document.createElement('video');
        videoElement.style.display = 'none';
        videoElement.setAttribute('autoplay', '');
        videoElement.setAttribute('playsinline', '');
        document.body.appendChild(videoElement);
        
        // Clear canvas and draw loading message
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.fillStyle = '#343a40';
        canvasCtx.font = '20px Arial';
        canvasCtx.textAlign = 'center';
        canvasCtx.fillText('Loading camera feed...', canvasElement.width/2, canvasElement.height/2);
        
        // Start camera with simpler approach
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 640, 
                    height: 480,
                    facingMode: 'user' 
                } 
            });
            
            videoElement.srcObject = stream;
            await new Promise(resolve => {
                videoElement.onloadedmetadata = () => {
                    videoElement.play().then(resolve);
                };
            });
            
            console.log("Camera started successfully");
            
            // For now, we'll simulate finger position with mouse position
            // until MediaPipe finishes loading
            fingerPos = { x: canvasElement.width / 2, y: canvasElement.height / 2 };
            
            // Set up mouse tracking as fallback for finger detection
            canvasElement.addEventListener('mousemove', (event) => {
                const rect = canvasElement.getBoundingClientRect();
                fingerPos = {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                };
            });
            
            // Try to initialize MediaPipe Hands in the background
            try {
                // Setup MediaPipe Hands
                hands = new Hands({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                    }
                });
                
                hands.setOptions({
                    maxNumHands: 1,
                    modelComplexity: 0, // Lower complexity for better performance
                    minDetectionConfidence: 0.5,
                    minTrackingConfidence: 0.5
                });
                
                hands.onResults(onHandResults);
                
                // Initialize camera processor
                camera = new Camera(videoElement, {
                    onFrame: async ({ video }) => {
                        await hands.send({ image: video });
                    },
                    width: 640,
                    height: 480
                });
                
                // Start processing
                camera.start();
                console.log("MediaPipe Hands initialized");
            } catch (handError) {
                console.warn("Could not initialize MediaPipe Hands. Using mouse fallback instead:", handError);
            }
            
            // Start game loop
            requestAnimationFrame(gameLoop);
            
            // Start spawning fruits (every second)
            spawnInterval = setInterval(spawnFruit, 1000);
            
        } else {
            throw new Error("getUserMedia not supported");
        }
    } catch (error) {
        console.error("Error starting game:", error);
        updateGameStatus('Error: Could not access camera ❌ Try allowing camera permissions and reload.');
        endGame();
    }
}

// Process hand tracking results
function onHandResults(results) {
    if (!results.multiHandLandmarks || !results.multiHandLandmarks.length) {
        // No hands detected
        fingerPos = null;
        return;
    }
    
    // Get index finger tip position (landmark 8)
    const fingerTip = results.multiHandLandmarks[0][8];
    
    // Convert normalized coordinates to canvas coordinates
    fingerPos = {
        x: fingerTip.x * canvasElement.width,
        y: fingerTip.y * canvasElement.height
    };
}

// Spawn a new fruit
function spawnFruit() {
    if (!gameActive) return;
    
    // Create a new fruit with correct canvas dimensions
    const fruit = new Fruit(canvasElement.width, canvasElement.height);
    
    // Add to fruits array
    fruits.push(fruit);
    
    // Log for debugging
    console.log("Spawned fruit:", fruit.type, "at position:", fruit.x, fruit.y);
}

// Main game loop
function gameLoop() {
    if (!gameActive) return;
    
    // Clear canvas
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    
    // Draw video feed as background (flipped horizontally)
    if (videoElement && videoElement.readyState >= 2) {
        canvasCtx.save();
        canvasCtx.translate(canvasElement.width, 0);
        canvasCtx.scale(-1, 1);
        canvasCtx.drawImage(
            videoElement, 
            0, 0, 
            canvasElement.width, canvasElement.height
        );
        canvasCtx.restore();
    }
    
    // Draw game stats overlay
    drawGameStatsOverlay();
    
    // Draw and update fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
        const fruit = fruits[i];
        const stillActive = fruit.update();
        
        // Check if finger sliced the fruit
        if (fingerPos && !fruit.sliced) {
            const sliced = fruit.checkSlice(fingerPos.x, fingerPos.y);
            
            if (sliced) {
                if (fruit.type === "bomb") {
                    // Lost a life
                    lives--;
                    updateLivesDisplay(lives);
                    
                    // Visual feedback
                    document.body.classList.add('life-lost');
                    setTimeout(() => {
                        document.body.classList.remove('life-lost');
                    }, 300);
                    
                    // Check game over
                    if (lives <= 0) {
                        endGame();
                        return;
                    }
                } else {
                    // Add points
                    score += fruit.pointValue;
                    updateScoreDisplay(score);
                    
                    // Record reaction time
                    const reactionTime = fruit.getReactionTime();
                    if (reactionTime) {
                        reactionTimes.push({
                            score: score,
                            time: reactionTime
                        });
                    }
                }
            }
        }
        
        try {
            // Draw the fruit
            fruit.draw(canvasCtx);
        } catch (error) {
            console.error("Error drawing fruit:", error);
        }
        
        // Remove inactive fruits
        if (!stillActive) {
            // If player missed a fruit (not a bomb), lose a life
            if (!fruit.sliced && fruit.type !== "bomb") {
                lives--;
                updateLivesDisplay(lives);
                
                // Visual feedback
                document.body.classList.add('life-lost');
                setTimeout(() => {
                    document.body.classList.remove('life-lost');
                }, 300);
                
                // Check game over
                if (lives <= 0) {
                    endGame();
                    return;
                }
            }
            
            fruits.splice(i, 1);
        }
    }
    
    // Draw finger position if available
    if (fingerPos) {
        canvasCtx.fillStyle = 'rgba(0, 255, 0, 0.7)';
        canvasCtx.beginPath();
        canvasCtx.arc(fingerPos.x, fingerPos.y, 15, 0, Math.PI * 2);
        canvasCtx.fill();
    }
    
    // Update timer
    const gameTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(gameTime / 60);
    const seconds = gameTime % 60;
    if (timeDisplay) {
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Continue the game loop
    frameId = requestAnimationFrame(gameLoop);
}

// Draw game stats overlay on canvas
function drawGameStatsOverlay() {
    // Draw semi-transparent overlay at the top
    canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    canvasCtx.fillRect(0, 0, canvasElement.width, 50);
    
    // Draw score
    canvasCtx.fillStyle = 'white';
    canvasCtx.font = 'bold 20px Arial';
    canvasCtx.textAlign = 'left';
    canvasCtx.fillText(`Score: ${score} 🍎`, 20, 30);
    
    // Draw lives
    const hearts = Array(lives).fill('❤️').join(' ');
    canvasCtx.textAlign = 'right';
    canvasCtx.fillText(`Lives: ${hearts}`, canvasElement.width - 20, 30);
}

// End the game and save results
function endGame(finalScore) {
    if (!gameActive) return;
    gameActive = false;
    
    // Stop game loop and fruit spawning
    cancelAnimationFrame(frameId);
    clearInterval(spawnInterval);
    
    // Stop camera
    if (camera) {
        camera.stop();
    }
    
    // Clean up video element
    if (videoElement) {
        videoElement.remove();
    }
    
    // Hide end button and show start button
    document.getElementById('end-game').style.display = 'none';
    document.getElementById('start-game').style.display = 'inline-block';
    
    // Get final score if not provided
    if (finalScore === undefined) {
        finalScore = score;
    }
    
    // Calculate average reaction time
    let avgReactionTime = 0;
    if (reactionTimes.length > 0) {
        avgReactionTime = reactionTimes.reduce((sum, item) => sum + item.time, 0) / reactionTimes.length;
        avgReactionTime = Math.round(avgReactionTime * 1000); // Convert to milliseconds
    } else {
        avgReactionTime = 0;
    }
    
    // Show game over status
    updateGameStatus('Game over! 🎮');
    
    // Get current user
    const user = getCurrentUser();
    if (!user) return;
    
    // Create session data with role information
    const sessionData = {
        date: new Date().toISOString(),
        score: finalScore,
        livesLost: 3 - lives,
        reactionTime: avgReactionTime,
        reactionTimeData: reactionTimes,
        role: userRole
    };
    
    // Get existing sessions or create new array
    let sessions = JSON.parse(localStorage.getItem('user_sessions_' + user.id)) || [];
    
    // Add new session
    sessions.push(sessionData);
    
    // Save updated sessions
    localStorage.setItem('user_sessions_' + user.id, JSON.stringify(sessions));
    
    // Show results modal with reaction time graph
    showGameResults(sessionData);
}

// Show game results in a modal
function showGameResults(sessionData) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'results-modal';
    
    // Create modal content with emojis
    modal.innerHTML = `
        <div class="results-modal-content">
            <div class="results-header">
                <h2>🏆 Game Results</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="results-body">
                <div class="result-item">
                    <span class="result-label">Score:</span>
                    <span class="result-value">${sessionData.score} 🍎</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Lives Lost:</span>
                    <span class="result-value">${sessionData.livesLost} 💔</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Avg. Reaction Time:</span>
                    <span class="result-value">${sessionData.reactionTime} ms ⚡</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Date:</span>
                    <span class="result-value">${new Date(sessionData.date).toLocaleString()} 📅</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Mode:</span>
                    <span class="result-value">${sessionData.role === 'therapist' ? 'Therapist 👩‍⚕️' : 'Patient 👨‍⚕️'}</span>
                </div>
                
                <div style="margin-top: 20px; height: 200px;">
                    <canvas id="reaction-time-chart"></canvas>
                </div>
            </div>
            <div class="results-footer">
                <button class="btn btn-primary play-again">Play Again 🎮</button>
                <a href="/user-dashboard" class="btn btn-outline">Return to Dashboard 📊</a>
            </div>
        </div>
    `;
    
    // Add modal to document
    document.body.appendChild(modal);
    
    // Create reaction time chart if we have data
    if (sessionData.reactionTimeData && sessionData.reactionTimeData.length > 0) {
        setTimeout(() => {
            const ctx = document.getElementById('reaction-time-chart').getContext('2d');
            
            // Extract data points
            const scores = sessionData.reactionTimeData.map(item => item.score);
            const times = sessionData.reactionTimeData.map(item => item.time * 1000); // Convert to ms
            
            // Create chart
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: scores,
                    datasets: [{
                        label: 'Reaction Time (ms)',
                        data: times,
                        backgroundColor: 'rgba(76, 110, 245, 0.1)',
                        borderColor: '#4C6EF5',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: '#4C6EF5',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Reaction Time (ms)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Score'
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Reaction Time vs Score'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Reaction Time: ${context.parsed.y.toFixed(0)} ms`;
                                }
                            }
                        }
                    }
                }
            });
        }, 100);
    }
    
    // Add event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.querySelector('.play-again').addEventListener('click', () => {
        modal.remove();
        startGame();
    });
}

// Camera helper class
class Camera {
    constructor(videoElement, options) {
        this.video = videoElement;
        this.options = options;
        this.activeStream = null;
    }
    
    async start() {
        const constraints = {
            video: {
                width: this.options.width,
                height: this.options.height
            }
        };
        
        try {
            this.activeStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.activeStream;
            
            return new Promise((resolve) => {
                this.video.onloadedmetadata = () => {
                    this.video.play();
                    this.animationFrameId = requestAnimationFrame(this.frameLoop.bind(this));
                    resolve();
                };
            });
        } catch (error) {
            throw error;
        }
    }
    
    frameLoop() {
        if (this.options.onFrame) {
            this.options.onFrame({ video: this.video });
        }
        this.animationFrameId = requestAnimationFrame(this.frameLoop.bind(this));
    }
    
    stop() {
        if (this.activeStream) {
            const tracks = this.activeStream.getTracks();
            tracks.forEach(track => track.stop());
            this.activeStream = null;
        }
        
        if (this.video && this.video.srcObject) {
            this.video.srcObject = null;
        }
        
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
}