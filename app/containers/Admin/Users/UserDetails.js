import React, {memo, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import './index.scss';
import {getUserDetails, postCreateWallet} from '../action';
import {makeSelectInfluencerData} from "../selectors";
import {useConnection} from "@solana/wallet-adapter-react";
import {PublicKey} from "@solana/web3.js";

const UserDetails = ({openModal, handleClose, user, createWallet, fetchUserDetails, influencerData}) => {
  const {connection} = useConnection();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (user.influencerId) {
      fetchUserDetails(user.influencerId)
    }
  }, [user]);

  useEffect(async () => {
    if (user.privateWalletPublicAddress) {
      const walletAddress = new PublicKey(user.privateWalletPublicAddress)
      const userBalance = await connection.getBalance(walletAddress)
      setBalance((userBalance) / 1000000000)
    }
  }, [user])

  return (
    <Modal
      show={openModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
          <div>User Details</div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="details">
          <ul className="list-group">
            <li className="list-group-item">Name: {user.name}</li>
            <li className="list-group-item">Email: {user.email}</li>
            <li className="list-group-item">Wallet
              Address: {user.privateWalletPublicAddress ? user.privateWalletPublicAddress :
                <button className="btn btn-warning" onClick={() => createWallet(user.email)}>Create
                  Wallet</button>}
            </li>
            {user.privateWalletPublicAddress &&
            <li className="list-group-item">
              Balance: {balance}
            </li>
            }
          </ul>
          {influencerData &&
          <>
            <ul className="list-group">
              <li className="list-group-item">Business Name: {influencerData.businessName}</li>
              <li className="list-group-item">Description: {influencerData.description}</li>
              <li className="list-group-item">Help Artist Description: {influencerData.helpArtistDescription}</li>
              <li className="list-group-item">Business Name: {influencerData.businessName}</li>
            </ul>
            {influencerData.influencerServices.map(item =>
              <ul className="list-group" key={item.id}>
                <li className="list-group-item">{item.socialChannels.title} - <a href={item.link}
                                                                                 target="_blank">{item.link}</a> -
                  Followers: {item.followers} - Price: {item.price}</li>
              </ul>
            )}
          </>
          }
        </div>
      </Modal.Body>
    </Modal>
  )
}


UserDetails.propTypes = {
  fetchUserDetails: PropTypes.func,
  createWallet: PropTypes.func,
  openModal: PropTypes.bool,
  handleClose: PropTypes.func,
  user: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  influencerData: makeSelectInfluencerData(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUserDetails: (id) => dispatch(getUserDetails(id)),
    createWallet: (email) => dispatch(postCreateWallet(email))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserDetails);
