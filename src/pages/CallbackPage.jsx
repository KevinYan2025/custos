import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import axios from 'axios';

const Callback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const [accessToken, setAccessToken] = useState(null);
  const [code, setCode] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setCode(urlParams.get('code'));

},[location.search])

useEffect(() => {
  const fetchToken = async () => {
    if (!code) return; // Ensure code is populated before making the request

    try {

      const response = await axios.post('http://localhost:3000/api/v1/identity-management/token', {
        code: code,
        redirect_uri: import.meta.env.VITE_REDIRECT_URL,
        grant_type: 'authorization_code',
        code_verifier: localStorage.getItem('pkce_code_verifier'),
      });

      console.log('Response data:', response.data);
      setAccessToken(response.data); // Store the access token
      localStorage.setItem('access_token', response.data); // Optionally store in localStorage

    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  fetchToken();
}, [code]);

// const fetchUser = async () => {
//   try {
//     if (!accessToken){
//       console.log("No access token");
//       return; 
//     } 
//     const response = await axios.post('http://localhost:3000/api/v1/identity-management/user', {
//       access_token: accessToken,
//       code: code,
//     });

//     console.log('User data:', response.data);
//     setUserInfo(response.data); // Store the user data

//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// }
useEffect(() => {
  const getUserInfo = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user-management/userinfo',{
        access_token: localStorage.getItem('access_token'),
        code: code,
      })
      console.log('User data:', response);
      setUserInfo(response.data); // Store the user data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  getUserInfo();
},[accessToken])

  return (
<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
  {userInfo && (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 shadow-sm">
        Welcome, {userInfo.given_name}!
      </h2>
      <div className="space-y-4">
        <p className="text-gray-600">
          <span className="font-semibold">Full Name:</span> {userInfo.name}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {userInfo.email}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Preferred Username:</span> {userInfo.preferred_username}
        </p>
      </div>
    </div>
  )}
</div>
  );
};

export default Callback;
