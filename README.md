# Child Health Digital Record (CHDR) System – Web Application

This project is a React-based web application developed as part of a group project to manage and monitor child health records digitally. It supports multiple healthcare roles such as Doctors, PHNS, and SPHM, providing access to child details and health reports.

# Features
Manage child health records
View child health reports
View immunization reports
Role-based login system:
Doctor
PHNS (Public Health Nursing Sister)
SPHM (Supervising Public Health Midwife)
Dashboard interfaces for each role
View detailed child information
Simple navigation between pages
Technologies Used
Frontend: React.js
Routing: React Router
Backend/Database: Firebase (requires configuration)
Styling: CSS
Testing: React Testing Library

# Project Structure
CHDR-WebApp/
│
├── public/
│   ├── index.html
│   ├── images/
│
├── src/
│   ├── pages/
│   │   ├── auth/
│   │   ├── reports/
│   │   ├── Home.js
│   │   ├── Dashboard.js
│   │   ├── SPHMDashboard.js
│   │   ├── ChildDetails.js
│   │
│   ├── constants.js
│   ├── App.js
│   ├── App.css
│
├── package.json
└── README.md

# Installation and Setup

Follow these steps to run the project locally:

1. Clone the repository
git clone https://github.com/your-username/CHDR-WebApp.git
2. Navigate to the project folder
cd CHDR-WebApp
3. Install dependencies
npm install
4. Run the application
npm start

The application will run at:

http://localhost:3000
Firebase Configuration

This project includes Firebase dependencies, but configuration may be required:

Create a Firebase project
Add your Firebase configuration in:
src/config/firebaseConfig.js
Enable necessary services such as Firestore and Authentication
