export async function insertStock(query = '') {
  if (!query) {
    return {};
  }
  const response = await fetch(`/api/insertStock?term=${query}`);
  if (!response || !response.ok) return;
  return response;
}
export async function removeStock(uuid) {
  if (!uuid) {
    return {};
  }
  const response = await fetch(`/api/removeStock?term=${uuid}`);
  if (!response || !response.ok) return;
  return response;
}