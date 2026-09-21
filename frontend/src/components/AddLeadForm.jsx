import { useState } from 'react';
import axios from 'axios';

function AddLeadForm({ onLeadAdded }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    status: 'new',
    assignedTo: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/leads`, formData);
      setFormData({ email: '', phone: '', status: 'new', assignedTo: '' });
      onLeadAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
      <h3>Add New Lead</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
        <input name="assignedTo" type="text" placeholder="Assigned To" value={formData.assignedTo} onChange={handleChange} />
        <button type="submit">Add Lead</button>
      </form>
    </div>
  );
}

export default AddLeadForm;