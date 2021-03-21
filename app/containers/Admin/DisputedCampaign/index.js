import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PaperCard from '../../../components/PaperCard';
import { RemotePagination } from '../../../components/RemotePagination';
import { fetchDisputedCampaignAction } from '../action';
import { makeSelectedDisputedCampaigns, makeSelectLoading } from '../selectors';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import adminSaga from '../saga';
import adminReducer from '../reducer';
import { useInjectReducer } from '../../../utils/injectReducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import LoadingIndicator from '../../../components/LoadingIndicator';
import defaultImage from '../../../images/album-4.jpg';
import { Image } from 'react-bootstrap';

const DisputedCampaigns = ({ disputedCampaigns, fetchDisputedCampaigns, loading }) => {

   
    useInjectReducer({ key: 'admin', reducer: adminReducer })
    useInjectSaga({ key: 'admin', saga: adminSaga })

    const [currentPage, setCurrentPage] = React.useState(0);

    const handleTableChange = (type, { page, sizePerPage }) => {
        setTimeout(() => {
            setCurrentPage(page);
            fetchDisputedCampaigns(page - 1, 10);
        }, 100);
    }
    React.useEffect(() => {
        fetchDisputedCampaigns(0, 10);
    }, [])

    const columns = [
        {
            dataField: '',
            text: '#',
            formatter: pictureFormatter,
            style: {
                width: '10%',
            },
            headerStyle: {
                width: '10%',
                textAlign: 'left',
            },
        },
        {
            dataField: 'campaigns.song.title',
            text: 'Song name',
            style: {
                width: '50%',
                textAlign: 'left'
            },
            headerStyle: {
                width: '50%',
                textAlign: 'left'
            },
        },
        {
            dataField: 'feedback',
            text: 'Feedback',
            style: {
                width: '25%',
                textAlign: 'left'
            },
            headerStyle: {
                width: '25%',
                textAlign: 'left'
            },
        },

       



    ];


     function pictureFormatter(cell, row) {
        if (row.campaigns && row.campaigns.song && row.campaigns.song && row.campaigns.song.artwork) {
          return (
            <span>
              <Image
                src={row.campaigns.song.artwork}
                style={{width: 40, height: 40, borderRadius: 20}}
              />
            </span>
          );
        }
      
        
      
        return (
          <Image
            src={defaultImage}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
        )
      }

    return (
        <>
            {loading ? <LoadingIndicator /> :
                <PaperCard title="Disputed Campaigns">
                    <RemotePagination
                        data={disputedCampaigns || []}
                        page={currentPage}
                        sizePerPage={10}
                        totalSize={20}
                        columns={columns}
                        onTableChange={handleTableChange}
                        rowEvents={{}}
                        keyField={'campaigns.id'}
                    />
                </PaperCard>}
        </>
    )
}


DisputedCampaigns.propTypes = {
    fetchDisputedCampaigns: PropTypes.func,
    disputedCampaigns: PropTypes.array,
    loading: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
    disputedCampaigns: makeSelectedDisputedCampaigns(),
    loading: makeSelectLoading()
})

function mapDispatchToProps(dispatch) {
    return {
        fetchDisputedCampaigns: (page, limit) => dispatch(fetchDisputedCampaignAction(page, limit)),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
    withConnect,
    memo
)(DisputedCampaigns)
