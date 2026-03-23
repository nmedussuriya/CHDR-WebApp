 import React, { useState, useEffect } from "react"; 
import '../App.css';

 
import { db } from '../config/firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore'; 

export default function ChildDetails({ selectedChild }) { 
  const [childData, setChildData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     
    if (!selectedChild || !selectedChild.id) {
      setLoading(false);
      return;
    }

     
    const childRef = doc(db, "children", selectedChild.id);
    const unsubscribe = onSnapshot(childRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
         
        const formattedData = [
          { label: "Child Name", value: data.child_name || "N/A" },
          { label: "Date of Birth", value: data.dob || "N/A" },
          { label: "Birth Weight(kg)", value: data.birth_weight || "0" },
          { label: "Head circumference at Birth(cm)", value: data.head_circumference || "0" },
          { label: "Length at Birth(cm)", value: data.length_at_birth || "0" },
          { label: "Address", value: data.address || "N/A" },
        ];
        
        setChildData(formattedData);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    });

     
    return () => unsubscribe();
  }, [selectedChild]);  

   
  if (!selectedChild) {
    return (
      <div className="container">
        <div className="card">
          <p>Please select a child from the dashboard first.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div className="container"><p>Loading Child Details...</p></div>;

  return (
    <div className="container">  
      <div className="card">
        <h2 className="title">My Child Details</h2>
        
         
        {childData.length > 0 ? (
          childData.map((item, index) => (
            <div key={index} className="info-box">
              <p className="label">{item.label}</p>
              <p className="value">{item.value}</p>
            </div>
          ))
        ) : (
          <p>No details found for this child.</p>
        )}
      </div>
    </div>
  );
}