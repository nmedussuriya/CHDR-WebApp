 import React from 'react';
import { ROLES } from '../constants';

const Home = ({ onNavigate }) => {
  return (
    <div className="home-bg">
      <div className="overlay">
        <h1>Welcome to CHDR Book System</h1>
        
        <div className="main-container">
          {ROLES.map((role) => (
            <div 
              key={role.id} 
              className="role-card" 
              onClick={() => onNavigate(role.id)}
              style={{ cursor: 'pointer' }} 
            >
               
              <div className="icon-border">
                <img 
                  src={role.image} 
                  alt={`${role.title} icon`} 
                />
              </div>
              
               
              <p>{role.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
