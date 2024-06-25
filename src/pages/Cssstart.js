import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import devil from "../img/devil.png";
import valla from "../img/valla.png";

function CssStart() {
  const [messages, setMessages] = useState({});
  const [error, setError] = useState(null);
  const { lan } = useParams();

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
  }, [lan]);

  return (
    <div className="lang-start">
      <div className="character-container">
        <DevilImage src={valla} alt="valla" />
        <DevilImage src={devil} alt="Devil" />
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

export default CssStart;
