import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function LangStart() {
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
        <img
          src="/img/valla/valla_idle_sw/1.png"
          alt="Character 1"
          className="character"
        />
        <img
          src="/img/devil.png"
          alt="Character 2"
          className="character"
        />
      </div>
      <div className="dialogue-box">
        {error && <p>{error}</p>}
        {messages && Object.keys(messages).length > 0 ? (
          <>
            {messages.Text && <p>{messages.Text}</p>}
            {messages.Text2 && <p>{messages.Text2}</p>}
            {messages.Text3 && <p>{messages.Text3}</p>}
            {messages.Text4 && <p>{messages.Text4}</p>}
            {messages.Text5 && <p>{messages.Text5}</p>}
            {messages.Text6 && <p>{messages.Text6}</p>}
            {messages.Text2tablecol && <p>{messages.Text2tablecol}</p>}
          </>
        ) : (
          !error && <p>Loading messages...</p>
        )}
      </div>
    </div>
  );
}

export default LangStart;
