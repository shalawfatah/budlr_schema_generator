export const fetch_locations = async() => {
  const response = await fetch("https://budlr-schema-generator.onrender.com")
  if(!response.ok) {
    throw new Error("Data is not fetched");
  }
  const result = await response.json()
  return result;
}
