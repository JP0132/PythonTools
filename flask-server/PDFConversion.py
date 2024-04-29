import os
from docx2pdf import convert
import pythoncom

# Initialize COM before running the Flask app
pythoncom.CoInitialize()

class PDFConversion():
    def __init__(self):
        pass
    
    def word_conversion(self, input_filename, output_filename):
        pythoncom.CoInitialize()
        if input_filename.lower().endswith('.docx'):
            convert(input_filename, output_filename)
        elif input_filename.lower().endswith('.doc'):
            os.system(f"unoconv -f pdf {input_filename}")
        