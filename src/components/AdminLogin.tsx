import React, { useContext } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { apiLogin } from '../services/api';
import { IS_LOCAL_DEVELOPMENT } from '../constants';
import { ForceUpdateContext } from '../routers/MainRouter';

export const AdminLogin = () => {
  const forceUpdate = useContext(ForceUpdateContext);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {IS_LOCAL_DEVELOPMENT ? (
        <button
          onClick={async () => {
            const isSuccess = await apiLogin('mock-google-token');
            alert(isSuccess ? 'success' : 'error');
            forceUpdate();
          }}
        >
          Sign in with Google mock
        </button>
      ) : (
        <GoogleLogin
          onSuccess={async (credentialResponse: CredentialResponse) => {
            const isSuccess = await apiLogin(credentialResponse.credential);
            alert(isSuccess ? 'success' : 'error');
            forceUpdate();
          }}
          onError={() => {
            console.error('Login Failed');
          }}
        />
      )}
    </div>
  );
};
