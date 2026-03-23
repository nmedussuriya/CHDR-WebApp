 import React from 'react';
import SharedLogin from '../../components/SharedLogin';

const SPHMLogin = ({ onLoginSubmitSuccess }) => (
  <SharedLogin 
    title="SPHM Login"
    emailLabel="SPHM Email ID"
    buttonText="Login as SPHM"
    initialValues={{ email: '', password: '' }}
    requiredRoleId="4" 
    onLoginSubmitSuccess={onLoginSubmitSuccess} 
  />
);
export default SPHMLogin;