/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import './index.scss';
import {Link} from "react-router-dom";

export default function UnAuthorized() {
  return (
    <>
      <article>
        <h1>
          <span>You are not authorized to view this page</span>
        </h1>
      </article>
    </>
  );
}
