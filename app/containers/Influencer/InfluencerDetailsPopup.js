import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isArray } from 'lodash';
import React from 'react';
import { Badge, Button, Col, Modal, Row } from 'react-bootstrap';
import { renderSocialMediaIcons } from '../../utils';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import styles from '../MyAccount/index.styles';


const renderGenres = (genersToRender, genres) =>
  genersToRender &&
  isArray(genersToRender) &&
  (genersToRender || []).map(internalGener => (
    <Badge key={internalGener.id} variant="success" className="p-2 mr-3">
      {(genres.find(gener => gener.id === internalGener.genreId) || {}).title}
    </Badge>
  ));

export const InfluencerDetailsPopup = ({ handleDetailsClose, openDetails, influencer, genres }) => {
    return (
        <Modal
            show={openDetails}
            onHide={handleDetailsClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Influencer Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {influencer && (
                            <div className="">
                                <div className="card-body profile-user-box">
                                    <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">Name</h3>
                                    <div className="mb-3">
                                        {influencer.businessName}
                                    </div>
                                    <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">Description</h3>
                                    <div className="mb-3">
                                        {influencer.description}
                                    </div>

                                    <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                                        Social Channels
            </h3>
                                    <div className="mb-3">
                                        <div style={styles.linkContainer}>
                                            {influencer && influencer.influencerServices &&
                                                influencer.influencerServices.map(service => {

                                                    return (
                                                        <a key={service.id} href={service.link} target="_blank" className="pr-2">
                                                            {renderSocialMediaIcons(service.socialChannels.title, '1x', { marginLeft: 5 }, PLAY_ICON_BG_COLOR)}
                                                            <span className="pl-2">{service.followers} followers</span>
                                                        </a>
                                                    );

                                                }
                                                )}
                                        </div>
                                    </div>
                                    <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                                        Services
            </h3>
                                    <div className="mb-3">
                                        {influencer.helpArtistDescription}
                                    </div>
                                    <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                                        Genres
            </h3>
                                    <div className="mb-3">
                                        {renderGenres(influencer.influencerGenres, genres)}
                                    </div>
                                </div>
                            </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDetailsClose}>
                    Close
          </Button>
             
            </Modal.Footer>
        </Modal>
    )
}