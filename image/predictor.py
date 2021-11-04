import cv2
from tensorflow.python.keras.models import load_model

def scale_and_centre(img, size, margin=20, background=0):
    h, w = img.shape[:2]

    def centre_pad(length):
        if length % 2 == 0:
            side1 = int((size - length) / 2)
            side2 = side1
        else:
            side1 = int((size - length) / 2)
            side2 = side1 + 1
        return side1, side2

    def scale(r, x):
        return int(r * x)

    if h > w:
        t_pad = int(margin / 2)
        b_pad = t_pad
        ratio = (size - margin) / h
        w, h = scale(ratio, w), scale(ratio, h)
        l_pad, r_pad = centre_pad(w)
    else:
        l_pad = int(margin / 2)
        r_pad = l_pad
        ratio = (size - margin) / w
        w, h = scale(ratio, w), scale(ratio, h)
        t_pad, b_pad = centre_pad(h)

    img = cv2.resize(img, (w, h))
    img = cv2.copyMakeBorder(img, t_pad, b_pad, l_pad, r_pad, cv2.BORDER_CONSTANT, None, background)
    return cv2.resize(img, (size, size))

    
class Predictor():
    def __init__(self, image):
        try:
            self.model = load_model('model.h5')
        except OSError:
            raise OSError("Model not founded. Please certifiy that you have the model.h5, if you dont have, run the modelcreator.py to create one.")
        
        self.finalimage = self.extract(image)

    @property
    def final(self): 
        return self.finalimage


    def predict(self, img_grid):
        image = img_grid.copy()
        image = cv2.resize(image, (28, 28))
        image = image.astype('float32')
        image = image.reshape(1, 28, 28, 1)
        image /= 255

        model = self.model
        pred = model.predict(image.reshape(1, 28, 28, 1), batch_size=1)

        return float(pred.argmax())

    def extract(self, img):
        tmp_sudoku = [[0 for i in range(9)] for j in range(9)]
        for i in range(9):
            for j in range(9):
                image = img[i][j]
                image = cv2.resize(image, (28, 28))
                
                gray = cv2.threshold(image, 128, 255, cv2.THRESH_BINARY)[1]

                cnts = cv2.findContours(gray, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                cnts = cnts[0] if len(cnts) == 2 else cnts[1]

                for c in cnts:
                    x, y, w, h = cv2.boundingRect(c)

                    if (x < 3 or y < 3 or h < 3 or w < 3):
                        continue

                    ROI = gray[y:y + h, x:x + w]
                    ROI = scale_and_centre(ROI, 120)

                    tmp_sudoku[i][j] = self.predict(gray)

        return tmp_sudoku
