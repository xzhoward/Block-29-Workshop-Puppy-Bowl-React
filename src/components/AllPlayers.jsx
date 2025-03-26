import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPlayers } from '../API';

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const data = await fetchAllPlayers();
        setPlayers(data);
      } catch (err) {
        console.error('Error fetching players:', err);
      } finally {
        setLoading(false);
      }
    };
    getPlayers();
  }, []);

  if (loading) return <p>Loading players...</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Puppy Bowl Roster</h1>
      <div style={styles.grid}>
        {players.map((player) => (
          <div key={player.id} style={styles.card}>
            <img src={player.imageUrl} alt={player.name} style={styles.image} />
            <h3>{player.name}</h3>
            <p>{player.breed}</p>
            <Link to={`/players/${player.id}`}>
              <button style={styles.button}>See Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default AllPlayers;
