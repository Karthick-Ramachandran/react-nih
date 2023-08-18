import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import "../styles/chatWidget.css";
import ChatHome from "./ChatHome";
import ChatMobile from "./ChatMobile";
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // make isMobile to true if it's mobile screen
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  return (
    <div>
      { isMobile ? <ChatMobile isOpen={isOpen} /> : (
    <div className={`chatWidget ${isOpen ? "open" : ""}`}>
      <div className="chatToggle" onClick={handleToggle}>
        <span>
          {isOpen ? (
            <svg
              width="125"
              height="124"
              viewBox="0 0 125 124"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_1_1204)">
                <rect
                  x="32.8838"
                  y="30"
                  width="60"
                  height="60"
                  rx="30"
                  fill="#2E5481"
                />
                <g clip-path="url(#clip0_1_1204)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M55 58.0269L56.768 56.2589L62.884 62.3749L69 56.2589L70.768 58.0269L62.884 65.9109L55 58.0269Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_dd_1_1204"
                  x="0.883789"
                  y="0"
                  width="124"
                  height="124"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="3" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1_1204"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="2" />
                  <feGaussianBlur stdDeviation="16" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_1_1204"
                    result="effect2_dropShadow_1_1204"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_1_1204"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_1_1204">
                  <rect
                    width="16"
                    height="10"
                    fill="white"
                    transform="translate(54.8838 56)"
                  />
                </clipPath>
              </defs>
            </svg>
          ) : (
            <svg
              style={{
                backgroundColor: "#2E5481",
                maskType: "alpha",
                padding: "10px",
                borderRadius: "50%",
                height: "60px",
                width: "60px",
              }}
              viewBox="0 0 47 47"
              fill="#2E5481"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Iconsax/Linear/message">
                <path
                  id="Vector"
                  d="M16.6459 37.2083H15.6667C7.83341 37.2083 3.91675 35.25 3.91675 25.4583V15.6667C3.91675 7.83332 7.83341 3.91666 15.6667 3.91666H31.3334C39.1667 3.91666 43.0834 7.83332 43.0834 15.6667V25.4583C43.0834 33.2917 39.1667 37.2083 31.3334 37.2083H30.3542C29.7472 37.2083 29.1597 37.5021 28.7876 37.9917L25.8501 41.9083C24.5576 43.6317 22.4426 43.6317 21.1501 41.9083L18.2126 37.9917C17.8992 37.5608 17.1747 37.2083 16.6459 37.2083Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  id="Vector_2"
                  d="M31.3256 21.5417H31.3452M23.4903 21.5417H23.5099M15.657 21.5417H15.6726"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          )}
        </span>
      </div>
      <div className="chatContainer">
        <div className="chatContent">{ isOpen && <Chat isOpen={isOpen} />
        }</div>
      </div>
    </div>
      )}
    </div>
  );
};

export default ChatWidget;
