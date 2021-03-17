import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RemotePagination } from '../../components/RemotePagination';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { blockUserAction, fetchUsersAction } from './actions';
import adminUsersReducer from './reducer';
import adminUsersSaga from './saga';
import { makeSelectAdminUsers, makeSelectAdminUsersCount } from './selectors';
import UserAddCredit from './UserAddCredit';


const AdminUsers = ({ users, fetchUsers, blockUser, usersCount }) => {

    useInjectReducer({ key: 'adminUsers', reducer: adminUsersReducer })
    useInjectSaga({ key: 'adminUsers', saga: adminUsersSaga })
    const [currentPage, setCurrentPage] = React.useState(1);
    const [openCreditModal, setOpenCreditModal] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState({});

    const handleTableChange = (type, { page, sizePerPage }) => {
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
                width: '30%',
            },
            headerStyle: {
                width: '30%',
            },
            //   formatter: statusFormatter,
        },
        {
            dataField: 'email1',
            text: 'Status',
            formatter: statusFormatter,
            style: {
                width: '15%',
            },
            headerStyle: {
                width: '15%',
            },
            //   formatter: statusFormatter,
        },
        {
            dataField: 'credit',
            text: 'Credits',
            style: {
                width: '15%',
            },
            headerStyle: {
                width: '15%',
            },
            //   formatter: statusFormatter,
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
                <span>
                    Blocked
                </span>
            );
        }

        return <span>Un-Blocked</span>;
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
                    onClick={() => { blockUser(row.id, currentPage, 10, row.block) }}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </button> :
                    <button
                        className="btn btn-danger"
                        onClick={() => { blockUser(row.id, currentPage, 10, row.block) }}
                    >
                        <FontAwesomeIcon icon={faBan} />
                    </button>}
                    <button
                        className="btn btn-success"
                        onClick={() => {  setSelectedUser(row); setOpenCreditModal(true) }}
                    >
                        Add Credits
                    </button>
            </div>
        );
    }

    return (
        <>

            <RemotePagination
                data={users}
                page={currentPage}
                sizePerPage={10}
                totalSize={usersCount}
                columns={columns}
                onTableChange={handleTableChange}
                rowEvents={{
                    
                }}
            />
            {openCreditModal && <UserAddCredit openModal={openCreditModal} handleClose={() => {setOpenCreditModal(false)}} id={selectedUser ? selectedUser.id : ''}  page={currentPage} limit={10}/>}
        </>
    )
}


AdminUsers.propTypes = {
    users: PropTypes.array,
    fetchUsers: PropTypes.func,
    blockUser: PropTypes.func,
    usersCount: PropTypes.array
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
