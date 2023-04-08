import "./index.css";

function Loader() {
  return (
    <div className="loader">
      <div className="loader__body">
        <div className="loader__shapeEye01"></div>
        <div className="loader__shapeEye02"></div>
      </div>
      <p>loading...</p>
    </div>
  );
}

export default Loader;
