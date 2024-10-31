import cors from 'cors';
import express from 'express';
import fetch from 'node-fetch'; // Import node-fetch
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load the .env file
const app = express();


// CORS options to allow credentials
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests only from your React app
  credentials: true, // Allow sending credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/api/v1/identity-management/token', async (req, res) => {
    const { code, redirect_uri, grant_type, code_verifier,username,password } = req.body;

    try {
      // Exchange the authorization code for an access token
      const response = await fetch(`https://api.playground.usecustos.org/api/v1/identity-management/token?code_verifier=${code_verifier}`, 
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
            client_id: process.env.CLIENT_ID,

        }),
      });
      // Check if the response is OK and in JSON format
      if (!response.ok) {
        const errorText = await response.text(); // Get the error text (likely HTML)
        console.error('Error response from Custos:', errorText);
        return res.status(response.status).send('Error: ' + errorText); // Return error message
      }
  
      const data = await response.json();  // Parse the JSON response
      console.log(data.access_token);
      
      res.json(data.access_token); // Send the data back to the client
  
    } catch (error) {
      console.error('Unexpected error occurred:', error);
      res.status(500).send('Unexpected error occurred');
    }
  });

  app.post('/api/v1/identity-management/user', async (req, res) => {

    const {access_token,code} = req.body;
    console.log("access_token", access_token);
    try {
      const response = await fetch(`https://api.playground.usecustos.org/api/v1/identity-management/user?access_token=${access_token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,  
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from Custos:', errorText);
        console.log(response);
        
        return res.status(response.status).send('Error: ' + errorText);
      }
      const data = await response.json();
      console.log("userInfo:", data);
      
      res.json(data);

    } catch (error) {
      console.log('Error:', error);
      
    }

  })

  app.post('/api/v1/user-management/userinfo', async (req, res) => {
    const {access_token,code} = req.body;
    try {
      if (!access_token){
        console.log("No access token");
        return; 
      }
      console.log("client id:",process.env.CLIENT_ID);
      
      console.log("access_token", access_token);
      const response = await fetch(`https://api.playground.usecustos.org/api/v1/user-management/userinfo?client_id=${process.env.CLIENT_ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`,
      }}
      );
      if (!response.ok) {
        console.log('Failed to fetch user info:', response.status);
        return res.status(response.status).json({ error: 'Failed to fetch user info' });
      }
      
      const data = await response.json();  // Parse the response data as JSON
      console.log(data);
      res.json(data);  // Send the parsed data back in the response
    } catch (error) {
      console.log('Error:', error);
      throw error;
      
    }
  })

  app.post('/api/v1/group-management/groups', async (req, res) => {
  const { access_token, groupData } = req.body;

  try {
    const response = await fetch('https://api.playground.usecustos.org/api/v1/group-management/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
        'client_id': process.env.CLIENT_ID,
      },
      body: JSON.stringify(groupData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Custos:', errorText);
      return res.status(response.status).send('Error: ' + errorText);
    }

    const data = await response.json();
    console.log("Group created:", data);

    res.json(data);

  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Unexpected error occurred');
  }
});

app.post('/api/v1/group-management/groups', async (req, res) => {
  const { access_token, groupData } = req.body;

  try {
    const response = await fetch('https://api.playground.usecustos.org/api/v1/group-management/groups', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
        'client_id': process.env.CLIENT_ID,
      },
      body: JSON.stringify(groupData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from Custos:', errorText);
      return res.status(response.status).send('Error: ' + errorText);
    }

    const data = await response.json();
    console.log("Group created:", data);

    res.json(data);

  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Unexpected error occurred');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
