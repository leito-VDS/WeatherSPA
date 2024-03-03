import React from 'react';
import { IProps } from '../../constants';

const D01: React.FC<IProps> = ({style}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="200px"
      height="200px"
      viewBox="0 0 64 64"
      style={{ transform: 'scale(2)', ...(style ? style : {}) }}
    >
      <defs>
        <filter id="blur" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.05" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style type="text/css">
          {`
          @keyframes am-weather-sun {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .am-weather-sun {
            animation-name: am-weather-sun;
            animation-duration: 9s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          @keyframes am-weather-sun-shiny {
            0% {
              stroke-dasharray: 3px 10px;
              stroke-dashoffset: 0px;
            }
            50% {
              stroke-dasharray: 0.1px 10px;
              stroke-dashoffset: -1px;
            }
            100% {
              stroke-dasharray: 3px 10px;
              stroke-dashoffset: 0px;
            }
          }

          .am-weather-sun-shiny line {
            animation-name: am-weather-sun-shiny;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
        </style>
      </defs>
      <g filter="url(#blur)" id="day">
        <g transform="translate(32,32)">
          <g className="am-weather-sun am-weather-sun-shiny">
            <g>
              <line
                fill="none"
                stroke="orange"
                strokeLinecap="round"
                strokeWidth="2"
                transform="translate(0,9)"
                x1="0"
                x2="0"
                y1="0"
                y2="3"
              />
            </g>
            {[45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
              <g key={index} transform={`rotate(${rotation})`}>
                <line
                  fill="none"
                  stroke="orange"
                  strokeLinecap="round"
                  strokeWidth="2"
                  transform="translate(0,9)"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="3"
                />
              </g>
            ))}
          </g>
          <circle cx="0" cy="0" fill="orange" r="5" stroke="orange" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
};

export default D01;
