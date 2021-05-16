import React, {memo} from 'react';
import PaperCard from '../../components/PaperCard';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {createStakeAction, fetchStakeAction} from './actions';
import {useInjectReducer} from '../../utils/injectReducer';
import patronReducer from './reducer';
import patronSaga from './saga';
import {useInjectSaga} from '../../utils/injectSaga';
import {makeSelectProgress, makeSelectStakeProgress, makeSelectStakes} from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import {Button, Image, Modal} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import {format} from 'date-fns';
import defaultImage from '../../images/user.svg';
import {makeSelectUserDetails} from '../App/selectors';
import PlanSvg from "../../images/svg/plan_icon_color.svg";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from "yup";
import ButtonLoader from "../../components/ButtonLoader";

const PatronList = ({fetchStake, progress, stakes, userDetails, createStakeProgress, createStake}) => {
  useInjectReducer({key: 'patron', reducer: patronReducer});
  useInjectSaga({key: 'patron', saga: patronSaga});
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


  const {register, handleSubmit, errors, reset, control} = useForm({
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
      {progress ? <LoadingIndicator/> :
        <PaperCard title="My Patronage">
          <div className="row">
            <div className="col-md-4 col-xl-3">
              <div className="card bg-dark mb-3">
                <div className="card-header">
                  <h5 className="card-title mb-0">Profile Details</h5>
                </div>
                <div className="card-body text-center">
                  <Image
                    width={120}
                    height={120}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
                    src={userDetails.avatar}
                    className="mb-2"
                    alt="avatar"
                    roundedCircle
                  />
                  <h5 className="card-title mb-2">{userDetails.name}</h5>
                  <div>
                    <img
                      src={PlanSvg}
                      alt="wallet Logo"
                      width={20}
                      height={20}
                    /><span className="font-weight-bold pl-2">  {userDetails.credit} credits</span>
                  </div>
                  <div className="mt-3">
                    <button type="button" onClick={() => {
                      setShowAddPatronage(true)
                    }} className="btn btn-sm btn-success">
                      Patronage Credit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8 col-xl-9">
              <h2>Patroned Info:</h2>
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
              />
            </div>
          </div>
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
                        style={{width: '200px'}}
                        placeholder="Enter amount"
                        onChange={(e) => {
                        }}
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
                        style={{width: '200px'}}
                        placeholder="Enter period"
                        type="number"
                        className={`form-control ${errors.tenure ? 'is-invalid' : ''}`}
                        ref={register}/>
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
