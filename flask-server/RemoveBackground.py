from rembg import remove
from PIL import Image
import os
import pythoncom

# Initialize COM before running the Flask app
pythoncom.CoInitialize()

class RemoveBackground():
    def __init__(self):
        pass
    
    def remove_background(self, input_image):
        pythoncom.CoInitialize()
        output = remove(input_image, post_process_mask=True)
        
        return output
        
        
       
        
        