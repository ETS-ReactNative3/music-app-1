import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './index.scss';
import { addCreditsAction } from '../action';

const UserAddCredit = ({ openModal, handleClose, addCredit, id,page, limit }) => {

    const [errors, setErrors] = React.useState('');
    const [credit, setCredit] = React.useState(0);
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
                    <div>Add Credits</div>
                </div>
            </Modal.Header>
            <Modal.Body>

                <div className="add_credit">
                    <div className="credit_error">
                        <input
                            placeholder="Enter Credits"
                            type="number"
                            className={`form-control  ${errors ? 'is-invalid' : ''
                                }`}
                            onChange={(event) => { if (event.target.value.length> 0) setErrors(''); setCredit(event.target.value) }}
                        />
                        <div className="invalid-feedback">
                            {errors}
                        </div>
                    </div>
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            if (credit && credit > 0) {
                                addCredit(id, credit, page, limit)
                                handleClose()
                            } else {
                                setErrors('Please add credits')
                            }
                        }}
                    >Add Credit</button>
                </div>
            </Modal.Body>
        </Modal>
    )
}


UserAddCredit.propTypes = {
    addCredit: PropTypes.func,
    openModal: PropTypes.bool,
    handleClose: PropTypes.func,
    id: PropTypes.string,
    page: PropTypes.number,
    limit: PropTypes.number

};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
    return {
        addCredit: (userId, credits,page, limit) => dispatch(addCreditsAction(userId, credits,page, limit))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(UserAddCredit);
