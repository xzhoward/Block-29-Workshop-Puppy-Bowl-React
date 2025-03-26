import React, { useState } from 'react';
import { createPlayer } from '../API';
import { useNavigate } from 'react-router-dom';

const NewPlayerForm = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !breed || !imageUrl) {
      setError('All fields are required!');
      return;
    }

    try {
      await createPlayer({ name, breed, imageUrl, status: 'bench' });
      setName('');
      setBreed('');
      setImageUrl('');
      navigate('/');
    } catch (err) {
      console.error('Error creating player:', err);
      setError('Failed to create player.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Add a New Puppy Player</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Breed" value={breed} onChange={(e) => setBreed(e.target.value)} style={styles.input} />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={styles.input} />
        <button type="submit" style={styles.button}>Add Player</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '0.75rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default NewPlayerForm;
