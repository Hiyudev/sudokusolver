from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Flatten
from keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.utils import to_categorical

class ModelCreator:
    def __init__(self):
        # Training data models
        (X_test, y_test, X_train, y_train) = self.convert()
        
        model = self.createModel()
        model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=10, batch_size=200)
        model.save("model.h5")


    def convert(self):
        (X_train, y_train), (X_test, y_test) = mnist.load_data()

        X_train = X_train.reshape(X_train.shape[0], 28, 28, 1).astype('float32')
        X_test = X_test.reshape(X_test.shape[0], 28, 28, 1).astype('float32')

        y_train = to_categorical(y_train)
        y_test = to_categorical(y_test)

        X_train = X_train.astype('float32')
        X_test = X_test.astype('float32')
        X_train = (X_train / 255.0)
        X_test = (X_test / 255.0)

        return (X_test, y_test, X_train, y_train)

    def createModel(self):
        model = Sequential()
        model.add(Conv2D(32, (3, 3), activation='relu', kernel_initializer='he_uniform', input_shape=(28, 28, 1)))
        model.add(MaxPooling2D((2, 2)))
        model.add(Conv2D(64, (3, 3), activation='relu', kernel_initializer='he_uniform'))
        model.add(Conv2D(64, (3, 3), activation='relu', kernel_initializer='he_uniform'))
        model.add(MaxPooling2D((2, 2)))
        model.add(Flatten())
        model.add(Dense(100, activation='relu', kernel_initializer='he_uniform'))
        model.add(Dense(10, activation='softmax'))
        model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
        return model


if __name__ == "__main__":
    ModelCreator()