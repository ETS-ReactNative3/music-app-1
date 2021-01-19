import React, { memo } from 'react';
import { Button, Col, Form, FormControl, FormLabel, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { styles } from './index.styles';
import defaultImage from '../../images/album-3.jpg';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { CampaignStatus } from './constants';

const RequestPopup = ({ data, updateCampaignStatus, submitFeedbackRequest, submitSocialLinksRequest }) => {
    const [feedbackProvided, setFeedbackProvided] = React.useState(false);
    const [feedback, setFeedback] = React.useState('');
    const [songPlayed, setSongPlayed] = React.useState(false);


    const validationSchema = Yup.object().shape({

        facebook: (() => {
            let validation = Yup.string()
            if (true) {
                validation = validation.required('this field is required')
                validation = validation.url('Enter correct url')
            }
            return validation
        })(),
        twitter: (() => {
            let validation = Yup.string()
            if (true) {
                validation = validation.required('this field is required')
                validation = validation.url('Enter correct url')
            }
            return validation
        })(),
        instagram: (() => {
            let validation = Yup.string()
            if (true) {
                validation = validation.required('this field is required')
                validation = validation.url('Enter correct url')
            }
            return validation
        })(),
        blog: (() => {
            let validation = Yup.string()
            if (true) {
                validation = validation.required('this field is required')
                validation = validation.url('Enter correct url')
            }
            return validation
        })(),
        youtube: (() => {
            let validation = Yup.string()
            if (true) {
                validation = validation.required('this field is required')
                validation = validation.url('Enter correct url')
            }
            return validation
        })(),
    });

    const {
        register,
        handleSubmit,
        errors,
        reset,
        control,
        setValue,
        getValues,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div style={styles.container}>
            <div style={!(feedbackProvided || data.feedback !== null) ? styles.section : { ...styles.section, ...styles.blurStyle }}>
                <h4>Song/track:</h4>
                <fieldset disabled={(feedbackProvided || data.feedback !== null)}>
                    {data.campaigns.song && <div style={{ marginLeft: 10 }}>
                        <div style={styles.selectedSongParent}>
                            <Image
                                width={100}
                                height={100}
                                src={data.campaigns.song.artwork || ''}
                                onError={e => {
                                    e.target.onerror = null;
                                    e.target.src = defaultImage;
                                }}
                            />
                            <div style={styles.songInfo}>
                                <div>{data.campaigns.song.title}</div>
                                <div>{data.campaigns.song.description}</div>
                                <div>{moment(data.campaigns.song.releaseDate).format('DD MMMM YYYY')}</div>
                            </div>
                            {!(songPlayed || data.feedback !== null) && <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Button style={{ height: 'fit-content' }} variant="success" onClick={() => {
                                    setSongPlayed(true);
                                    updateCampaignStatus(data.campaignsId, CampaignStatus["IN-PROGRESS"])
                                }}>Click to play</Button>
                                <div>Play Song to provide feedback</div>
                            </div> || <div style={{ color: 'green' }}><FontAwesomeIcon
                                size="1x"
                                icon={faCheck}
                            />Played</div>}
                        </div>
                    </div>}
                </fieldset>
            </div>

            <div style={!songPlayed ? { ...styles.section, ...styles.blurStyle } : styles.section}>
                <h4>Feedback:</h4>
                <fieldset disabled={!songPlayed}>
                    {!(feedbackProvided || data.feedback !== null) && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <FormControl as="textarea" aria-label="With textarea" onChange={(value) => setFeedback(value.target.value)} />
                        <Button variant="success" style={{ marginTop: 10 }} onClick={() => {
                            if (feedback !== '') {
                                setFeedbackProvided(true);
                                submitFeedbackRequest(data.campaigns.id, data.influencerId, feedback);
                            } else {
                                alert('Enter Feedback.')
                            }
                        }}>Submit</Button>
                        <div>Provide feedback to share and complete</div>
                    </div> || <div style={{ color: 'green' }}><FontAwesomeIcon
                        size="1x"
                        icon={faCheck}
                    /> Feedback sent!!</div>}
                </fieldset>
            </div>

            <div style={(feedbackProvided || data.feedback !== null) ? styles.section : { ...styles.section, ...styles.blurStyle }}>
                <h4>Share :</h4>
                <fieldset disabled={!(feedbackProvided || data.feedback !== null)}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={styles.socialMediaItems}>Share on
                        <FontAwesomeIcon
                                size="1x"
                                icon={faFacebook}
                                style={styles.marginHorizontal}
                                onClick={() => { }}
                            />

                            <FontAwesomeIcon
                                size="1x"
                                icon={faInstagram}
                                style={styles.marginHorizontal}
                                onClick={() => { }}

                            />

                            <FontAwesomeIcon
                                size="1x"
                                style={styles.marginHorizontal}
                                icon={faYoutube}
                                onClick={() => { }}
                            />

                            <FontAwesomeIcon
                                size="1x"
                                style={styles.marginHorizontal}
                                icon={faBlog}
                                onClick={() => { }}
                            />

                            <FontAwesomeIcon
                                size="1x"
                                style={styles.marginHorizontal}
                                icon={faTwitter}
                                onClick={() => { }}
                            />
                        </div>
                        <div style={styles.shareLinkStyle}>
                            Provide Links:
                            <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <div style={styles.socialMediaItem}>
                                            <FormLabel>Facebook</FormLabel>
                                            <input
                                                ref={register}
                                            required

                                                name="facebook" class="input-url" id="endereco" type="text" placeholder="Enter Facebook url" required />
                                            <div
                                                className="invalid-feedback" style={{ display: 'block' }}>
                                                {errors.facebook && errors.facebook && errors.facebook.message}
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridTitle">

                                        <div style={styles.socialMediaItem}>
                                            <FormLabel>Instagram</FormLabel>
                                            <input 
                                                ref={register}
                                            required

                                                name="instagram" class="input-url" id="endereco" type="text" placeholder="Enter Instagram url" required />
                                            <div
                                                className="invalid-feedback" style={{ display: 'block' }}>
                                                {errors.instagram && errors.instagram && errors.instagram.message}
                                            </div>
                                        </div>
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <div style={styles.socialMediaItem}>
                                            <FormLabel>Twitter</FormLabel>
                                            <input
                                                ref={register}
                                            required

                                                name="twitter" class="input-url" id="endereco" type="text" placeholder="Enter Twitter url" required />
                                            <div className="invalid-feedback" style={{ display: 'block' }}>
                                                {errors.twitter && errors.twitter && errors.twitter.message}
                                            </div>
                                        </div>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridTitle">

                                        <div style={styles.socialMediaItem}>
                                            <FormLabel>Blog</FormLabel>
                                            <input 
                                                ref={register}
                                            required

                                                name="blog" class="input-url" id="endereco" type="text" placeholder="Enter Blog url" required />
                                            <div
                                                className="invalid-feedback" style={{ display: 'block' }}>
                                                {errors.blog && errors.blog && errors.blog.message}
                                            </div>
                                        </div>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row><Form.Group as={Col} controlId="formGridTitle">


                                    <div style={{ ...styles.socialMediaItem, ...{ width: '50%' } }}>
                                        <FormLabel>Youtube</FormLabel>
                                        <input 
                                            ref={register}
                                            required
                                            name="youtube" class="input-url" id="endereco" type="text" placeholder="Enter Youtube url" required />
                                        <div
                                            className="invalid-feedback" style={{ display: 'block' }}>
                                            {errors.youtube && errors.youtube && errors.youtube.message}
                                        </div>
                                    </div>
                                </Form.Group>
                                </Form.Row>
                            </form>
                        </div>

                    </div>
                    <Button variant="success" style={{ marginTop: 10 }} onClick={handleSubmit(onSubmit)}>Submit</Button>
                    <div>Please share and provide url</div>
                </fieldset>
            </div>
        </div >
    )
}


const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
    return {
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(RequestPopup);
