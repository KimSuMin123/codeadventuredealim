import React, { useEffect, useState } from "react";
import devil from "../img/devil.png";
import valla from "../img/valla/valla_idle_sw/1.png";

function LangStart() {
  const [messages, setMessages] = useState({});
  const [error, setError] = useState(null);
  const lan = localStorage.getItem("selectedLanguage");

  useEffect(() => {
    if (!lan) {
      setError("Language parameter is missing");
      return;
    }

    fetch(`/get_message?lan=${lan}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setMessages(data))
      .catch((error) => {
        console.error("Error fetching message:", error);
        setError("Error loading messages");
      });
  }, [lan, history]);

  return (
    <div className="lang-start">
      <div className="character-container">
        <img src={valla} alt="valla" />
        <img src={devil} alt="Devil" />
      </div>
      <div className="dialogue-box">
        {error && <p>{error}</p>}
        {!error && messages && Object.keys(messages).length > 0
          ? Object.keys(messages).map((key) => <p key={key}>{messages[key]}</p>)
          : !error && <p>Loading messages...</p>}
      </div>
    </div>
  );
}

export default LangStart;
