import React from 'react';

function ThemeWrapper({ children }) {
  return (
    <div className="wrapper">
        {children}
    </div>
  );
}

export default ThemeWrapper;
