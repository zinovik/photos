import React, { useContext } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { apiLoad, apiLogin } from '../services/api';
import { IS_LOCAL_DEVELOPMENT } from '../constants';
import { ForceUpdateContext } from '../routers/MainRouter';
import { getUser } from '../state';

export const AdminLogin = () => {
  const forceUpdate = useContext(ForceUpdateContext);

  const clickHandler = async (token: string) => {
    const isSuccess = await apiLogin(token);
    await apiLoad();
    alert(isSuccess ? 'success' : 'error');
    forceUpdate();
  };

  return getUser() ? null : (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {IS_LOCAL_DEVELOPMENT ? (
        <button
          onClick={async () => {
            await clickHandler('mock-google-token');
          }}
        >
          Sign in with Google mock
        </button>
      ) : (
        <GoogleLogin
          onSuccess={async (credentialResponse: CredentialResponse) => {
            if (!credentialResponse.credential) return;
            await clickHandler(credentialResponse.credential);
          }}
          onError={() => {
            console.error('Login Failed');
          }}
        />
      )}
    </div>
  );
};
