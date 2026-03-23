 import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { auth, db } from '../config/firebaseConfig';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import '../App.css';

export default function SharedLogin({ title, emailLabel, buttonText, initialValues, requiredRoleId, onLoginSubmitSuccess }) {
  const [loading, setLoading] = useState(false);

  const validate = (vals) => {
    let errors = {};
    if (!vals.email) errors.email = "Email is required";
    else if (!/@/.test(vals.email)) errors.email = "Email is invalid";
    if (!vals.password) errors.password = "Password is required";
    return errors;
  };

  const { values, errors, handleChange } = useForm(initialValues, validate);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0 || !values.email || !values.password) {
      alert("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role_id === requiredRoleId) {
          if (onLoginSubmitSuccess) onLoginSubmitSuccess();
        } else {
          alert(`Unauthorized access! This is not a ${title} account.`);
          await signOut(auth);
        }
      }
    } catch (error) {
      alert("Invalid Email or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-body"> 
      <div className="login-glass-box">
        <h3>{title}</h3>
        <form onSubmit={handleAuth} noValidate>
          <div className="input-field">
            <label>{emailLabel}</label>
            <input name="email" type="email" value={values.email} onChange={handleChange} className={errors.email ? 'input-error' : ''} />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="input-field">
            <label>Password</label>
            <input name="password" type="password" value={values.password} onChange={handleChange} className={errors.password ? 'input-error' : ''} />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}