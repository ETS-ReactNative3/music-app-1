import React from 'react';

const PaperCard = ({children, title}) => {
  return (
    <div className="container-fluid p-5">
      <div className="page-header">
        <div className="row">
          <div className="col">
            <h1 className="page-header-title">
              {title}
            </h1>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default PaperCard;
