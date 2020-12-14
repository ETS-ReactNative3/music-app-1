import React from 'react';

function Outer({ children }) {
  return (
    <div>
      <main className="outer-container">{children}</main>
    </div>
  );
}

export default Outer;
