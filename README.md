# Custos Authentication Integration

This project demonstrates the integration of Custos authentication into a full-stack application, including a React frontend and an Express backend. Users can log in using Custos, and their details (such as name, email, etc.) will be displayed after successful login.

## Table of Contents
* [Project Setup](#project-setup)
* [Technologies Used](#technologies-used)
* [Backend Endpoints](#backend-endpoints)
* [Frontend Workflow](#frontend-workflow)
* [Usage](#usage)
* [Environment Variables](#environment-variables)

## Project Setup

### Prerequisites
Ensure that you have the following installed on your local development environment:
* Node.js (version 14+)
* NPM or Yarn
* A modern web browser
* Custos credentials (client ID, etc.)

### Backend Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Create a `.env` file in the root directory and add your Custos credentials:
```bash
VITE_CLIENT_ID=<Replace with your client id>
VITE_REDIRECT_URL=<Replace with your url>
```
Create a `.env` file in the server directory and add your Custos credentials:
```bash
CLIENT_ID=<Replace with your client id>
```

3. Start the backend server:
```bash
npm start
```
This will start the backend server on http://localhost:3000.

### Frontend Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Start the frontend development server:
```bash
npm run dev
```
This will start the frontend server on http://localhost:5173.

## Technologies Used
* **Express**: Backend framework to handle API requests and routing
* **React**: Frontend framework for building user interfaces
* **Custos**: Authentication provider for managing user login and profile data
* **axios**: HTTP client for making requests from the frontend to the backend
* **node-fetch**: HTTP client used in the backend for making API calls

## Backend Endpoints
The backend includes the following routes:
* `POST /api/v1/identity-management/token`: Exchanges the authorization code for an access token using Custos
* `POST /api/v1/identity-management/user`: Retrieves user information from Custos using the access token
* `POST /api/v1/user-management/userinfo`: Fetches and returns user details after authentication from Custos

## Frontend Workflow
The frontend React app uses two main routes:
* **LoginPage**: Redirects the user to the Custos authentication page. Uses PKCE (Proof Key for Code Exchange) for enhanced security
* **CallbackPage**: Handles the authorization code returned from Custos and exchanges it for an access token. Fetches the user's information from Custos and displays it on the screen

### Key Components
* **LoginPage**: Handles the login process, generates PKCE code verifier and challenge, and redirects to Custos
* **CallbackPage**: Handles the callback from Custos, exchanges the code for an access token, and fetches user information

## Usage

### Login Process:
1. Navigate to the homepage (http://localhost:5173/)
2. Click on the "Login with Custos" button
3. You will be redirected to the Custos login page
4. After successful login, you will be redirected to the callback route (http://localhost:5173/callback)
5. The application will exchange the authorization code for an access token and display the user's information (e.g., name, email)

## Environment Variables
To run the project, make sure to set the following environment variables in your `.env` file (backend directory):

```bash
VITE_CLIENT_ID=custos-njf4rmwuat2ca3ago8op-10000000
VITE_REDIRECT_URI=http://localhost:5173/callback
```

These environment variables are used for client configuration when exchanging the authorization code for an access token and during the redirection process after successful login.


I've formatted the README.md file with proper Markdown syntax, including:
- Clear section headers with appropriate heading levels
- Code blocks with language highlighting
- Organized lists with proper indentation
- Detailed instructions for setup and usage
- Internal links in the table of contents

Would you like me to make any adjustments to the format or content?