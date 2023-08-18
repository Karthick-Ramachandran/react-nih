import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import searchIcon from "../assets/Search.svg";
import logo from "../assets/Send.svg";

export default function ChatMobile(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [homestate, setHomestate] = useState(true);
  const [chat, setChatReply] = useState([
    `Hi there 👋 What brings you to NIH Service Desk?`,
  ]);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(0);
  const [showBackButton, setShowBackButton] = useState(false);

  const chatContainerRef = useRef(null);

  const getInputValue = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const setHomeState = (newState) => {
    if (!newState) {
      setShowBackButton(true);
    }
    setHomestate(newState);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  });

  const sendMessage = async () => {
    if (title === "") {
      alert("Please enter a message");
      return;
    }

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
    <div className="container ">
      <div className="row mt-3">
        <div className="col-12">
          <div className="card" style={{
            backgroundColor: '#2f5582 !important',
            color: '#fff !important',
          }}>
            <div className="card-body" style={{
            backgroundColor: '#2f5582 !important',
            color: '#fff !important',
          }}>
              <div className="text-center bg-coll">
                <h2 className="mb-1">Hello there</h2>
                <h3 className="mb-3">How can we help?</h3>
              </div>
              
              {homestate ? (
                <div
                  className="card d-flex flex-row mb-3"
                  onClick={() => {
                    setHomeState(false);
                  }}
                >
                  <div className="card-body">
                    <h6 className="card-title font-weight-normal">
                      Send us a Message
                    </h6>
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <p className="card-text font-weight-normal opacity-7">
                          Our AI bots can help you find your answers instantly
                        </p>
                      </div>
                      <div>
                        <img
                          src={logo}
                          alt="logo"
                          onClick={() => {
                            setHomeState(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {homestate ? (
                <div className="mb-3 ">
                  <div className="card">
                    <div className="card-body">
                      <div className="input-group rounded-input mb-3">
                        <input
                          type="text"
                          className="form-control rounded-end"
                          placeholder="Search For Help"
                          onChange={getInputValue}
                          value={title}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text rounded-start">
                            <img
                              src={searchIcon}
                              alt="Search For Help"
                              className="search-icon sizes"
                            />
                          </span>
                        </div>
                      </div>
                      <ul className="list-group card-color">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          How to reset my password?
                          <span className="badge badge-primary badge-pill">
                            &rarr;
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          How to reset my email?
                          <span className="badge badge-primary badge-pill">
                            &rarr;
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          I forgot my password
                          <span className="badge badge-primary badge-pill">
                            &rarr;
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          I need help with my account
                          <span className="badge badge-primary badge-pill">
                            &rarr;
                          </span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          I need help to login
                          <span className="badge badge-primary badge-pill">
                            &rarr;
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {/* ... rest of your component code ... */}
                  {homestate ? null : (
                    <div className="mt-5">
                      {chat.map((element, index) => (
                        <div key={index}>
                          {index === 0 && (
                            <div
                              style={{ marginTop: "10px", marginLeft: "10px" }}
                            ></div>
                          )}
                          <div className="chatMessageConvoInitial">
                            <div className="chatInitialMessage">
                              <p className="chatBotName"> Ralph from NIH</p>
                              <p
                                dangerouslySetInnerHTML={{ __html: element }}
                              ></p>
                            </div>
                          </div>

                          <div className="chatMessageConvo2">
                            {posts[index] != null ? (
                              <p className="chatUserMessage">{posts[index]}</p>
                            ) : null}
                          </div>

                          {loading && index === chat.length - 1 ? (
                            <div className="loadingIconContainer">
                              <div className="typingIndicator">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                  {homestate ? null : (
                    <div className="chatInputDiv">
                      <div className="input-group">
                        <input
                          type="text"
                          className="input form-control"
                          placeholder="Send us a message"
                          onChange={getInputValue}
                          value={title}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              sendMessage();
                            }
                          }}
                        />
                        
                      </div>
                    </div>
                  )}

                  {/* ... rest of your component code ... */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
