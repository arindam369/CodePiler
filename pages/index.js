import { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const runCode = async () => {
    if (username.trim().length === 0) {
      alert("Enter username first");
      return;
    }
    if (code.trim().length === 0) {
      alert("Write your code first");
      return;
    }

    axios.post("/api/compile", {username, language, input, code}).then((data)=>{
      // console.log(data.data.message);
      alert(data.data.message);
    }).catch((err)=>{
      alert(err.response.data)
      console.log(err.response.data);
    })
  };

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.formContainer}>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            <option value="cpp">C++ (GCC 9.2.0)</option>
            <option value="java">Java (OpenJDK 13.0.1)</option>
            <option value="python">Python (3.8.1)</option>
          </select>
          <input type="text" placeholder="Enter stdin (inputs)" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Write your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
          <button onClick={runCode}>Run Code</button>
        </div>
      </div>
    </>
  );
}
