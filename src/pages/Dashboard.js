 import React from 'react';
import '../App.css'; 

const Dashboard = ({ onNavigate, selectedChild }) => {
  return (
    <div className="phm-selection-wrapper">  
      <div className="phm-glass-container dashboard-box">
        
        <h2 className="phm-title" style={{ fontSize: '1.8rem' }}>Select Record Type</h2>
        
        {selectedChild ? (
          <div className="patient-info-badge">
            <span className="dot"></span>
            Current Patient: <strong>{selectedChild.child_name}</strong>
          </div>
        ) : (
          <p className="phm-subtitle">Please select a category to proceed</p>
        )}
        
        <div className="dashboard-menu">
          <button 
            className="phm-officer-btn menu-btn" 
            onClick={() => onNavigate('ChildHealthReport')}
          >
            Child Health Record <span>📊</span>
          </button>

          <button 
            className="phm-officer-btn menu-btn" 
            onClick={() => onNavigate('ImmunizationReport')}
          >
            Immunization Record <span>💉</span>
          </button>

          <button 
            className="phm-officer-btn menu-btn" 
            onClick={() => onNavigate('ChildDetails')}
          >
            View Child Details <span>👤</span>
          </button>
        </div>

        <button className="phm-back-btn" style={{marginTop: '20px', width: '100%'}} onClick={() => onNavigate('SPHMDashboard')}>
          ← Change Child / Officer
        </button>

      </div>
    </div>
  );
};

export default Dashboard;
