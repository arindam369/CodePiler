import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Modal from 'react-modal';
import Image from "next/image";

export default function SubmissionPage() {
    const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const customStyles = {
    overlay:{
      background: "rgba(0,0,0,0.65)",
      zIndex: "100"
    }
  };

  const [submissions, setSubmissions] = useState([]);
  const [code, setCode] = useState("");

  useEffect(()=>{
    axios.get("/api/submission").then((response)=>{
        // console.log(response.data)
        setSubmissions(response.data);
    }).catch((err)=>{
        console.log(err);
    })
  }, [])
  return (
    <div className={styles.submissionContainer}>
      <h2>All submissions</h2>

      <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Language</th>
                <th>Code</th>
                <th>Input</th>
                <th>Status</th>
                <th>Output</th>
                <th>When</th>
            </tr>
        </thead>
        <tbody>
            {submissions.length>0 && submissions.map((submission, id)=>{
                return (
                    <tr key={id}>
                        <td>{submission.USERNAME}</td>
                        <td><Image src={`/logos/${submission.LANGUAGE}.svg`} height={20} width={20} alt="logo"/></td>
                        <td onClick={()=>{setCode(atob(submission.CODE)); openModal()}} className="submissionText">submission</td>
                        <td>{submission.INPUT}</td>
                        <td className="status">{submission.STATUS}</td>
                        <td>{submission.OUTPUT}</td>
                        <td className="timestamp">{new Date(submission.TIMESTAMP).toLocaleString()}</td>
                    </tr>
                )
            })}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className={styles.modal}
      >
        <p>PS: 1st 100 characters of the code are visible</p>
        <textarea value={code}cols="30" rows="10"></textarea>
      </Modal>
    </div>
  );
}
