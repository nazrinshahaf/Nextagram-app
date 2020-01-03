import React from "react";
import "./LoadingCircle.css";

const LoadingCircle = ({ isLoading, loading }) => {
  if (isLoading === true) {
    return (
      <div className={`loadingio-spinner-eclipse-nw2rd1k5dk`}>
        <div className="ldio-207l6fdacup">
          <div></div>
        </div>
      </div>
    );
  }
  if (loading === true) {
    return (
      <div className="loadingio-spinner-eclipse-nw2rd1k5dk">
        <div className="ldio-207l6fdacupsmall">
          <div></div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default LoadingCircle;
