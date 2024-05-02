import cv2
import numpy as np
import tensorflow as tf

# Load the model
model = tf.saved_model.load('model/1/')

# Open a video capture object
cap = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    if not ret:
        break

    # Preprocess the frame for your model
    image = cv2.resize(frame, (480, 480))  # resize to the input size of your model
    image = np.array(image, dtype=np.float32) / 255.0  # normalize to [0,1] if necessary

    # Make a prediction
    prediction = model(image[np.newaxis, ...])

    # Get the index of the predicted class
    prediction_index = np.argmax(prediction)

    # Get the confidence of the prediction
    prediction_confidence = prediction[0][prediction_index]

    # Map the prediction to the correct class
    prediction_class = 'Biodegradable' if prediction_index == 0 else 'Non-Biodegradable'

    # Display the prediction on the frame
    cv2.putText(frame, f'{prediction_class} ({prediction_confidence*100:.2f}%)', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Display the resulting frame
    cv2.imshow('Real-Time Detection', frame)

    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()
