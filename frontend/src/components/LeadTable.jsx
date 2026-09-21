import axios from 'axios';

function LeadTable({ leads, onStatusChange, onDelete }) {
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, { status: newStatus });
      onStatusChange();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/leads/${id}`);
      onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4' }}>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>Phone</th>
          <th style={thStyle}>Assigned To</th>
          <th style={thStyle}>Created At</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads.map(lead => (
          <tr key={lead._id} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={tdStyle}>{lead.email}</td>
            <td style={tdStyle}>{lead.phone}</td>
            <td style={tdStyle}>{lead.assignedTo}</td>
            <td style={tdStyle}>{new Date(lead.createdAt).toLocaleDateString()}</td>
            <td style={tdStyle}>
              <select 
                value={lead.status} 
                onChange={(e) => handleStatusUpdate(lead._id, e.target.value)}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
              </select>
            </td>
            <td style={tdStyle}>
              <button onClick={() => handleDelete(lead._id)} style={{ color: 'red' }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const thStyle = { padding: '10px', textAlign: 'left', border: '1px solid #ddd' };
const tdStyle = { padding: '10px', textAlign: 'left', border: '1px solid #ddd' };

export default LeadTable;