import { locationHandler } from "../handlers/location.handler.js";

export const getAllLocations = async(req, res) => {
  const result = await locationHandler();
  res.send(result);
}
