import React from "react";
import { Icon } from "../../constants";
const Compass = ({ width, height }: Icon) => {
    return (
        <svg
            fill="#141414"
            width={width}
            height={height}
            viewBox="0 0 554.883 554.883"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <g>
                    <path
                        d="M277.441,554.883c153.227,0,277.442-124.215,277.442-277.442C554.883,124.214,430.668,0,277.441,0
			C124.214,0,0,124.214,0,277.441C0,430.668,124.214,554.883,277.441,554.883z M222.199,222.199l197.022-86.54L332.684,332.68
			l-197.021,86.541L222.199,222.199z"
                    />
                    <circle cx="277.441" cy="274.274" r="31.827" />
                </g>
            </g>
        </svg>
    );
};

export default Compass;
