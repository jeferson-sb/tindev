import React from "react";

export default function Dislike() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
    >
      <title>Close/Dislike</title>
      <defs>
        <linearGradient
          id="linearGradient-1"
          x1="100%"
          x2="0%"
          y1=".001%"
          y2="99.999%"
        >
          <stop offset="0%" stopColor="#FD2C7A"></stop>
          <stop offset="100%" stopColor="#FF7255"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g fill="url(#linearGradient-1)" transform="translate(-633 -600)">
          <g transform="translate(570 162)">
            <g transform="translate(0 423)">
              <g>
                <path d="M72.809 20.894l-5.082-5.082a2.773 2.773 0 00-3.918-.003 2.772 2.772 0 00.003 3.917l5.083 5.083-5.083 5.082a2.772 2.772 0 00-.003 3.918 2.773 2.773 0 003.918-.004l5.082-5.082 5.082 5.082a2.773 2.773 0 003.918.004 2.772 2.772 0 00-.004-3.918l-5.082-5.082 5.082-5.083a2.772 2.772 0 00.004-3.917 2.773 2.773 0 00-3.918.003l-5.082 5.082z"></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
