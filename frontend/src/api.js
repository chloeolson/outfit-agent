export async function fetchOutfit() {
  const response = await fetch("http://localhost:3001/api/outfit");
  return response.json();
}