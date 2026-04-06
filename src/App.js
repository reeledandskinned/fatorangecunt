// src/App.js
import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import trumpImage from "./assets/trump.jpg";
import "./App.css";

// Firebase config
const firebaseConfig = {
  apiKey: "89bfe130020545ca03db2f42412e46e9",
  authDomain: "fatorangecunt.firebaseapp.com",
  databaseURL: "https://fatorangecunt-default-rtdb.firebaseio.com/",
  projectId: "fatorangecunt",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Sanitize Firebase keys
function sanitizeKey(name) {
  return name.replace(/[.#$\[\]]/g, "_");
}

// Display name nicely
function displayName(key) {
  return key.replace(/_/g, " ");
}

function App() {
  const [statusMap, setStatusMap] = useState({});
  const [newName, setNewName] = useState("");
  const prevStatusRef = useRef({});

  // Listen for changes in Firebase
  useEffect(() => {
    const peopleRef = ref(db, "people");
    let firstLoad = true;

    onValue(peopleRef, (snapshot) => {
      const data = snapshot.val() || {};
      const newStatusMap = {};
      let someoneDead = false;

      Object.keys(data).forEach((key) => {
        const alive = Boolean(data[key].alive);
        newStatusMap[key] = alive;

        if (!firstLoad && alive === false && prevStatusRef.current[key] !== false) {
          alert("Fat Orange CUNT is DEAD");
        }

        if (alive === false) {
          someoneDead = true;
        }

        prevStatusRef.current[key] = alive;
      });

      setStatusMap(newStatusMap);
      firstLoad = false;
    });
  }, []);

  // Update browser tab dynamically
  useEffect(() => {
    const overallAlive = Object.values(statusMap).every((v) => v !== false);
    document.title = overallAlive ? "Is he dead yet? Alive" : "Is he dead yet? DEAD";
  }, [statusMap]);

  // Add a new variant
  const addName = () => {
    if (!newName) return;
    const safeName = sanitizeKey(newName);
    set(ref(db, `people/${safeName}`), { alive: true })
      .then(() => console.log("Write successful"))
      .catch((err) => console.error("Write failed:", err));
    setNewName("");
  };

  const overallAlive = Object.values(statusMap).every((v) => v !== false);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Is he dead yet?</h1>
      <img
        src={trumpImage}
        alt="Donald Trump"
        style={{
          width: "300px",
          maxWidth: "80%",
          borderRadius: "12px",
          marginBottom: "1rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        }}
      />
      <p
        className={overallAlive ? "" : "dead-status"}
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: overallAlive ? "green" : "red",
          transition: "all 0.5s ease",
        }}
      >
        {overallAlive ? "Alive" : "Fat Orange CUNT is DEAD"}
      </p>

      {/* Input box for adding variants */}
      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          placeholder="Enter name variant"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ padding: "0.5rem", fontSize: "1rem", width: "250px", marginRight: "0.5rem" }}
        />
        <button onClick={addName} style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}>
          Add Name
        </button>
      </div>
    </div>
  );
}

export default App;