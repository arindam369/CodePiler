import axios from "axios";
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, language, input, code } = req.body;
    const encodedCode = Buffer.from(code).toString("base64");
    const encodedInput = Buffer.from(input).toString("base64");
    const storedCode = encodedCode.substring(0, 100);

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "true",
        fields: "*",
        wait: "true",
      },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
        "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
      },
      data: {
        language_id: (language==="cpp")?54:(language==="java")?62:71,
        source_code: encodedCode,
        stdin: encodedInput,
      },
    };

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    try {
      const response = await axios.request(options);
      //   const token = response.data.token;
    //   console.log(response.data);
      const data = response.data;
      const decodedOutput = Buffer.from(data.stdout, "base64").toString(
        "utf-8"
      );

      const [result] = await connection.execute(
        "INSERT INTO codepiler (username, language, input, code, status, output, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          username,
          language,
          input,
          storedCode,
          data.status.description,
          decodedOutput,
          data.created_at,
        ]
      );

      res.status(200).json({ message: "Data inserted successfully." });
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message || "An error occurred.");
    } finally {
        await connection.end();
    }
  } else {
    res.status(200).send({ name: "Hii" });
  }
}
