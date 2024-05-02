import tensorflow as tf
from tensorflow.keras.optimizers import Adam
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from keras.preprocessing import image_dataset_from_directory
from tensorflow.keras.regularizers import l2
import matplotlib.pyplot as plt
import keras

BATCH_SIZE = 32
IMG_SIZE = (480, 480)

# Define the data augmentation
data_augmentation = Sequential([
    keras.layers.Rescaling(1. / 255),
    keras.layers.RandomFlip('horizontal_and_vertical'),
    keras.layers.RandomRotation(0.2)
])


def load_data(train_dir, test_dir, batch_size, img_size):
    train_ds = image_dataset_from_directory(train_dir, shuffle=True, batch_size=batch_size, image_size=img_size)
    train_ds = train_ds.map(
        lambda x, y: (data_augmentation(x, training=True), tf.one_hot(y, depth=2)))  # One-hot encode the labels

    test_ds = image_dataset_from_directory(test_dir, shuffle=True, batch_size=batch_size, image_size=img_size)
    test_ds = test_ds.map(
        lambda x, y: (keras.layers.Rescaling(1. / 255)(x), tf.one_hot(y, depth=2)))  # One-hot encode the labels

    return train_ds, test_ds


def create_model():
    model = Sequential()

    model.add(Conv2D(32, (3, 3), activation='elu', input_shape=(480, 480, 3), kernel_regularizer=l2(0.0001)))
    model.add(MaxPooling2D((2, 2)))

    model.add(Conv2D(64, (3, 3), activation='elu', kernel_regularizer=l2(0.0001)))
    model.add(MaxPooling2D((2, 2)))

    model.add(Conv2D(64, (3, 3), activation='elu', kernel_regularizer=l2(0.0001)))
    model.add(MaxPooling2D((2, 2)))

    model.add(Conv2D(64, (3, 3), activation='elu', kernel_regularizer=l2(0.0001)))
    model.add(MaxPooling2D((2, 2)))

    model.add(Conv2D(64, (3, 3), activation='elu', kernel_regularizer=l2(0.0001)))
    model.add(MaxPooling2D((2, 2)))

    model.add(Conv2D(64, (3, 3), activation='elu', kernel_regularizer=l2(0.0001)))
    model.add(MaxPooling2D((2, 2)))

    model.add(Flatten())

    model.add(Dense(64, activation='elu', kernel_regularizer=l2(0.0001)))
    model.add(Dropout(0.2))

    model.add(Dense(32, activation="elu", kernel_regularizer=l2(0.0001)))
    model.add(Dropout(0.2))

    model.add(Dense(16, activation="elu", kernel_regularizer=l2(0.0001)))
    model.add(Dropout(0.1))

    model.add(Dense(2, activation='sigmoid'))

    # Compile the model with a learning rate schedule
    initial_learning_rate = 0.0005
    lr_schedule = tf.keras.optimizers.schedules.ExponentialDecay(
        initial_learning_rate, decay_steps=100000, decay_rate=0.94, staircase=True
    )

    model.compile(optimizer=Adam(learning_rate=lr_schedule), loss='binary_crossentropy', metrics=['accuracy'])

    return model


def train_model(model, train_ds, test_ds):
    history = model.fit(train_ds, epochs=50, validation_data=test_ds)
    model.save("wasteModel.h5")
    return history


def evaluate_model(model, test_ds):
    loss, accuracy = model.evaluate(test_ds, verbose=2)
    print(f"Testing set Accuracy: {accuracy}")
    return accuracy


def plot_history(history):
    plt.figure(figsize=(12, 4))
    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'])
    plt.plot(history.history['val_accuracy'])
    plt.title('Model accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Test'], loc='upper left')

    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'])
    plt.plot(history.history['val_loss'])
    plt.title('Model loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend(['Train', 'Test'], loc='upper left')

    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    TRAIN_DIR = "/kaggle/input/non-and-biodegradable-waste-dataset/TRAIN.1"
    TEST_DIR = "/kaggle/input/non-and-biodegradable-waste-dataset/TEST"

    train_ds, test_ds = load_data(TRAIN_DIR, TEST_DIR, BATCH_SIZE, IMG_SIZE)
    model = create_model()
    history = train_model(model, train_ds, test_ds)
    accuracy = evaluate_model(model, test_ds)
    plot_history(history)
