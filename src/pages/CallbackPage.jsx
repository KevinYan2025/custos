import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AdminPanelButton from '../components/AdminPanelButton';

const Callback = () => {
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [code, setCode] = useState(localStorage.getItem('authorization_code'));

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    console.log("code",code);
    
    if (code) {
      setCode(code);
      localStorage.setItem('code', code);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchToken = async () => {
      if (!code) return;
      console.log("get");
      
      try {
        const response = await axios.post('http://localhost:3000/api/v1/identity-management/token', {
          code: code,
          redirect_uri: import.meta.env.VITE_REDIRECT_URL,
          grant_type: 'authorization_code',
          code_verifier: localStorage.getItem('pkce_code_verifier'),
        });
        
        setAccessToken(response.data);
        localStorage.setItem('access_token', response.data);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    if (!accessToken) {
      fetchToken();
    }
  }, [code]);

  useEffect(() => {
    const getUserInfo = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.post('http://localhost:3000/api/v1/user-management/userinfo', {
          access_token: accessToken,
        });

        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserInfo();
  }, [accessToken]);

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
          <AdminPanelButton user={userInfo} />
        </div>
      )}
    </div>
  );
};

export default Callback;