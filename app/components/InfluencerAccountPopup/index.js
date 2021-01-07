import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import InfluencerAccount from '../InfluencerAccount';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { combineFollowers, formatFollowers } from '../../Utils';
import defaultImage from '../../images/album-3.jpg';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from '../../containers/Tastemaker/reducer';
import { selectInfluencerAction } from '../../containers/Tastemaker/actions';

const InfluencerAccountPopup = ({
    openModal,
    handleClose,
    userSelected,
    selectInfluencer
}) => {

    let followers = combineFollowers(userSelected && userSelected.influencer || {})

    const _field = (icon, label, credits, callBack, followers, selected) => {
        return (

            <div style={{ display: 'flex', width: '50%', marginTop: 10, flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <FontAwesomeIcon
                                size="1x"
                                color="white"
                                icon={icon}
                                style={{ marginRight: 5 }}
                            />
                            <div style={{ fontSize: 18 }}>{label}</div>
                        </div>
                        <div style={{ color: 'grey' }}>{followers + ' followers'}</div>
                    </div>
                    {credits !== '' && <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                    }}>
                        <img
                            src={PlanSvgColor}
                            alt="PlanSvg"
                            width={20}
                            height={20}
                            style={{ marginLeft: 10, marginRight: 5 }}
                        />
                        <div style={{ fontSize: 14, color: 'white' }}>{' ' + credits + '   '}</div>
                        {/* <CheckBox color={colors.primaryColor} onPress={callBack} selected={selected} /> */}
                        <input type="checkbox" style={{ marginLeft: 10, marginRight: 10 }} defaultChecked={selected} onChange={callBack} />

                    </div>}

                </div>

            </div>
        )
    }
    const [innerInfluencer, setInnerInfluencer] = React.useState({ ...userSelected, influencer: { ...userSelected.influencer, facebook: null, twitter: null, instagram: null, blog: null, youtube: null } });
    const [facebook, selectFacebook] = React.useState(false);
    const [twitter, selectTwitter] = React.useState(false);
    const [instagram, selectInstagram] = React.useState(false);
    const [blog, selectBlog] = React.useState(false);
    const [youtube, selectYoutube] = React.useState(false);
    const [campaignMedium, setCampaignMedium] = React.useState(0);
    const [price, setTotalPrice] = React.useState(0);

    useInjectReducer({key: 'influencer', reducer});
    return (
        <Modal
            show={openModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >
            <Modal.Header closeButton>
                <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
                    <div>Influencer Account</div>
                </div>
            </Modal.Header>
            <div style={{ marginLeft: 10 }}>
                <div
                    style={{
                        display: 'flex',
                        marginTop: 10,
                        justifyContent: 'start',
                    }}
                >
                    <Image
                        width={50}
                        height={50}
                        onError={e => {
                            e.target.onerror = null;
                            e.target.src = defaultImage;
                        }}
                        src={userSelected.avatar}
                        alt=""
                        roundedCircle
                    />
                    <div style={{ marginLeft: 20, textAlign: 'left' }}>
                        <div>{userSelected.name}</div>
                        {
                            <div style={{ color: 'grey' }}>
                                {`${followers > 1000
                                    ? `${formatFollowers(followers / 1000)}k`
                                    : followers
                                    } followers`}
                            </div>
                        }
                    </div>
                </div>
                <div >Please select Campaign medium</div>
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                    {userSelected && userSelected.influencer && userSelected.influencer.facebook &&
                        _field(faFacebook, 'Facebook', userSelected.influencer.facebook.price, () => {
                            selectFacebook(!facebook);
                            if (!facebook) {
                                setCampaignMedium(campaignMedium + 1)
                                if (userSelected.influencer.facebook.price) setTotalPrice(price + userSelected.influencer.facebook.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, facebook: userSelected.influencer.facebook } })
                            } else {
                                setCampaignMedium(campaignMedium - 1)
                                if (userSelected.influencer.facebook.price) setTotalPrice(price - userSelected.influencer.facebook.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, facebook: null } })

                            }
                        }, userSelected.influencer.facebook.followers, facebook)}
                    {userSelected && userSelected.influencer && userSelected.influencer.instagram &&
                        _field(faInstagram, 'Instagram', userSelected.influencer.instagram.price, () => {
                            selectInstagram(!instagram);
                            if (!instagram) {
                                setCampaignMedium(campaignMedium + 1)
                                if (userSelected.influencer.instagram.price) setTotalPrice(price + userSelected.influencer.instagram.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, instagram: userSelected.influencer.instagram } })

                            } else {
                                setCampaignMedium(campaignMedium - 1)
                                if (userSelected.influencer.instagram.price) setTotalPrice(price - userSelected.influencer.instagram.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, instagram: null } })

                            }
                        }, userSelected.influencer.instagram.followers, instagram)}
                    {userSelected && userSelected.influencer && userSelected.influencer.twitter &&
                        _field(faTwitter, 'Twitter', userSelected.influencer.twitter.price, () => {
                            selectTwitter(!twitter);
                            if (!twitter) {
                                setCampaignMedium(campaignMedium + 1)
                                if (userSelected.influencer.twitter.price) setTotalPrice(price + userSelected.influencer.twitter.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, twitter: userSelected.influencer.twitter } })

                            } else {
                                setCampaignMedium(campaignMedium - 1)
                                if (userSelected.influencer.twitter.price) setTotalPrice(price - userSelected.influencer.twitter.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, twitter: null } })

                            }
                        }, userSelected.influencer.twitter.followers, twitter)}

                    {userSelected && userSelected.influencer && userSelected.influencer.youtube &&
                        _field(faYoutube, 'Youtube', userSelected.influencer.youtube.price, () => {
                            selectYoutube(!youtube);
                            if (!youtube) {
                                setCampaignMedium(campaignMedium + 1)
                                if (userSelected.influencer.youtube.price) setTotalPrice(price + userSelected.influencer.youtube.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, youtube: userSelected.influencer.youtube } })

                            } else {
                                setCampaignMedium(campaignMedium - 1)
                                if (userSelected.influencer.youtube.price) setTotalPrice(price - userSelected.influencer.youtube.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, youtube: null } })

                            }
                        }, userSelected.influencer.youtube.followers, youtube)}

                    {userSelected && userSelected.influencer && userSelected.influencer.blog &&
                        _field(faBlog, 'Blog', userSelected.influencer.blog.price, () => {

                            selectBlog(!blog);
                            if (!blog) {
                                setCampaignMedium(campaignMedium + 1)
                                if (userSelected.influencer.blog.price) setTotalPrice(price + userSelected.influencer.blog.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, blog: userSelected.influencer.blog } })

                            } else {
                                setCampaignMedium(campaignMedium - 1)
                                if (userSelected.influencer.blog.price) setTotalPrice(price - userSelected.influencer.blog.price)
                                setInnerInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, blog: null } })

                            }
                        }, userSelected.influencer.blog.followers, blog)}

                </div>
                <InfluencerAccount navigation={{}} userId={userSelected.id} />
            </div>
            <Modal.Footer style={{ justifyContent: 'flex-start', flex: 1 }}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>{campaignMedium + ' campaign mediums'}</div>
                        <div><img
                            src={PlanSvgColor}
                            alt="PlanSvg"
                            width={20}
                            height={20}
                            style={{ marginRight: 5 }}
                        />{price + ' price'}</div>
                    </div>

                    <Button disabled={campaignMedium === 0} style={{
                        backgroundImage: 'linear-gradient(to right, #0053A5, #091924)',
                    }} onClick={() => {
                        handleClose();
                        selectInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, price: price } })
                    }}>Add</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}


InfluencerAccountPopup.propTypes = {
    openModal: PropTypes.bool,
    handleClose: PropTypes.func,
    userSelected: PropTypes.any,
    selectInfluencer: PropTypes.func
};


function mapDispatchToProps(dispatch) {
    return {
        selectInfluencer: (data) => dispatch(selectInfluencerAction(data)),
    };
}

const withConnect = connect(
    null,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(InfluencerAccountPopup);
