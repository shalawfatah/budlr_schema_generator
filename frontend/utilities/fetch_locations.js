export const fetch_locations = async() => {
  const url = "http://localhost:5050/"
  const response = await fetch(url)
  if(!response.ok) {
    throw new Error("Data is not fetched");
  }
  const result = await response.json()
  return result;
}
