import { useState } from 'react';
import styles from '@/styles/WineModal.module.css';

const WineModal = ({ onClose }) => {
  const [wine, setWine] = useState({ name: '', price: '', region: '', rating: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Wine:', wine);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2>Register New Wine</h2>
        <input type="text" placeholder="Name" onChange={(e) => setWine({ ...wine, name: e.target.value })} />
        <input type="text" placeholder="Price" onChange={(e) => setWine({ ...wine, price: e.target.value })} />
        <input type="text" placeholder="Region" onChange={(e) => setWine({ ...wine, region: e.target.value })} />
        <input type="number" placeholder="Rating" step="0.1" onChange={(e) => setWine({ ...wine, rating: e.target.value })} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose} className={styles.close}>Close</button>
      </div>
    </div>
  );
};

export default WineModal;
