import React from "react";
import { Circles } from "react-loader-spinner";
// import "./loder.css";
const Loader = ({ type, height, color, hidden }) => {
  return (
    <div className="Loaderscontener">
      <div className="loder" style={{display:"flex", justifyContent:"center"}}>
        <Circles
          width="50"
          height="50"
          radius="20"
          color="red"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      </div>
      <div style={{display:"flex", justifyContent:"center"}}>Loading...</div>
    </div>
  );
};

export default Loader;