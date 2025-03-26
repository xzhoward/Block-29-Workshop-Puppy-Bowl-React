import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSinglePlayer, deletePlayer } from '../API';

const SinglePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const getPlayer = async () => {
      try {
        const data = await fetchSinglePlayer(id);
        setPlayer(data);
      } catch (err) {
        console.error('Error fetching player:', err);
      }
    };
    getPlayer();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      await deletePlayer(id);
      navigate('/');
    }
  };

  if (!player) return <p>Loading player details...</p>;

  return (
    <div style={styles.container}>
      <img src={player.imageUrl} alt={player.name} style={styles.image} />
      <h2>{player.name}</h2>
      <p><strong>Breed:</strong> {player.breed}</p>
      <p><strong>Status:</strong> {player.status}</p>
      {player.team && <p><strong>Team:</strong> {player.team.name}</p>}
      <button onClick={handleDelete} style={styles.deleteBtn}>Delete Player</button>
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
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  deleteBtn: {
    marginTop: '1rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default SinglePlayer;
