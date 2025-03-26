const cohort = '2306-ftb-mt-web-pt'; 
const BASE_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohort}`;

export async function fetchAllPlayers() {
  const res = await fetch(`${BASE_URL}/players`);
  const result = await res.json();
  return result.data.players;
}

export async function fetchSinglePlayer(id) {
  const res = await fetch(`${BASE_URL}/players/${id}`);
  const result = await res.json();
  return result.data.player;
}

export async function createPlayer(playerObj) {
  const res = await fetch(`${BASE_URL}/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerObj),
  });
  const result = await res.json();
  return result.data.newPlayer;
}

export async function deletePlayer(id) {
  const res = await fetch(`${BASE_URL}/players/${id}`, {
    method: 'DELETE',
  });
  const result = await res.json();
  return result;
}
