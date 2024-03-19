import axios from "axios";

export default async function handler(req, res) {
  if(req.method==="GET"){
    const {token} = req.query;

    const options = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(response.data);
      res.status(200).send(response.data);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  }
}
