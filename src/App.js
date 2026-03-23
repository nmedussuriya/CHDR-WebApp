import React, { useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SPHMDashboard from './pages/SPHMDashboard';
import ChildDetails from './pages/ChildDetails';

import DoctorLogin from './pages/auth/DoctorLogin';
import PHNSLogin from './pages/auth/PHNSLogin';
import SPHMLogin from './pages/auth/SPHMLogin';

import ChildHealthReport from './pages/reports/ChildHealthReport';
import ImmunizationReport from './pages/reports/ImmunizationReport';

//import { db, auth } from './config/firebaseConfig';
import './App.css';

function App() {
  const [history, setHistory] = useState(['Home']);
  const [selectedChild, setSelectedChild] = useState(null);
  const [userRole, setUserRole] = useState(null); 
  const [selectedMidwife, setSelectedMidwife] = useState(null); 

  const currentPage = history[history.length - 1];

  const navigateTo = (pageName, data = null, role = null) => {
    if (pageName === 'BACK') {
      handleBack();
      return;
    }

    if (data) setSelectedChild(data); 
    if (role) setUserRole(role); 
    setHistory([...history, pageName]);
  };

   
  const handleBack = () => {
     
    if (currentPage === 'Dashboard') {
      const newHistory = history.filter(page => page !== 'Dashboard');
      setHistory(newHistory);
      return;
    }

     
    if (currentPage === 'SPHMDashboard') {
      setHistory(['Home']);
      setSelectedMidwife(null);
      return;
    }

     
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); 
      setHistory(newHistory); 
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'doctor':
      case 'phns':
      case 'sphm':
        const LoginTag = 
          currentPage === 'doctor' ? DoctorLogin : 
          currentPage === 'phns' ? PHNSLogin : SPHMLogin;
        
        return (
          <LoginTag 
            onLoginSubmitSuccess={() => {
              navigateTo('SPHMDashboard', null, currentPage);
            }} 
          />
        );

      case 'SPHMDashboard':
        return (
          <SPHMDashboard 
            onNavigate={navigateTo} 
            selectedMidwife={selectedMidwife} 
            setSelectedMidwife={setSelectedMidwife} 
          />
        );
      
      case 'Dashboard':
        return <Dashboard onNavigate={navigateTo} selectedChild={selectedChild} />;
        
      case 'ChildHealthReport':
        return (
          <ChildHealthReport 
            onNavigate={handleBack} 
            selectedChild={selectedChild} 
            userRole={userRole} 
          />
        );
        
      case 'ImmunizationReport':
        return( 
            <ImmunizationReport 
              onNavigate={handleBack}
              selectedChild={selectedChild} 
              userRole={userRole}
            />
          );

      case 'ChildDetails':
        return <ChildDetails selectedChild={selectedChild} />;
        
      case 'Home':
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="App">
      {currentPage !== 'Home' && (
        <button className='back-btn' onClick={handleBack}>
          ← BACK
        </button>
      )}
      {renderPage()}
    </div>
  );
}

export default App;