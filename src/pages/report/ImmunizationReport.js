 import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig'; 
import { collection, query, where, onSnapshot, getDocs, doc, updateDoc } from 'firebase/firestore';
import { IMMUNIZATION_HEADERS } from '../../constants';
 import '../../App.css';

const ImmunizationReport = ({ onNavigate, selectedChild, userRole }) => {
  const [records, setRecords] = useState([]);
  const [vaccineMap, setVaccineMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchVaccineNames = async () => {
      const querySnapshot = await getDocs(collection(db, "vaccines"));
      const mapping = {};
      querySnapshot.forEach((doc) => { mapping[doc.id] = doc.data().vaccine_name; });
      setVaccineMap(mapping);
    };
    fetchVaccineNames();

    const childId = selectedChild?.id || "CH001";
    const q = query(collection(db, "immunization_records"), where("child_id", "==", childId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedRecords = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = fetchedRecords.sort((a, b) => new Date(b.date_administered) - new Date(a.date_administered));
      
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
      await updateDoc(doc(db, "immunization_records", id), {
        batch_no: editData.batch_no || "",
        notes: editData.notes || "",
        date_administered: editData.date_administered || ""
      });
      alert("Record Updated Successfully!");
      setEditingId(null);
    } catch (error) {
      alert("Update Failed: " + error.message);
    }
  };

  if (loading) return <div className="web-container"><p>Loading Immunization History...</p></div>;

  return (
    <div className="web-container">
      <button className="back-btn" onClick={() => onNavigate('Dashboard')}>← BACK</button>
      
      <h1 className="form-title">
        {userRole === 'doctor' ? "Immunization Summary" : "Immunization History Report"}
      </h1>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#6B3E26' }}>Patient: {selectedChild?.child_name}</h2>
        <p style={{ color: '#8d5d44' }}>Access Level: <strong>{userRole?.toUpperCase()}</strong></p>
      </div>

      <div className="vaccine-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="vaccine-card" style={{ overflowX: 'auto' }}>
          {records.length > 0 ? (
            <table className="report-table">
              <thead>
                <tr>
                  {IMMUNIZATION_HEADERS.map(h => (
                    <th key={h} style={{ display: (h === "Actions" && userRole !== 'sphm') ? 'none' : 'table-cell' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td><strong>{vaccineMap[record.vaccine_id] || "Loading Name..."}</strong></td>
                    <td>
                      {editingId === record.id ? 
                        <input name="date_administered" type="date" className="edit-input" style={{width: '130px'}} value={editData.date_administered} onChange={handleInputChange} /> 
                        : record.date_administered}
                    </td>
                    <td>
                      {editingId === record.id ? 
                        <input name="batch_no" type="text" className="edit-input" value={editData.batch_no} onChange={handleInputChange} /> 
                        : (record.batch_no || "N/A")}
                    </td>
                    <td>
                      <span style={{ color: record.status === "Completed" ? "green" : "orange", fontWeight: "bold" }}>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      {editingId === record.id ? 
                        <input name="notes" type="text" className="edit-input" value={editData.notes} onChange={handleInputChange} /> 
                        : (record.notes || "None")}
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
          ) : (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>No immunization records found for this patient.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImmunizationReport;