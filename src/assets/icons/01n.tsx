import React from "react";
import { IProps } from '../../constants';

const N01: React.FC<IProps> = ({style}) => {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="200px"
            height="200px"
            viewBox="0 0 64 64"
            // style={style}
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
            /* ... (unchanged cloud and easing styles) ... */

            /* MOON */
            @keyframes am-weather-moon {
              0% {
                transform: rotate(0deg);
              }
              50% {
                transform: rotate(15deg);
              }
              100% {
                transform: rotate(0deg);
              }
            }

            .am-weather-moon {
              animation-name: am-weather-moon;
              animation-duration: 6s;
              animation-timing-function: linear;
              animation-iteration-count: infinite;
              transform-origin: 12.5px 15.15px 0; /* TODO FF CENTER ISSUE */
            }

            @keyframes am-weather-moon-star-1 {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .am-weather-moon-star-1 {
              animation-name: am-weather-moon-star-1;
              animation-delay: 3s;
              animation-duration: 5s;
              animation-timing-function: linear;
              animation-iteration-count: 1;
            }

            @keyframes am-weather-moon-star-2 {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .am-weather-moon-star-2 {
              animation-name: am-weather-moon-star-2;
              animation-delay: 5s;
              animation-duration: 4s;
              animation-timing-function: linear;
              animation-iteration-count: 1;
            }
          `}
                </style>
            </defs>
            <g filter="url(#blur)" id="night">
                <g transform="translate(20,20)">
                    <g className="am-weather-moon-star-1">
                        <polygon
                            fill="orange"
                            points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7"
                            stroke="none"
                            strokeMiterlimit="10"
                        />
                    </g>
                    <g className="am-weather-moon-star-2">
                        <polygon
                            fill="orange"
                            points="3.3,1.5 4,2.7 5.2,3.3 4,4 3.3,5.2 2.7,4 1.5,3.3 2.7,2.7"
                            stroke="none"
                            strokeMiterlimit="10"
                            transform="translate(20,10)"
                        />
                    </g>
                    <g className="am-weather-moon">
                        <path
                            d="M14.5,13.2c0-3.7,2-6.9,5-8.7   c-1.5-0.9-3.2-1.3-5-1.3c-5.5,0-10,4.5-10,10s4.5,10,10,10c1.8,0,3.5-0.5,5-1.3C16.5,20.2,14.5,16.9,14.5,13.2z"
                            fill="orange"
                            stroke="orange"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </g>
                </g>
            </g>
        </svg>
    );
};

export default N01;
