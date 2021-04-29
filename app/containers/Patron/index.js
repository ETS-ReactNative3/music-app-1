import React, { memo } from 'react';
import PaperCard from '../../components/PaperCard';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { createStakeAction, fetchStakeAction } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import patronReducer from './reducer';
import patronSaga from './saga';
import { useInjectSaga } from '../../utils/injectSaga';
import { makeSelectProgress, makeSelectStakeProgress, makeSelectStakes } from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Button, Image, Modal } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { format } from 'date-fns';
import defaultImage from '../../images/user.svg';
import { makeSelectUserDetails } from '../App/selectors';
import PlanSvg from "../../images/svg/plan_icon_color.svg";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import ButtonLoader from "../../components/ButtonLoader";


const PatronList = ({ fetchStake, progress, stakes, userDetails, createStakeProgress, createStake }) => {
  useInjectReducer({ key: 'patron', reducer: patronReducer });
  useInjectSaga({ key: 'patron', saga: patronSaga });
  React.useEffect(() => {
    fetchStake();
  }, []);

  const [showAddPatronage, setShowAddPatronage] = React.useState(false);
  const validationSchema = Yup.object().shape({
    amount: Yup.number().typeError('Please enter valid number')
      .required('Amount is required'),
    tenure: Yup.number().typeError('Please enter valid number')
      .required('Tenure is required'),

  });


  const { register, handleSubmit, errors, reset, control } = useForm({
    resolver: yupResolver(validationSchema)
  });


  const columns = [
    {
      dataField: 'amount',
      text: 'Patronage Amount',
      headerStyle: {
        width: '20%'
      },
      style: {
        width: '20%'
      }
    },
    {
      dataField: 'tenure',
      text: 'Patron Tenure',
      headerStyle: {
        width: '20%'
      },
      style: {
        width: '20%'
      }
    },
    {
      dataField: 'createdDate',
      text: 'Created Date',
      formatter: dateFormatter,
      headerStyle: {
        width: '20%'
      },
      style: {
        width: '20%'
      }
    },
  ];

  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    return format(new Date(row.createdDate), 'dd/MM/yyyy HH:mm');
  }


  const onSubmit = data => {
    createStake(data);
    setTimeout(() => {
      setShowAddPatronage(false);

    }, 1000);
  };
  return (
    <>
      {progress ? <LoadingIndicator /> :
        <PaperCard title="My Patronage">
          <div className="row">
            <div className="col-sm-12">
              <div className="card bg-dark">
                <div className="card-body profile-user-box">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="media">
                        <span className="float-left m-2 mr-4">
                          <Image
                            width={120}
                            height={120}
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = defaultImage;
                            }}
                            src={userDetails.avatar}
                            alt=""
                            roundedCircle
                          />
                        </span>
                        <div className="media-body">
                          <h4 className="mt-1 mb-1 text-white">{userDetails.name}</h4>
                          <p className="font-13 text-white-50">
                            {userDetails.roleId !== 1 && userDetails.role.title}
                          </p>
                          <p className="font-13 text-white-50">
                            {userDetails.roleId === 1 && userDetails.influencerId && 'Tastemaker'}
                            {userDetails.roleId === 1 && !userDetails.influencerId && userDetails.role.title}
                          </p>
                          {userDetails.biography &&
                            <p>
                              <strong>Bio:</strong> {userDetails.biography}
                            </p>
                          }
                          <ul className="mb-0 list-inline text-light">
                            <li className="list-inline-item">
                              <h5 className="mb-1">
                                <img
                                  src={PlanSvg}
                                  alt="wallet Logo"
                                  width={20}
                                  height={20}
                                /> {userDetails.credit}
                              </h5>
                              <p className="mb-0 font-13 text-white-50">Bliiink Credits</p>
                            </li>
                          </ul>
                          {(userDetails && userDetails.subscription) && <>
                            <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0 mt-2">Subscription Info:- </h3>
                            <div className="mb-3">
                              {userDetails.subscription.title} ({userDetails.subscription.duration} days)
                        </div>
                          </>}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="text-center mt-sm-0 mt-3 text-sm-right">

                        <Button variant="success" onClick={() => { setShowAddPatronage(true) }}>Patronage Credit</Button>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className="my-5">Patroned Info:</h2>
          <BootstrapTable
            striped
            hover
            bordered={false}
            bootstrap4
            pagination={paginationFactory()}
            filter={filterFactory()}
            keyField="id"
            data={stakes || []}
            columns={columns}
            rowEvents={{
              onClick: (e, row) => {

              },
            }}
          />
          <Modal
            show={showAddPatronage}
            onHide={() => setShowAddPatronage(false)}
            backdrop="static"
            keyboard={false}
          >
              <form onSubmit={handleSubmit(onSubmit)}>

            <Modal.Header>Add Patronage</Modal.Header>
            <Modal.Body>

                <table className="">
<tbody>
                  <tr>
                    <td>Patroned Amount:</td>
                    <td>
                      <input
                        name="amount"
                        style={{ width: '200px' }}
                        placeholder="Enter amount"
                        onChange={(e) => { }}
                        className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                        ref={register}
                      />
                      <div className="invalid-feedback">
                        {errors.amount && errors.amount.message}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Tenure:</td>
                    <td>
                      <input
                        name="tenure"
                        style={{ width: '200px' }}
                        placeholder="Enter period"
                        type="number"
                        className={`form-control ${errors.tenure ? 'is-invalid' : ''}`}
                        ref={register} />
                      <div className="invalid-feedback">
                        {errors.tenure && errors.tenure.message}
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddPatronage(false)}>
              Close
            </Button>
            {createStakeProgress ? <ButtonLoader/> : <Button variant="primary" type="submit">
              Create
            </Button>}
            </Modal.Footer>
            </form>

          </Modal>
        </PaperCard>}
    </>
  )
}

PatronList.propTypes = {
  fetchStake: PropTypes.func,
  progress: PropTypes.bool,
  stakes: PropTypes.array,
  userDetails: PropTypes.any,
  createStakeProgress: PropTypes.bool,
  createStake: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  progress: makeSelectProgress(),
  stakes: makeSelectStakes(),
  userDetails: makeSelectUserDetails(),
  createStakeProgress: makeSelectStakeProgress()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStake: () => dispatch(fetchStakeAction()),
    createStake: (data) => dispatch(createStakeAction(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PatronList);
