import React from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RemotePagination } from '../../../components/RemotePagination';
import { fetchAlbumAction, makeAlbumFeaturedAction } from '../action';
import { makeSelectAdminAlbumsCount, makeSelectFeaturedAlbums } from '../selectors';
import PropTypes from 'prop-types';
import { useInjectReducer } from '../../../utils/injectReducer';
import adminReducer from '../reducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import adminSaga from '../saga';
import { connect } from 'react-redux';
import { pictureFormatter } from '../../Requests/utils';

const FeaturedAlbums = ({ fetchAlbums, featuredAlbums, makeAlbumFeatured , albumsCount}) => {

    React.useEffect(() => {
        fetchAlbums(0, 10);
    }, []);
    useInjectReducer({ key: 'admin', reducer: adminReducer })
    useInjectSaga({ key: 'admin', saga: adminSaga })

    const [currentPage, setCurrentPage] = React.useState(1);
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
            dataField: 'title',
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
            dataField: 'description',
            text: 'Description',
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
        if (row.featured) {
            return (
                <span>
                    Featured
                </span>
            );
        }

        return <span>Non-featured</span>;
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

                {row.featured ? <button
                    className="btn btn-danger"
                    onClick={() => { }}
                >
                    Remove  Featured
                </button> :
                    <button
                        className="btn btn-success"
                        onClick={() => { makeAlbumFeatured(row.id, currentPage, 10, row.featured) }}
                    >
                     Make Featured
                    </button>}
                    
            </div>
        );
    }

    const handleTableChange = (type, { page, sizePerPage }) => {
        setTimeout(() => {
            setCurrentPage(page);
            fetchAlbums(page - 1, 10);
        }, 100);
    }

    return (
        <RemotePagination
            data={featuredAlbums || []}
            page={currentPage}
            sizePerPage={10}
            totalSize={albumsCount}
            columns={columns}
            onTableChange={handleTableChange}
            rowEvents={{

            }}
        />
    )
}

FeaturedAlbums.propTypes = {
    fetchAlbums: PropTypes.func,
    featuredAlbums: PropTypes.array,
    makeAlbumFeatured: PropTypes.func,
    albumsCount: PropTypes.number

}

const mapStateToProps = createStructuredSelector({

    featuredAlbums: makeSelectFeaturedAlbums(),
    albumsCount: makeSelectAdminAlbumsCount()
});

function mapDispatchToProps(dispatch) {
    return {
        fetchAlbums: (page, limit) => dispatch(fetchAlbumAction(page, limit)),
        makeAlbumFeatured: (albumId, page, limit, featured) => dispatch(makeAlbumFeaturedAction(albumId, page, limit, featured))
    };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
    withConnect
)(FeaturedAlbums)