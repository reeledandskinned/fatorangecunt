export default async function handler(req, res) {
  try {
    return res.status(200).send("API is working ✅");
  } catch (err) {
    return res.status(500).send("Error");
  }
}