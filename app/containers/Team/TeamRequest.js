import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectUserDetails } from '../App/selectors';
import { makeSelectProgress, makeSelectMyTeamRequests } from './selectors';
import PaperCard from '../../components/PaperCard';
import { fetchMyTeamRequestAction, requestAction } from './actions';
import teamReducer from './reducer';
import teamSaga from './saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import LoadingIndicator from '../../components/LoadingIndicator';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCheck } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

const TeamRequest = ({ myTeamRequest, fetchMyTeamRequest, progress, requestAction }) => {
    useInjectReducer({ key: 'team', reducer: teamReducer });
    useInjectSaga({ key: 'team', saga: teamSaga });
    React.useEffect(() => {
        fetchMyTeamRequest();
    }, []);

    const columns = [
        {
            dataField: 'teams.name',
            text: 'Team Name',
            headerStyle: {
                width: '25%'
            },
            style: {
                width: '25%'
            }
        },
        {
            dataField: 'amount',
            text: 'Request from',
            formatter: requestFromFormatter,
            headerStyle: {
                width: '30%'
            },
            style: {
                width: '30%'
            }
        },

        {
            dataField: 'createdDate',
            text: 'Created Date',
            formatter: dateFormatter,
            headerStyle: {
                width: '25%'
            },
            style: {
                width: '25%'
            }
        },
        {
            dataField: 'actions',
            text: 'Actions',
            isDummyField: true,
            csvExport: false,
            formatter: actionsFormatter,
            headerStyle: {
                width: '30%',
                textAlign: 'center'
            },
            style: {
                width: '30%'
            }
        },
    ];

    function dateFormatter(cell, row, rowIndex, formatExtraData) {
        return format(new Date(row.createdDate), 'dd/MM/yyyy HH:mm');
    }

    function requestFromFormatter(cell, row, rowIndex, formatExtraData) {
        return `${row.teams.user.name} (${row.teams.user.email})`;
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
                <button
                    className="btn btn-success"
                    onClick={() => {
                        requestAction(row.teams.id, true)
                    }}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        requestAction(row.teams.id, false)
                    }}
                >
                    <FontAwesomeIcon icon={faBan} />
                </button>
            </div>
        );
    }



    return (
        <>            {(progress) ? <LoadingIndicator /> :

            <PaperCard title="Team Requests">
                <BootstrapTable
                    striped
                    hover
                    bordered={false}
                    bootstrap4
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    keyField="id"
                    data={myTeamRequest || []}
                    columns={columns}
                />
            </PaperCard>}
        </>
    )
}



TeamRequest.propTypes = {
    userDetails: PropTypes.any,
    progress: PropTypes.bool,
    fetchMyTeamRequest: PropTypes.func,
    myTeamRequest: PropTypes.array,
    requestAction: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    userDetails: makeSelectUserDetails(),
    progress: makeSelectProgress(),
    myTeamRequest: makeSelectMyTeamRequests()

});

function mapDispatchToProps(dispatch) {
    return {
        fetchMyTeamRequest: () => dispatch(fetchMyTeamRequestAction()),
        requestAction: (teamsId, accepted) => dispatch(requestAction(teamsId, accepted))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(TeamRequest);
