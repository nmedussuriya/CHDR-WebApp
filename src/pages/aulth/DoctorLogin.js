 import React from 'react';
import SharedLogin from '../../components/SharedLogin';

const DoctorLogin = ({ onLoginSubmitSuccess }) => (
  <SharedLogin 
    title="DOCTOR Login"
    emailLabel="DOCTOR Email ID"
    buttonText="Login as DOCTOR"
    initialValues={{ email: '', password: '' }}
    requiredRoleId="5" 
    onLoginSubmitSuccess={onLoginSubmitSuccess} 
  />
);
export default DoctorLogin;