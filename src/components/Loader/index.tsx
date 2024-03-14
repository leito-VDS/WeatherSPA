import "./Loader.scss";

function Loader() {
    return (
        <div className="loader_wrapper">
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
        </div>
    );
}

export default Loader;
