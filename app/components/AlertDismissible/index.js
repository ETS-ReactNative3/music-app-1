import React from 'react';
import {Alert} from 'react-bootstrap';
import './index.scss';

function AlertDismissible({message}) {
  const [show, setShow] = React.useState(true);

  if (show) {
    return (
      <Alert variant="warning" onClose={() => setShow(false)} dismissible>
        <p className='message'>
          {message}
        </p>
      </Alert>
    );
  }
  return <></>;
}

export default AlertDismissible;
