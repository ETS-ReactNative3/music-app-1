import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function ButtonLoader() {
  return (
    <Button variant="primary" block disabled className="mt-2">
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  );
}

export default ButtonLoader;
