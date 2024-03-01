interface PointWH {
    width: string;
    height: string;
}

const Point = ({ width, height }: PointWH) => {
    return (
        <svg
            fill="#141414"
            height={height}
            width={width}
            version="1.1"
            id="Layer_1"
            // xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 434.174 434.174"
            xmlSpace="preserve"
        >
            <g>
                <path d="M217.087,119.397c-24.813,0-45,20.187-45,45s20.187,45,45,45s45-20.187,45-45S241.901,119.397,217.087,119.397z" />
                <path
                    d="M217.087,0c-91.874,0-166.62,74.745-166.62,166.619c0,38.93,13.421,74.781,35.878,103.177l130.742,164.378l130.742-164.378
		c22.457-28.396,35.878-64.247,35.878-103.177C383.707,74.745,308.961,0,217.087,0z M217.087,239.397c-41.355,0-75-33.645-75-75
		s33.645-75,75-75s75,33.645,75,75S258.443,239.397,217.087,239.397z"
                />
            </g>
        </svg>
    );
};

export default Point;