/**
 *
 * PtmTokenForm
 *
 */

import React, {memo, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import web3 from "../../utils/web3";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PtmTokenForm({methodSubmit}) {
  const [account, setAccount] = useState('');
  const [showMetaMask, setShowMetaMask] = useState(false);
  const {register, handleSubmit, errors} = useForm();
  const methodFormSubmit = data => {
    methodSubmit(data)
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.enable()
      web3.eth.getAccounts().then(addr => {
        setAccount(addr[0]);
      });
    } else {
      setShowMetaMask(true)
    }
  }, []);

  return <>
    {showMetaMask && <div className="row">
      <div className="col">
        <p>You need an Ethereum wallet to withdraw in bliiink token</p>
        <img src="https://opensea.io/static/images/logos/metamask-alternative.png"/>
        <a href="https://metamask.io/download.html" target="_blank">
          <button className="btn btn-primary">Get MetaMask</button>
        </a>
      </div>
    </div>}
    <form className="mt-3" onSubmit={handleSubmit(methodFormSubmit)}>
      <div className="form-group">
        <div className="form-group">
          <p>Recieving Address: {account}</p>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Add method</button>
    </form>
  </>;
}

PtmTokenForm.propTypes = {};

export default memo(PtmTokenForm);
