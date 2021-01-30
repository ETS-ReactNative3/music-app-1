import { faCheck, faDownload, faEdit, faExchangeAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Button, Card, Col, Dropdown, DropdownButton, Form, FormCheck, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PaperCard from '../../components/PaperCard';
import { makeSelectUserWallet } from '../App/selectors';
import styles from './index.styles';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';

const TransferRequest = ({ userCredit }) => {
    const [withdrawalAccount, setWithDrawalAccount] = React.useState(1);


    const options = [
        { value: 1, label: 'Bank Transfer' },
        { value: 2, label: 'Paypal Transfer' },
    ];
    const [withdrawalTransfer, setWithDrawalTransfer] = React.useState(options[0]);

    return (
        <>

            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <FormGroup as={Col} style={{ width: '70%', margin: 10 }}>


                    <div className="row">
                        <div className="col">
                            <div style={styles.headerTitle}>Transfer</div>
                            <div style={styles.subHeaderTitle}>Transfer your credits to another Bliiink account</div>
                        </div>
                    </div>
                    <Card style={{ marginTop: 30, color: 'black', padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Card.Title>1. Recipient</Card.Title>
                            <FontAwesomeIcon icon={faCheck} color={'#28a745'} />
                        </div>
                        <FormGroup>
                            {[1, 2, 3, 4].map(value => {
                                if (value === 4) {
                                    return (<>
                                        <div style={styles.addWithdrawalOptionContainer} onClick={() => setWithDrawalAccount(value)}>
                                            <label class="form-check-label">
                                                <input type="radio" checked={withdrawalAccount === value} class="form-check-input" name="optradio" />Add Withdrawal Method
                                </label>
                                        </div>
                                        {withdrawalAccount === 4 && <div style={{ margin: 10, marginTop: 30 }}>
                                            <FormGroup style={{ marginTop: 10 }}>
                                                <label htmlFor="emailId">Email address of another bliiink account</label>
                                                <input
                                                    name="emailId"
                                                    placeholder="Enter Email-id"
                                                    className={`form-control `}
                                                // ref={register}
                                                />
                                            </FormGroup>
                                            <Button variant="success">Add recipient</Button>
                                        </div>}
                                    </>)
                                }
                                return (
                                    <div style={styles.withdrawalOptionContainer} onClick={() => setWithDrawalAccount(value)}>
                                        <label class="form-check-label">
                                            <input type="radio" checked={withdrawalAccount === value} class="form-check-input" name="optradio" />Account: ms.aaabb@gm.com
                            </label>
                                        <Button variant="link">Delete</Button>
                                    </div>
                                )
                            })}
                        </FormGroup>

                    </Card>
                    <Card style={{ marginTop: 30, color: 'black', padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Card.Title>2. Amount</Card.Title>
                            <FontAwesomeIcon icon={faCheck} color={'#28a745'} />
                        </div>
                        <Card.Body style={{ color: 'black', padding: 10 }}>
                            <label style={{ color: 'grey', fontSize: 14 }}>Enter amount you want to withdrawal</label>
                            <div className="input-group">
                                <input className="form-control py-2 border" type="number" placeholder="Enter amount" id="examddple-search-input" />
                            </div>
                            <label style={{ color: 'grey', fontSize: 12, fontStyle: 'italic' }}>The withdrawal is not immediate. You'll recieve an email once the Bliiink team validates your request.</label>

                            <div></div>

                            <Button variant="success">Confirm request</Button>
                        </Card.Body>
                    </Card>
                </FormGroup>
                <FormGroup as={Col} style={{ width: '30%' }}>
                    <Card style={styles.summaryCardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Card.Title>Summary</Card.Title>
                        </div>
                        <Card.Body style={{ color: 'black', padding: 0, }}>
                            <div style={styles.creditParentStyle}>
                                <div style={styles.labelCeditText}>
                                    Availabe Credits
                                    </div>
                                <div style={styles.labelCeditValueText}>
                                    {userCredit}
                                </div>
                            </div>
                            <div style={{ ...styles.creditParentStyle }}>
                                <div style={{ ...styles.labelCeditText, ...{ color: 'blue' } }}>
                                    Transfer
                                    </div>
                                <div style={{ ...styles.labelCeditText, ...{ color: 'blue' } }}>
                                    30<img
                                        src={PlanSvgColor}
                                        alt="PlanSvg"
                                        width={20}
                                        height={20}
                                        style={{ marginRight: 5 }}
                                    />
                                </div>
                            </div>
                            <div style={styles.creditParentStyle}>
                                <div style={styles.labelCeditText}>
                                    New balance <br /> After transfer
                                    </div>
                                <div style={styles.labelCeditValueText}>
                                    500
                                    </div>
                            </div>
                            <Button variant="success"
                            >Confirm request</Button>
                        </Card.Body>
                    </Card>
                </FormGroup>
            </div>
        </>
    )
}

TransferRequest.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userCredit: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    userCredit: makeSelectUserWallet(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect, memo)(TransferRequest);