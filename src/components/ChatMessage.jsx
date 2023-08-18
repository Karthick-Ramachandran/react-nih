import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../styles/chat.css";
import logo from "../assets/Send.svg";
import avatar from "../assets/Avatar.svg";
import home from "../assets/Home.svg";
import message from "../assets/Message_B.svg";
import help from "../assets/Help.svg";
import news from "../assets/News.svg";
import ChatHome from "./ChatHome";

export default function ChatMessage(props) {
  const [posts, setPosts] = useState([]);
  const [homestate, setHomeState] = useState(true);
  const [chat, setChatReply] = useState([
    `Hi there 👋 What brings you to NIH Service Desk?`,
    "Could you please check your spam or junk mail folder for the password reset email?",
    "I’m going to send a password reset email to your verified address from our system. Please let me know once you receive it.",
    "Please click the link in the email, which will take you to a page where you can enter your new password twice to confirm it.",
    "Can you now log in to your account with your new password?",
  ]);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);

  const chatContainerRef = useRef(null);
  // onChange Handler function
  // with event parameter
  const getInputValue = (event) => {
    event.preventDefault();
    // show the user input value to console
    // const userValue = event.target.value;
    setTitle(event.target.value);

    // console.log(userValue);
  };
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
  const sendMessage = () => {
    setCount(count + 1);
    setTitle("");
    setPosts((prevposts) => [...prevposts, title]);
    console.log(posts);
  };
  function createPost(event) {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: "user:bhx5xmu6UVX4",
    };
    axios
      .post(
        "https://chat-small.api.h2o.ai/generate",
        {
          inputs:
            "<|prompt|>What are some sample IT services?<|endoftext|><|answer|>",
          parameters: {
            max_new_tokens: 512,
            ";truncate": 1024,
            do_sample: true,
            temperature: 0.1,
            repetition_penalty: 1.2,
          },
        },
        { headers }
      )
      .then((response) => {
        console.log(response.data);
        // this.setState({ posts: [response.data, ...this.state.posts] });
        this.setState({ title: "" });
        this.setState({ body: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    //   <div className="card">
    //   <div className="card-body">
    //     <h5 className="card-title">Hello there </h5>
    //     <h5 className="card-title">How can we help?</h5>
    //   </div>
    //   <hr />
    //   <div className="card-body">
    //     <h5 className="card-title">Card title</h5>
    //     <p className="card-text">
    //       Some quick example text to build on the card title and make up the
    //       bulk of the card's content.
    //     </p>
    //   </div>
    //   <div className="input-group mb-3">
    //     <input
    //       type="text"
    //       className="form-control"
    //       placeholder="Recipient's username"
    //       aria-label="Recipient's username"
    //       aria-describedby="button-addon2"
    //       onChange={getInputValue}
    //     />

    //   </div>
    //   <div className="chatInputDiv">
    //     <input type="text" className="input" placeholder="Send us a message"  onChange={getInputValue} />
    //     <img src={logo} alt="logo" />
    //   </div>
    // </div>

    <div>
      
      <div className="chatContainer">
      <div className={`${props.isOpen ? "chatMain" : ""}`}>
        <div className="chatHeading">
          <h2
            className=""
            style={{
              opacity: 0.8,
            }}
          >
            Hello there{" "}
          </h2>
          <h3 className="">How can we help?</h3>
        </div>
      
        <div className="chatMessages" ref={chatContainerRef}>
          {chat.map((element, index) => (
            <>
              {" "}
              {count >= index ? (
                <div className="chatMessageConvoInitial">
                  <img src={avatar} alt="logo" />
                  <div className="chatInitialMessage">
                    <p className="chatBotName"> Ralph from NIH</p>
                    <p> {element}</p>
                  </div>
                </div>
              ) : null}
              <div className="chatMessageConvo2">
                {/* {userMessage ? <p className="chatUserMessage">{userMessage}</p> : null} */}

                {posts[index] != null ? (
                  <p key={index} className="chatUserMessage">
                    {posts[index]}
                  </p>
                ) : null}
              </div>
            </>
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
        <div className="chatNav">
          <div
            className={`chatNavChild`}
            onClick={() => {
              setHomeState(true);
            }}
          >
            <img className={` ${homestate ? "bg-color" : ""}`} src={home} />
            <p>Home</p>
          </div>
          <div
            className="chatNavChild"
            onClick={() => {
              setHomeState(false);
            }}
          >
            <img
              className={` ${homestate == false ? "bg-color" : ""}`}
              src={message}
            />
            <p>Messages</p>
          </div>
          <div className="chatNavChild">
            <img src={help} />
            <p>Help</p>
          </div>
          <div className="chatNavChild">
            <img src={news} />
            <p>News</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
