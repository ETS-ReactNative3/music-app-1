import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import React from 'react';
import { Image } from 'react-bootstrap';
import { calculateExpiry } from '../../utils';
import { CampaignStatus } from './constants';
import defaultImage from '../../images/album-3.jpg';

export const newRequestColumns = [
  {
    dataField: 'picture',
    text: '#',
    formatter: pictureFormatter,
    style: {
      width: '10%',
    },
    headerStyle: {
      textAlign: 'left',
    },
  },
  {
    dataField: 'campaigns.song.title',
    text: 'Track',
    style: {
      width: '30%',
      textAlign: 'left',
    },
    headerStyle: {
      textAlign: 'left',
    },
  },
  {
    dataField: 'updatedAt',
    text: 'Status',
    style: {
      width: '15%',
    },
    formatter: statusFormatter,
  },
  {
    dataField: 'Expiry Date',
    text: 'Expiry Date',
    style: {
      width: '15%',
    },
    formatter: expiryDateFormatter,
  },
];

export function pictureFormatter(cell, row) {
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
  if (row && row.song && row.song.artwork) {
    return (
      <span>
        <Image
          src={row.song.artwork}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </span>
    );
  }

  return (
    <Image
      src={defaultImage}
      style={{ width: 40, height: 40, borderRadius: 20 }}

    />
  )
}

function expiryDateFormatter(cell, row) {
  if (row.campaigns && row.campaigns.createdDate) {
    return (
      <span>
        <div>{calculateExpiry(row.campaigns.createdDate)}</div>
      </span>
    );
  }

  return <span>$ {cell}</span>;
}
export function dateFormatter(cell, row, rowIndex, formatExtraData) {
  return format(new Date(row.createdDate), 'MM/dd/yyyy');
}

function statusFormatter(cell, row) {
  if (row.campaignStatusId === 1) {
    return (
      <span>
        <div style={{ color: 'lightyellow' }}>
          <FontAwesomeIcon icon={faCircle} /> Not accepted
        </div>
      </span>
    );
  }

  if (
    row.campaignStatusId === CampaignStatus['IN-PROGRESS'] ||
    row.campaignStatusId === CampaignStatus.ACCEPTED
  ) {
    return (
      <span>
        <div style={{ color: 'lightyellow' }}>
          <FontAwesomeIcon icon={faCircle} /> In Progress
        </div>
      </span>
    );
  }

  if (
    row.campaignStatusId === CampaignStatus.COMPLETED ||
    row.campaignStatusId === CampaignStatus.APPROVED
  ) {
    return (
      <span>
        <div style={{ color: 'lightyellow' }}>
          <FontAwesomeIcon icon={faCircle} />
          Completed
        </div>
      </span>
    );
  }

  return <span>{cell}</span>;
}
