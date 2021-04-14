import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { propTypes } from 'react-bootstrap/esm/Image';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PaperCard from '../../components/PaperCard';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { fetchTeamsAction } from './actions';
import teamReducer from './reducer';
import teamSaga from './saga';
import {makeSelectProgress, makeSelectTeams} from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Team = ({ fetchTeam , teams, progress}) => {

    useInjectReducer({ key: 'team', reducer: teamReducer });
    useInjectSaga({ key: 'team', saga: teamSaga });
    React.useEffect(() => {
        fetchTeam();
    }, []);
    const columns = [
        {
            dataField: 'name',
            text: 'Tastemaker Name',
            headerStyle: {
                width: '20%'
            },
            style: {
                width: '20%'
            }
        },
    ];

    const history = useHistory()
    return (
        <>
        {progress ? <LoadingIndicator/> :
            <PaperCard title="Team's">
                <Button variant="success" onClick={() => history.push('/team/add')}>Add Team</Button>
                <BootstrapTable
                    striped
                    hover
                    bordered={false}
                    bootstrap4
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    keyField="id"
                    data={[]}
                    columns={columns}
                />
            </PaperCard>}
        </>
    )
}


Team.propTypes = {
    fetchTeam: PropTypes.func,
    progress: PropTypes.bool,
    teams: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    progress: makeSelectProgress(),
    teams: makeSelectTeams()
});

function mapDispatchToProps(dispatch) {
    return {
        fetchTeam: () => dispatch(fetchTeamsAction())
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(Team);
