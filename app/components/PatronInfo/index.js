import React from 'react';
import { Button } from 'react-bootstrap';
import './index.scss';

const PatronInfo = ({ }) => {
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
                                <td>20,602</td>
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
                                <Button variant="success">Patron Credit</Button>
                                <Button variant="success">Withdraw</Button>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatronInfo;