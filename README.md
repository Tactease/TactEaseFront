## Project name: TactEase
This is a React-based web application designed to assist commanders in scheduling missions for their class soldiers.
The application leverages a Constraint Satisfaction Problem (CSP) algorithm to ensure that scheduling considers various constraints to optimize mission assignments.

# Gettin started
Clone this repository.
Change directory cd tactease-frontend
Install dependencies: npm install
Create a .env file in the project root and add any environment variables you might need (e.g., API base URL).
Run the development server: npm run dev

#Project structure
src - Contains the application source code.
components - Reusable UI components.
pages - React components representing different application views (e.g., Calender, Login, Requests).
APIs - Functions for interacting with the backend API.
App.js - The main application entry point.
public - Contains static assets like logo and icons

#Key features
User Authentication (using localStorage)
View weekly schedule
Requests History
commander:
drag and drop mission into the scheduler
Adding and updating missions
Approving and rejecting requests
soldier:
adding requests

# Dependencies:
React
react-router-dom
axios (for API calls)
styled-components
and more
