from flask import Flask, request, send_file, after_this_request
from flask_cors import CORS
from PDFConversion import PDFConversion
from RemoveBackground import RemoveBackground
from ImageCompression import ImageCompression
import os
import pythoncom
import time
from PIL import Image
from io import BytesIO

# Initialize COM before running the Flask app
pythoncom.CoInitialize()

app = Flask(__name__)
CORS(app)  # Allow requests from all origins


# To create a virtual enviroment: python -m venv <path>
#To start the enviroment: ./venv/Scripts/activate

# PDF Conversion API route
@app.route("/topdf", methods=['POST'])
def pdfConversion():
    # if request.method == 'POST':
    #     if 'file' not in request.files:
    #         return 'No file uploaded', 400
    file = request.files['file']
    if file.filename == '':
        return 'No file selected', 400
    
    input_path = file.filename
    output_path = 'output.pdf'
    
    file.save(input_path)
    file.close()
    
    pdf_converter = PDFConversion()
    
    # Convert document to PDF
    pdf_converter.word_conversion(input_path, output_path)

    # Remove the original document 
    os.remove(input_path)
  
    response = send_file(output_path, as_attachment=True,)

    return response

# Remove Background API route
@app.route("/removebg", methods=['POST'])
def removeBackground():
    # if request.method == 'POST':
    #     if 'file' not in request.files:
    #         return 'No file uploaded', 400
    file = request.files['file']
    if file.filename == '':
        return 'No file selected', 400
    
    if file:
        input_image = Image.open(file.stream)
        
        remover = RemoveBackground()
        
        # Remove the background from the image
        output = remover.remove_background(input_image)
        
        img_io = BytesIO()
        output.save(img_io, 'PNG')
        img_io.seek(0)
        
    
        response = send_file(img_io, mimetype='image/png', as_attachment=True, download_name='_rmbg.png')

        return response
    


# Image Compression API route
@app.route("/compressImg", methods=['POST'])
def imgCompression():
 
    file = request.files['file']
    if file.filename == '':
        return 'No file selected', 400
    
    if file:
        level = request.form['level']
        input_image = Image.open(file.stream)
        
        compressor = ImageCompression()
        
        output = compressor.img_compression(input_image, level)
        
        
    
        response = send_file(output, mimetype='image/jpg', as_attachment=True, download_name='_compress.jpg')

        return response
    


if __name__ == "__main__":
    app.run(debug=True)