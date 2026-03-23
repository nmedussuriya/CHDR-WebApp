 import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import '../App.css';
const SPHMDashboard = ({ onNavigate, selectedMidwife, setSelectedMidwife }) => {
   
  const [step, setStep] = useState(selectedMidwife ? 2 : 1); 
  const [midwives, setMidwives] = useState([]);
  const [children, setChildren] = useState([]);

   
  useEffect(() => {
    const q = query(collection(db, "staffs"), where("role_id", "==", "2"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mwData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMidwives(mwData);
    });
    return () => unsubscribe();
  }, []);

   
  useEffect(() => {
    if (selectedMidwife) {
      const q = query(collection(db, "children"), where("midwife_id", "==", selectedMidwife.id));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const childData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChildren(childData);
      });
      return () => unsubscribe();
    }
  }, [selectedMidwife]);

  if (step === 1) {
    return (
      <div className="phm-selection-wrapper">
        <div className="phm-glass-container">
          <h1 className="phm-title">Select PHM Officer</h1>
          <p className="phm-subtitle">Choose a midwife to view their assigned children</p>
          <div className="midwife-list">
            {midwives.map(mw => (
              <button key={mw.id} className="phm-officer-btn" onClick={() => { setSelectedMidwife(mw); setStep(2); }}>
                {mw.name || "Unnamed Midwife"} <span>→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="phm-selection-wrapper">
        <div className="phm-glass-container">
          <button className="phm-back-btn" onClick={() => { setSelectedMidwife(null); setStep(1); }}>
            ← Back to Midwives
          </button>
          <h1 className="phm-title">Select Child</h1>
          <p className="phm-subtitle">Area: <strong>{selectedMidwife?.name}</strong></p>
          <div className="midwife-list">
            {children.map(child => (
              <button key={child.id} className="phm-officer-btn child-btn" onClick={() => onNavigate('Dashboard', child)}>
                {child.child_name} <span>View Profile</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default SPHMDashboard;  