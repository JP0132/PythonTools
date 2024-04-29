import os
import pythoncom
from PIL import Image

# Initialize COM before running the Flask app
pythoncom.CoInitialize()

class ImageCompression():
    def __init__(self):
        pass
    
    def img_compression(self, img, level):
        pythoncom.CoInitialize()
        
        level = int(level)
        
        compressed_img = img.copy()
        
        compressed_img.save('compressed_image.jpg', optimize=True, quality=level)
        
        return 'compressed_image.jpg'
        