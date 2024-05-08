# PyToolbox: A Web Application for Python-Powered Tools with React, TypeScript, and Tailwind CSS Integration

This project represents a consolidation of serveral Python tools into a single web application. Its aim is to streamline the process of selecting a tool, uploading the necessary files, and executing the chosen operation, ultimately returning the output file to the user. Currently, the integrated tools include Word to PDF conversion, image compression, and background removal for images.

- Backend powered by Flask, a lightweight Python micro web framework, chosen for its simplicity and adeptness in creating APIs.
- Each tool is encapsulated in separate files, using Object-Oriented Programming principles for modularisation, easing future updates.
- Third-party packages are integrated for seamless tool execution.
- Frontend developed with React and TypeScript to ensure type-safe data handling.
- Tailwind CSS used for component styling, enabling rapid developemnt with inline styles, minimising reliance on classes and IDs.
- Enhanced user experience through both file selection and drag-and-drop functionalities.
- Automated file download prompt upon receiving the data from the server, enhancing usability.

## Requirements

- Python 3.9 or later installed (Tested with 3.9 and 3.10)
- Node installed (using v16.13.0)
- IDE preferably with intergrated terminals to run the client and server. I used Visual Studio Code.
- Compatible browser like Chrome, Firefox and etc.

## How it works and looks:


https://github.com/JP0132/PythonTools/assets/78804278/69b53d41-f55b-4af0-b9b2-eb7ec91b4874

*Note: The files used in the demo are available in the TestFiles folder, to see the differences between the orginal and the files outputted from the tools.*  
1. Clone the project or download all the the folders.
2. Server side:
   _Note: The steps below are for Windows. Linux and MacOS may have different commands._
   1. In the terminal move into the directory of the server: /<path_to_server>/flask-server
   2. In the terminal enter the below to create a virtual environment.
   ```
   python -m venv <name_of_enviroment>
   ```
   3. To activate the virtual environment.
   ```
   venv\Scripts\activate
   ```
   4. Install the required packages using the requirements list.
   ```
   pip install -r requirements.txt
   ```
   5. If no error occur, start the server using:
   ```
   python server.py
   ```
3. Client side:
   _Note: The steps below are for Windows. Linux and MacOS may have different commands._
   1. In the terminal move into the directory of the client: /<path_to_client>/PythonTools
   2. Install the packages.
   ```
   npm i
   ```
   3. Start the development server using:
   ```
   npm run dev
   ```
4. If more tools are added in the future, each time a package is installed run the command below to update the requirements list:

```
pip freeze > requirements.txt
```
