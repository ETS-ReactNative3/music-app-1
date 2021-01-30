import { faCheck, faDownload, faEdit, faExchangeAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Dropdown, DropdownButton, Form, FormCheck, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import Select from 'react-select';
import PaperCard from '../../components/PaperCard';
import styles from './index.styles';

const WithdrawlRequest = ({ }) => {
    const [withdrawalAccount, setWithDrawalAccount] = React.useState(1);
    const customStyles = {
        option: provided => ({
            ...provided,
            color: 'black',
        }),
        control: provided => ({
            ...provided,
            color: 'black',
        }),
        singleValue: provided => ({
            ...provided,
            color: 'black',
        }),
        menu: provided => ({ ...provided, zIndex: 9999 }),
    };

    const options = [
        { value: 1, label: 'Bank Transfer' },
        { value: 2, label: 'Paypal Transfer' },
    ];
    const [withdrawalTransfer, setWithDrawalTransfer] = React.useState(options[0]);


    const renderWithdrawalInformation = () => {
        if (withdrawalTransfer.value === 1) {
            return (<div style={{ marginTop: 30 }}>
                <FormGroup style={{ marginTop: 10 }}>
                    <label htmlFor="accountHolder">Account holder</label>
                    <input
                        name="accountHolder"
                        placeholder="Enter account holder"
                        className={`form-control `}
                    // ref={register}
                    />
                </FormGroup>
                <FormGroup style={{ marginTop: 10 }}>
                    <label htmlFor="iban">IBAN</label>
                    <input
                        name="iban"
                        placeholder="Enter IBAN number"
                        className={`form-control `}
                    // ref={register}
                    />
                </FormGroup>
                <FormGroup style={{ marginTop: 10 }}>
                    <label htmlFor="bic">BIC/Swift</label>
                    <input
                        name="bic"
                        placeholder="Enter BIC/swift number"
                        className={`form-control `}
                    // ref={register}
                    />
                </FormGroup>
                <Button variant="success">Add this withdrawal method</Button>
            </div>)
        } else if (withdrawalTransfer.value === 2) {
            return (<div style={{ marginTop: 30 }}>
                <FormGroup style={{ marginTop: 10 }}>
                    <label htmlFor="emailId">Paypal Email-id</label>
                    <input
                        name="emailId"
                        placeholder="Enter Paypal Email-id"
                        className={`form-control `}
                    // ref={register}
                    />
                </FormGroup>
                <Button variant="success">Add this withdrawal method</Button>
            </div>)
        }
    }

    return (
        <PaperCard>
            <div style={styles.tabContainer}>
                <div style={styles.tabItem}>
                    <FontAwesomeIcon icon={faHistory} />
                    History
                    </div>
                <div style={{ ...styles.tabItem, ...styles.activeTabItem }}>
                    <FontAwesomeIcon icon={faExchangeAlt} />
                    Transfer</div>
                <div style={styles.tabItem}>
                    <FontAwesomeIcon icon={faDownload} />

                    Withdrawal</div>
            </div>

            <div className="row">
                <div className="col">
                    <div style={styles.headerTitle}>Withdrawal</div>
                    <div style={styles.subHeaderTitle}>Withdraw money what you earned on bliiink</div>
                </div>
            </div>

            <Card style={{ width: '50%', marginTop: 30, color: 'black', padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Title>1. Beneficary</Card.Title>
                    <FontAwesomeIcon icon={faCheck} />
                </div>
                <Card.Body style={{ color: 'black', padding: 10 }}>
                    <div className="input-group">
                        <input className="form-control py-2 border-right-0 border" type="text" placeholder="Company information" id="examddple-search-input" />
                        <span className="input-group-append">
                            <div className="btn btn-outline-secondary border-left-0 border">
                                <FontAwesomeIcon icon={faEdit} />
                            </div>
                        </span>
                    </div>
                </Card.Body>
            </Card>

            <Card style={{ width: '50%', marginTop: 30, color: 'black', padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Card.Title>2. Withdrawal Method</Card.Title>
                    <FontAwesomeIcon icon={faCheck} />
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
                                {withdrawalAccount === 4&& <div style={styles.addWithdrawalContainer}>
                                    <label>Withdrawal Method</label>
                                    <Select
                                        className="basic-single"
                                        classNamePrefix="select"
                                        name="Add Withdrawal"
                                        options={options}
                                        value={withdrawalTransfer}
                                        placeholder="Select Withdrawal type"
                                        styles={{}}
                                        onChange={(value) => setWithDrawalTransfer(value)}
                                    />
                                    {renderWithdrawalInformation()}
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
        </PaperCard>
    )
}

export default WithdrawlRequest;