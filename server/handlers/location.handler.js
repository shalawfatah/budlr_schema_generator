import 'dotenv/config'

export const locationHandler = async() => {
  const response = await fetch(`${process.env.BUDLR_URL}/api/locations/?max=2000`, {
    headers: {
      privateKey: process.env.BUDLR_PRIVATE_KEY
    }
  })
  const result = await response.json()
  return result;
}
