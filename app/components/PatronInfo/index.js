import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './index.scss';

const PatronInfo = ({ userDetails }) => {

    const [patronageAmount, setPatronageAmount] = React.useState(0);
    const [modal, setModal] = React.useState({show: false, message: ''});
    return (
        <div className="row mt-3">
            <div className="col-sm-12">
                <div className="card bg-dark">
                    <div className="card-body profile-user-box">
                        {/* <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center">
                        <h2>
                         Became a Bliiink patron Today, Get involved in decision making and EARN whild you do so. 
                        </h2>
                        

                        <Link to="/tasteMaker/request/form">
                          <Button className="mt-2" variant="success">
                            Become a Patron
                          </Button>
                        </Link>

                      </div>
                    </div>
                  </div> */}
                        <h4>Patronage</h4>

                        <table className="patron-table" style={{ width: '50%' }}>
                            {/* <th>
                                <td style={{width: '100px'}}/>
                                <td style={{width: '100px'}}/>
                            </th> */}
                            <tr>
                                <td className="mr-5">Available Credits:</td>
                                <td>{userDetails.credit}</td>
                            </tr>
                            <tr >
                                <td className="mr-5">Patroned Credits:</td>
                                <td>0</td>
                            </tr>
                            <tr >
                                <td className="mr-5">Rewards:</td>
                                <td>250</td>
                            </tr>
                            <tr>
                                <td>Patroned Amount:</td>
                                <td>
                                    <input
                                        name="amount"
                                        style={{ width: '200px' }}
                                        placeholder="Enter amount"
                                        className={`form-control `}
                                        value={patronageAmount}
                                        onChange={(e) => setPatronageAmount(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Withdrawal Amount:</td>
                                <td>
                                    <input
                                        name="amount"
                                        style={{ width: '200px' }}
                                        placeholder="Enter amount"
                                        className={`form-control `}
                                    />
                                </td>
                            </tr>
                            <tr className="d-flex flex-row justify-content-around">
                                <Button variant="success" onClick={() => {
                                    if (userDetails.credit === 0) {
                                        setModal({show: true, message: "You don't have credits to patronage"})
                                    } 
                                    else if (userDetails.credit < patronageAmount) {
                                        setModal({show: true, message: "Entered amount is greater than available credit in account."})
                                    }
                                    else if (patronageAmount === 0) {
                                        setModal({show: true, message: "Please enter patronage amount greater than 0."})
                                    }
                                }}>Patron Credit</Button>
                                <Button variant="success">Withdraw</Button>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
            <Modal
                show={modal.show}
                onHide={() => setModal({show: false, message: ''})}
                backdrop="static"
                keyboard={false}
            >
                
                <Modal.Body>{modal.message}</Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="primary" onClick={() => setModal({show: false, message: ''})}>
                        Ok
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PatronInfo;