import React from 'react';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ThemeWrapper({children}) {
  return (
    <div className="wrapper">
      {children}
      <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default ThemeWrapper;
