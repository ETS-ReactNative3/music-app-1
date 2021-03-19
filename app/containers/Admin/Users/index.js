import {faBan, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, {memo, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {RemotePagination} from '../../../components/RemotePagination';
import {useInjectReducer} from '../../../utils/injectReducer';
import {useInjectSaga} from '../../../utils/injectSaga';
import {blockUserAction, fetchUsersAction} from '../action';
import adminUsersReducer from '../reducer';
import adminUsersSaga from '../saga';
import {makeSelectAdminUsers, makeSelectAdminUsersCount} from '../selectors';
import PaperCard from "../../../components/PaperCard";
import UserAddCredit from "./UserAddCredit";


const AdminUsers = ({users, fetchUsers, blockUser, usersCount}) => {

  useInjectReducer({key: 'admin', reducer: adminUsersReducer})
  useInjectSaga({key: 'admin', saga: adminUsersSaga})
  const [currentPage, setCurrentPage] = useState(1);
  const [openCreditModal, setOpenCreditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleTableChange = (type, {page, sizePerPage}) => {
    setTimeout(() => {
      setCurrentPage(page);
      fetchUsers(page - 1, 10);
    }, 100);
  }

  React.useEffect(() => {
    fetchUsers(0, 10);
  }, [])


  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      style: {
        width: '20%',
        textAlign: 'left',
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left',
      },
    },
    {
      dataField: 'email',
      text: 'Email',
      style: {
        width: '25%',
      },
      headerStyle: {
        width: '25%',
      },
    },
    {
      dataField: 'role.title',
      text: 'Role',
      style: {
        width: '10%',
      },
      headerStyle: {
        width: '10%',
      },
    },
    {
      dataField: 'block',
      text: 'Status',
      formatter: statusFormatter,
      style: {
        width: '15%',
      },
      headerStyle: {
        width: '15%',
      },
    },
    {
      dataField: 'credit',
      text: 'Credits',
      style: {
        width: '10%',
      },
      headerStyle: {
        width: '10%',
      },
    },
    {
      dataField: 'actions',
      text: 'Actions',
      isDummyField: true,
      csvExport: false,
      formatter: actionsFormatter,
      style: {
        width: '25%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '25%',
        textAlign: 'center'
      }
    },
  ];

  function statusFormatter(cell, row) {
    if (row.block) {
      return (
        <span>Blocked</span>
      );
    }

    return <span>Active</span>;
  }

  function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          lineHeight: 'normal',
        }}
      >

        {row.block ? <button
            className="btn btn-success"
            onClick={() => {
              blockUser(row.id, currentPage, 10, !row.block)
            }}
          >
            <FontAwesomeIcon icon={faCheck}/>
          </button> :
          <button
            className="btn btn-danger"
            onClick={() => {
              blockUser(row.id, currentPage, 10, !row.block)
            }}
          >
            <FontAwesomeIcon icon={faBan}/>
          </button>}
        <button
          className="btn btn-success"
          onClick={() => {
            setSelectedUser(row);
            setOpenCreditModal(true)
          }}
        >
          Change Credits
        </button>
      </div>
    );
  }

  return (
    <PaperCard title="User List">
      <RemotePagination
        data={users}
        page={currentPage}
        sizePerPage={10}
        totalSize={usersCount}
        columns={columns}
        onTableChange={handleTableChange}
      />
      {openCreditModal && <UserAddCredit openModal={openCreditModal} handleClose={() => {
        setOpenCreditModal(false)
      }} id={selectedUser ? selectedUser.id : ''} page={currentPage} limit={10}/>}
    </PaperCard>
  )
}


AdminUsers.propTypes = {
  users: PropTypes.array,
  fetchUsers: PropTypes.func,
  blockUser: PropTypes.func,
  usersCount: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectAdminUsers(),
  usersCount: makeSelectAdminUsersCount()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: (page, limit) => dispatch(fetchUsersAction(page, limit)),
    blockUser: (userId, page, limit, block) => dispatch(blockUserAction(userId, page, limit, block))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminUsers);
