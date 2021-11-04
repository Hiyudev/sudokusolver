import base64
import numpy as np
import cv2


def byte_to_image(bytes_str: str):
    bytes_str = bytes(bytes_str, 'UTF-8')
    img_str = bytes_str.decode()
    im_bytes = base64.b64decode(img_str)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    return img
