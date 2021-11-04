import cv2
import numpy as np

class ProcessorError(Exception):
    pass

class Processor:
    def __init__(self, img):
        processed = self.grayscale(img)
        corners = self.findCorners(processed)
        if corners is None:
            raise ProcessorError('No corners detected on the image')
            
        transformed = self.transform(processed, corners)
        self.final = self.create(transformed)

    @property
    def image(self):
        return self.final

    def grayscale(self, image):
        # Grayscale
        img = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # Gaussian Blur => blue to reduce noise
        process = cv2.GaussianBlur(img.copy(), (9, 9), 0)
        # Segmentation of image
        process = cv2.adaptiveThreshold(process, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
        # Invert color
        process = cv2.bitwise_not(process, process)

        # Dilation 
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2, 2))
        process = cv2.dilate(process, kernel)
        process = cv2.resize(process, (450, 450))
        return process

    def findCorners(self, img):
        cnts = cv2.findContours(img.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        cnts = cnts[0] if len(cnts) == 2 else cnts[1]
        cnts = sorted(cnts, key=cv2.contourArea, reverse=True)

        for c in cnts:
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.015 * peri, True)
            if len(approx) == 4:
                return approx


    def transform(self, img, corners):
        def orderCorners(corners):
            corners = [(corner[0][0], corner[0][1]) for corner in corners]
            top_l, bottom_l, bottom_r, top_r = corners[0], corners[1], corners[2], corners[3]
            return top_l, bottom_l, bottom_r, top_r

        def calcDistance(point_1, point_2):
            return np.sqrt(((point_2[0] - point_1[0]) ** 2) + ((point_2[1] - point_1[1]) ** 2))

        ordered_corners = orderCorners(corners)
        top_l, bottom_l, bottom_r, top_r = ordered_corners

        width_A = calcDistance(bottom_l, bottom_r)
        width_B = calcDistance(top_l, top_r)
        width = max(int(width_A), int(width_B))

        height_A = calcDistance(bottom_r, top_r)
        height_B = calcDistance(top_l, bottom_l)
        height = max(int(height_A), int(height_B))

        dimensions = np.array([[0, 0], [0, height - 1], [width - 1, height - 1],
                            [width - 1, 0]], dtype="float32")

        original = [top_l, bottom_l, bottom_r, top_r]
        original = np.array(original, dtype="float32")

        grid = cv2.getPerspectiveTransform(original, dimensions)

        return cv2.warpPerspective(img, grid, (width, height), flags=cv2.INTER_LINEAR)

    def create(self, img):
        grid = np.copy(img)
        edge_h = np.shape(grid)[0]
        edge_w = np.shape(grid)[1]
        celledge_h = edge_h // 9
        celledge_w = np.shape(grid)[1] // 9

        tempgrid = []
        for i in range(celledge_h, edge_h + 1, celledge_h):
            for j in range(celledge_w, edge_w + 1, celledge_w):
                rows = grid[i - celledge_h:i]
                tempgrid.append([rows[k][j - celledge_w:j] for k in range(len(rows))])

        finalgrid = []
        for i in range(0, len(tempgrid) - 8, 9):
            finalgrid.append(tempgrid[i:i + 9])

        for i in range(9):
            for j in range(9):
                finalgrid[i][j] = np.array(finalgrid[i][j])

        return finalgrid