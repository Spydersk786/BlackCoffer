# Project Overview

This project provides a full-stack solution for managing and visualizing energy industry insights. It includes a backend built with Python and MongoDB, and a frontend built with React.

## Project Structure

- **json.data**: Contains data in JSON format, which serves as the input dataset for the project.
- **dataTransfer.py**: A Python script to transfer data from `json.data` into the MongoDB database.
- **frontend**: Contains the React-based frontend.
- **backend**: Contains the Python-based backend.

## Setup Instructions

### 1. Preparing the Data

1. **Transfer Data to MongoDB**:
   - Use `dataTransfer.py` to transfer data from `json.data` to your MongoDB database.

   Run the script:
   ```bash
   python dataTransfer.py

Frontend Setup:

Navigate to the frontend folder:

bash:
cd frontend

Install frontend dependencies:

bash:
npm install

Start the React app:

bash:
npm start

The React app will start on http://localhost:3000.

Make sure your backend is running as well so the frontend can communicate with it.

3. Backend Setup
Navigate to the backend folder:

bash:
cd backend

For Mac Create virtual enviroment

bash:
python3 -m venv venv

For Mac Activate virtual enviroment

bash:
source venv/bin/activate

Install backend dependencies:

bash:
pip install -r requirement.txt

Run the Python server:

bash:
python server.py

The backend server will run on http://localhost:5001.

