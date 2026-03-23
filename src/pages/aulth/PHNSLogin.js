 import React from 'react';
import SharedLogin from '../../components/SharedLogin';

const PHNSLogin = ({ onLoginSubmitSuccess }) => (
  <SharedLogin 
    title="PHNS Login"
    emailLabel="PHNS Email ID"
    buttonText="Login as PHNS"
    initialValues={{ email: '', password: '' }}
    requiredRoleId="3" 
    onLoginSubmitSuccess={onLoginSubmitSuccess} 
  />
);
export default PHNSLogin;