import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PaperCard from '../../components/PaperCard';
import { makeSelectProgress, makeSelectMyTeams } from './selectors';
import { fetchMyTeamsAction } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import teamReducer from './reducer';
import teamSaga from './saga';
import BootstrapTable from 'react-bootstrap-table-next';
import LoadingIndicator from '../../components/LoadingIndicator';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { format } from 'date-fns';

const MyTeams = ({ fetchMyTeams, myTeams, progress }) => {
    useInjectReducer({ key: 'team', reducer: teamReducer });
    useInjectSaga({ key: 'team', saga: teamSaga });
    React.useEffect(() => {
        fetchMyTeams();
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
        
    ];

    function dateFormatter(cell, row, rowIndex, formatExtraData) {
        return format(new Date(row.teams.createdDate), 'dd/MM/yyyy HH:mm');
    }
    return (
        <>
            {(progress) ? <LoadingIndicator /> :

                <PaperCard title="My Teams">
                    <BootstrapTable
                        striped
                        hover
                        bordered={false}
                        bootstrap4
                        pagination={paginationFactory()}
                        filter={filterFactory()}
                        keyField="id"
                        data={myTeams || []}
                        columns={columns}
                    />
                </PaperCard>}
        </>
    )
}




MyTeams.propTypes = {
    progress: PropTypes.bool,
    fetchMyTeams: PropTypes.func,
    myTeams: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    progress: makeSelectProgress(),
    myTeams: makeSelectMyTeams()
});

function mapDispatchToProps(dispatch) {
    return {
        fetchMyTeams: () => dispatch(fetchMyTeamsAction())
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(MyTeams);
