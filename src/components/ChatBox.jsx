import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../styles/chat.css";
import logo from "../assets/Send.svg";

export default function Chat(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chat, setChatReply] = useState([
    `Hi there 👋 What brings you to NIH Service Desk?`,
  ]);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  const chatContainerRef = useRef(null);

  const getInputValue = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  });

  const sendMessage = async () => {
    setCount(count + 1);
    setTitle("");
    setPosts((prevposts) => [...prevposts, title]);
    setLoading(true);

    try {
      const apiOutput = await axios.post(
        "http://65.1.17.228:3001/",
        {
          inputs: `${title}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const regex = /(<([^>]+)>)/gi;
      console.log(apiOutput.data);
      console.log(apiOutput.data.generated_text);
      if (apiOutput.data.generated_text.includes("\n")) {
        const splitText = apiOutput.data.generated_text.split("\n");
        const joinedText = splitText.join("<br/> <br/>");
        setChatReply((prevposts) => [...prevposts, joinedText]);
      } else {
        setChatReply((prevposts) => [
          ...prevposts,
          apiOutput.data.generated_text,
        ]);
      }
    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="chatContainer">
        <div className={`${props.isOpen ? "chatMain" : ""}`}>
          <div className="chatHeading">
            <h2 style={{ opacity: 0.8 }}>Hello there</h2>
            <h3>How can we help?</h3>
            <div
              className="mt-5 card d-flex flex-row"
              style={{
                marginRight: "15px",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">Send us a Message</h5>
                <div className="d-flex flex-row">
                  <div>
                    <p className="card-text">
                      Our ChatBot Typically Reply Within Seconds
                    </p>
                  </div>
                  <div>
                    <img src={logo} alt="logo" onClick={sendMessage} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="chatMessages" ref={chatContainerRef}>
            {chat.map((element, index) => (
              <div key={index}>
                <div className="chatMessageConvoInitial">
                  <div className="chatInitialMessage">
                    <p className="chatBotName"> Ralph from NIH</p>
                    <p dangerouslySetInnerHTML={{ __html: element }}></p>
                  </div>
                </div>

                {/* Render typing indicator if loading is true and it's the last chat element */}
                {loading && index === chat.length - 1 ? (
                  <div className="chatMessageConvoInitial">
                    <div className="typingIndicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : null}

                <div className="chatMessageConvo2">
                  {posts[index] != null ? (
                    <p className="chatUserMessage">{posts[index]}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div className="chatInputDiv">
            <input
              type="text"
              className="input"
              placeholder="Send us a message"
              onChange={getInputValue}
              value={title}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <img src={logo} alt="logo" onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
}
