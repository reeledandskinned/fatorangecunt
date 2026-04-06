// src/App.js
import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import trumpImage from "./assets/trump.jpg"; // make sure this file exists

function App() {
  const [alive, setAlive] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const peopleRef = ref(database, "people");

    onValue(peopleRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      let trumpAlive = true;
      Object.entries(data).forEach(([key, value]) => {
        if (key.toLowerCase().includes("trump")) {
          trumpAlive = value.alive;
        }
      });

      if (!trumpAlive && alive) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }

      setAlive(trumpAlive);
      setLoaded(true);
    });
  }, [alive]);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      fontFamily: "'Helvetica Neue', sans-serif",
      padding: "1rem",
      position: "relative"
    }}>
      {showToast && (
        <div style={{
          position: "absolute",
          top: "2rem",
          right: "2rem",
          backgroundColor: "#c62828",
          color: "#fff",
          padding: "1rem 1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          fontWeight: "bold",
          animation: "slideIn 0.5s ease"
        }}>
          The fat orange cunt is DEAD.
        </div>
      )}

      <div style={{
        background: alive
          ? "linear-gradient(145deg, #ffffff, #e6f0ff)"
          : "linear-gradient(145deg, #fff0f0, #ffe6e6)",
        padding: "3rem",
        borderRadius: "20px",
        boxShadow: alive
          ? "10px 10px 30px #d0e0ff, -10px -10px 30px #ffffff"
          : "10px 10px 30px #ffd0d0, -10px -10px 30px #ffffff",
        textAlign: "center",
        maxWidth: "550px",
        width: "90%",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease"
      }}>
        <img
          src={trumpImage}
          alt="Donald Trump"
          style={{
            width: "180px",
            maxWidth: "80%",
            borderRadius: "50%",
            marginBottom: "1.5rem",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: alive
              ? "0 15px 35px rgba(76, 175, 80, 0.3)"
              : "0 15px 35px rgba(244, 67, 54, 0.3)"
          }}
          className="trump-image"
        />
        <h1 style={{
          fontSize: "2.4rem",
          color: alive ? "#2e7d32" : "#c62828",
          marginBottom: "0.5rem"
        }}>
          Donald Trump
        </h1>
        <p style={{ color: "#555", fontSize: "1rem" }}>
          Live status tracking — automatically updates.
        </p>
        <p style={{
          marginTop: "1.5rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: alive ? "#2e7d32" : "#c62828",
          textShadow: alive
            ? "0 0 8px rgba(46, 125, 50, 0.7)"
            : "0 0 8px rgba(198, 40, 40, 0.7)"
        }}>
          Status: {alive ? "Alive :-(" : "He's DEAD, YES REALLY!"}
        </p>
      </div>

      <style>
        {`
          .trump-image:hover {
            transform: scale(1.08);
            box-shadow: ${alive
              ? "0 20px 45px rgba(76, 175, 80, 0.5)"
              : "0 20px 45px rgba(244, 67, 54, 0.5)"};
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @media (max-width: 600px) {
            div[style*="max-width: 550px"] {
              padding: 2rem;
            }
            h1 {
              font-size: 1.8rem !important;
            }
            .trump-image {
              width: 120px !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;