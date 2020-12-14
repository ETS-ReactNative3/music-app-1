import React from "react";

function ThemeWrapper({children}) {
  return (
    <div className="wrapper">
      <main className="content-wrapper" role="main">
        {children}
      </main>
    </div>
  );
}

export default ThemeWrapper;
