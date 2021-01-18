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

const RequestPopup = ({ data }) => {
    const [feedbackProvided, setFeedbackProvided] = React.useState(false);
    const [songPlayed, setSongPlayed] = React.useState(false);


    const validationSchema = Yup.object().shape({
        // description: Yup.string()
        //   .min(6, 'Must be 6 characters or more')
        //   .required('Required'),
        // facebook: Yup.object({
        //   link: Yup.string()
        //     .url('Invalid Url address')
        //     .nullable(),
        //   price: Yup.number('Invalid Amount')
        //     .nullable()
        //     .transform(value => (isNaN(value) ? undefined : value)),
        //   followers: Yup.number('Invalid Count')
        //     .nullable()
        //     .transform(value => (isNaN(value) ? undefined : value)),
        // }).nullable(),
        // twitter: Yup.object({
        //   link: Yup.string().url('Invalid Url address'),
        //   price: Yup.number('Invalid Amount').transform(value =>
        //     isNaN(value) ? undefined : value,
        //   ),
        //   followers: Yup.number('Invalid Count').transform(value =>
        //     isNaN(value) ? undefined : value,
        //   ),
        // }).nullable(),
        // instagram: Yup.object({
        //   link: Yup.string().url('Invalid Url address'),
        //   price: Yup.number('Invalid Amount').transform(value =>
        //     isNaN(value) ? undefined : value,
        //   ),
        //   followers: Yup.number('Invalid Count').transform(value =>
        //     isNaN(value) ? undefined : value,
        //   ),
        // }).nullable(),
        // blog: Yup.object({
        //   link: Yup.string().url('Invalid Url address'),
        //   price: Yup.number('Invalid Amount').transform(value =>
        //     isNaN(value) ? undefined : value,
        //   ),
        //   followers: Yup.number('Invalid Count').transform(value =>
        //     isNaN(value) ? undefined : value,
        //   ),
        // }).nullable(),
        // youtube: Yup.object({
        //   link: Yup.string().url('Invalid Url address'),
        //   price: Yup.number('Invalid Amount').transform(value =>
        //     isNaN(value) ? undefined : value,
        //   ),
        //   followers: Yup.number('Invalid Count').transform(value =>
        //     isNaN(value) ? undefined : value,
        //   ),
        // }).nullable(),

        // genres: Yup.array()
        //   .min(1)
        //   .required('Required'),
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

    };

    return (
        <div style={styles.container}>
            <div style={styles.section}>
                <h4>Song/track:</h4>
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
                        {!songPlayed && <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Button style={{ height: 'fit-content' }} variant="success" onClick={() => setSongPlayed(true)}>Click to play</Button>
                            <div>Play Song to provide feedback</div>
                        </div> || <div style={{ color: 'green' }}><FontAwesomeIcon
                            size="1x"
                            icon={faCheck}
                        />Played</div>}
                    </div>
                </div>}
            </div>

            <div style={!songPlayed ? { ...styles.section, ...styles.blurStyle } : styles.section}>
                <h4>Feedback:</h4>
                <fieldset disabled={!songPlayed}>
                    {!(feedbackProvided || data.feedback !== null) && <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <FormControl as="textarea" aria-label="With textarea" />
                        <Button variant="success" style={{ marginTop: 10 }} onClick={() => setFeedbackProvided(true)}>Submit</Button>
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
                                            <input class="input-url" id="endereco" type="text" placeholder="Enter Facebook url" required />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridTitle">

                                        <div style={styles.socialMediaItem}>
                                            <FormLabel>Instagram</FormLabel>
                                            <input class="input-url" id="endereco" type="text" placeholder="Enter Instagram url" required />
                                        </div>
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <div style={styles.socialMediaItem}>
                                            <FormLabel>Twitter</FormLabel>
                                            <input class="input-url" id="endereco" type="text" placeholder="Enter Twitter url" required />
                                        </div>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridTitle">

                                        <div style={styles.socialMediaItem}>
                                            <FormLabel>Blog</FormLabel>
                                            <input class="input-url" id="endereco" type="text" placeholder="Enter Blog url" required />
                                        </div>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row><Form.Group as={Col} controlId="formGridTitle">


                                    <div style={{...styles.socialMediaItem, ...{width: '50%'}}}>
                                        <FormLabel>Youtube</FormLabel>
                                        <input class="input-url" id="endereco" type="text" placeholder="Enter Youtube url" required />
                                    </div>
                                </Form.Group>
                                </Form.Row>
                            </form>
                        </div>

                    </div>
                    <Button variant="success" style={{ marginTop: 10 }}>Submit</Button>
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
