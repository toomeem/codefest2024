var socket = new WebSocket('ws://127.0.0.1:8080/ws');  // specify the WebSocket URL of your FastAPI server here

document.getElementById('selectImage').addEventListener('click', function() {
    var fileInput = document.getElementById('file-upload');
    fileInput.click();
});

document.getElementById('file-upload').addEventListener('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('file', file);

    // Display the selected image
    var img = document.getElementById('displayImage');
    img.src = URL.createObjectURL(file);
    img.style.display = 'block';

    fetch('http://127.0.0.1:8080/predict', {  // specify the URL of your FastAPI server here
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  // Parse the response as JSON
    .then(result => {
        console.log('Result:', result);

        // Check if the result contains a 'message' property
        if (result.message) {
            // If it does, display the message
            document.getElementById('result').textContent = result.message;
        } else {
            // Ensure the confidence does not exceed 100%
            var confidence = Math.min(result.confidence, 100);
            // Format the confidence to 2 decimal places
            confidence = confidence.toFixed(2);
            // Display the prediction and confidence in the desired format
            document.getElementById('result').innerHTML = "This is " + result.prediction + ".<br>Confidence: " + confidence + "%";
        }
    });
});

var useFrontCamera = false;

document.getElementById('realTimeDetection').addEventListener('click', function() {
    startRealTimeDetection();
    // Show the switch camera button
    document.getElementById('switchCamera').style.display = 'block';
});

// When a message is received from the server
socket.onmessage = function(event) {
    // Parse the message data as JSON
    var result = JSON.parse(event.data);
    console.log('Result:', result);
    // Ensure the confidence does not exceed 100%
    var confidence = Math.min(result.confidence, 100);
    // Format the confidence to 2 decimal places
    confidence = confidence.toFixed(2);
    // Display the prediction and confidence in the desired format
    document.getElementById('realTimeResult').innerHTML = "Detected: " + result.prediction + ".<br>Confidence: " + confidence + "%";
};

function startRealTimeDetection() {
    // Get video element
    var video = document.getElementById('video');

    // Stop the current video stream
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
    }

    // Check if the browser supports getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the camera
        navigator.mediaDevices.getUserMedia({ video: { facingMode: useFrontCamera ? 'user' : 'environment' } })
            .then(function(stream) {
                // Display the video stream in the video element
                video.srcObject = stream;
                video.play();
                // Show video element
                video.style.display = 'block';
                // Show container for real-time results
                document.getElementById('realTimeResult').style.display = 'block';
                // Initialize the canvas element for drawing
                var canvas = document.getElementById('canvas');
                var context = canvas.getContext('2d');

                // Start real-time detection
                setInterval(function() {
                    // Draw the current frame from the video onto the canvas
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    // Convert canvas to Blob (binary file)
                    canvas.toBlob(function(blob) {
                        // Create a new FileReader instance
                        var reader = new FileReader();
                        // Read the blob as binary data
                        reader.readAsArrayBuffer(blob);
                        // When the blob has been read
                        reader.onloadend = function() {
                            // Check if WebSocket is open
                            if (socket.readyState === WebSocket.OPEN) {
                                // Send the binary data over the WebSocket
                                socket.send(reader.result);
                            }
                        };
                    }, 'image/jpeg');
                }, 2000); // Adjust the interval as needed
            })
            .catch(function(error) {
                console.error('Error accessing camera:', error);
            });
    } else {
        console.error('getUserMedia is not supported in this browser.');
    }
}

// Function to switch camera
document.getElementById('switchCamera').addEventListener('click', function() {
    useFrontCamera = !useFrontCamera;
    startRealTimeDetection();
});