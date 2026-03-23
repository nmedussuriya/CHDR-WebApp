 import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore'; 
import { HEALTH_REPORT_HEADERS } from  '../../constants';
import '../../App.css';

const ChildHealthReport = ({ onNavigate, selectedChild, userRole }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); 
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const childId = selectedChild?.id || "CH001"; 
    const q = query(collection(db, "followups"), where("child_id", "==", childId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedRecords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = fetchedRecords.sort((a, b) => new Date(b.date_checked) - new Date(a.date_checked));
      
      if (userRole === 'doctor') {
        setRecords(sorted.slice(0, 1)); 
      } else {
        setRecords(sorted);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [selectedChild, userRole]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      await updateDoc(doc(db, "followups", id), {
        weight: editData.weight,
        head_circumference: editData.head_circumference,
        eye_condition: editData.eye_condition,
        feeding: editData.feeding,
        reflexes: editData.reflexes
      });
      alert("Record Updated Successfully!");
      setEditingId(null);
    } catch (error) {
      alert("Update Failed: " + error.message);
    }
  };

  if (loading) return <div className="web-container"><p>Loading Health Records...</p></div>;

  return (
    <div className="web-container">
      <button className="back-btn" onClick={() => onNavigate('Dashboard')}>← BACK</button>
      
      <h1 className="form-title">
        {userRole === 'doctor' ? "Child Health Summary" : "Child Health Development Report"}
      </h1>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#6B3E26' }}>Patient: {selectedChild?.child_name}</h2>
        <p style={{ color: '#8d5d44' }}>Access Level: <strong>{userRole?.toUpperCase()}</strong></p>
      </div>

      <div className="vaccine-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="vaccine-card" style={{ overflowX: 'auto' }}>
          <table className="report-table">
            <thead>
              <tr>
                {HEALTH_REPORT_HEADERS.map(h => (
                  <th key={h} style={{ display: (h === "Actions" && userRole !== 'sphm') ? 'none' : 'table-cell' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td><strong>{record.period}</strong></td>
                  <td>{record.date_checked}</td>
                  <td>
                    {editingId === record.id ? 
                      <input name="weight" type="number" className="edit-input" value={editData.weight} onChange={handleInputChange} /> 
                      : record.weight}
                  </td>
                  <td>
                    {editingId === record.id ? 
                      <input name="head_circumference" type="number" className="edit-input" value={editData.head_circumference} onChange={handleInputChange} /> 
                      : record.head_circumference}
                  </td>
                  <td>
                    {editingId === record.id ? 
                      <input name="eye_condition" type="text" className="edit-input" value={editData.eye_condition} onChange={handleInputChange} /> 
                      : record.eye_condition}
                  </td>
                  <td>
                    {editingId === record.id ? 
                      <input name="feeding" type="text" className="edit-input" value={editData.feeding} onChange={handleInputChange} /> 
                      : record.feeding}
                  </td>
                  <td>
                    {editingId === record.id ? 
                      <input name="reflexes" type="text" className="edit-input" value={editData.reflexes} onChange={handleInputChange} /> 
                      : record.reflexes}
                  </td>
                  {userRole === 'sphm' && (
                    <td>
                      {editingId === record.id ? (
                        <div className="action-buttons-container">
                          <button onClick={() => handleUpdate(record.id)} className="save-mini-btn">Save</button>
                          <button onClick={() => setEditingId(null)} className="cancel-mini-btn">X</button>
                        </div>
                      ) : (
                        <button className="edit-btn" onClick={() => { setEditingId(record.id); setEditData(record); }}>Edit 📝</button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChildHealthReport;