import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Image } from 'react-bootstrap';
import { calculateExpiry, timeDifference } from '../../utils';

export const newRequestColumns = [{
    dataField: 'picture',
    text: '',
    formatter: pictureFormatter,
    style: {
        width: '10%',
    },
    headerStyle: {
        textAlign: 'left'
    }
}, {
    dataField: 'campaigns.user.name',
    text: 'Artist',
    style: {
        width: '30%',
        textAlign: 'left'
    },
    headerStyle: {
        textAlign: 'left'
    }
}, {
    dataField: 'campaigns.song.title',
    text: 'Track',
    style: {
        width: '30%',
        textAlign: 'left'
    },
    headerStyle: {
        textAlign: 'left'
    }
}, {
    dataField: 'updatedAt',
    text: 'Status',
    style: {
        width: '15%'
    },
    formatter: statusFormatter
}, {
    dataField: 'Expiry Date',
    text: 'Expiry Date',
    style: {
        width: '15%',
    },
    formatter: expiryDateFormatter
}];

function pictureFormatter(cell, row) {
    if (row.campaigns && row.campaigns.song && row.campaigns.song.artwork) {
        return (
            <span>
                <Image
                    src={row.campaigns.song.artwork}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                />
            </span>
        );
    }

    return (
        <span>$ { cell}</span>
    );
}


function expiryDateFormatter(cell, row) {
    if (row.campaigns && row.campaigns.createdDate) {
        return (
            <span>
                <div>{calculateExpiry(row.campaigns.createdDate)}</div>
            </span>
        );
    }

    return (
        <span>$ { cell}</span>
    );
}

function statusFormatter(cell, row) {
    if (row.campaignStatusId === 1) {
        return (
            <span>
                <div style={{color: 'lightyellow'}}><FontAwesomeIcon icon={faCircle}/> Not accepted</div>
            </span>
        );
    }

    return (
        <span>$ { cell}</span>
    );
}