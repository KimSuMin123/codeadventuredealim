import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function LangStart() {
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState(null);

  const { lan } = useParams();

  useEffect(() => {
    fetch(`/get_message?lan=${lan}`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => {
        console.error("Error fetching message:", error);
        setError("Error loading messages");
      });
  }, [lan]);

  return (
    <div className="LangStart">
      <div className="character-container">
        <img
          src="/path/to/valla_idle_sw_1.png"
          alt="Character 1"
          className="character"
        />
        <img src="/path/to/devil.png" alt="Character 2" className="character" />
      </div>
      <div className="dialogue-box">
        {error && <p>{error}</p>}
        {messages ? (
          <>
            <p>{messages.Text}</p>
            <p>{messages.Text2}</p>
            <p>{messages.Text3}</p>
            <p>{messages.Text4}</p>
            <p>{messages.Text5}</p>
            <p>{messages.Text6}</p>
            <p>{messages.Text2tablecol}</p>
          </>
        ) : (
          <p>Loading messages...</p>
        )}
      </div>
    </div>
  );
}

export default LangStart;
