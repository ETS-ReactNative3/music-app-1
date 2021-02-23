import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Image } from 'react-bootstrap';
import { CampaignStatus } from '../Requests/constants';
import defaultImage from '../../images/album-3.jpg';

export const columns = [
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
    dataField: 'influencer.name',
    text: 'Influencer name',
    style: {
      width: '15%',
      textAlign: 'left'
    },
    headerStyle: {
      width: '15%',
      textAlign: 'left'
    },
  },
  {
    dataField: 'influencer.description',
    text: 'Description',
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
    dataField: 'amount',
    text: 'Amount',
    style: {
      width: '10%',
      textAlign: 'left'
    },
    headerStyle: {
      width: '10%',
      textAlign: 'left'
    }
  },
  {
    dataField: 'createdDate',
    text: 'Status',
    formatter: statusFormatter,
    style: {
      width: '15%',
      textAlign: 'left'
    },
    headerStyle: {
      width: '15%',
      textAlign: 'left'
    },
  },
];
export function pictureFormatter(cell, row) {
  if (row.influencer && row.influencer.user && row.influencer.user.avatar) {
    return (
      <span>
        <Image
          src={row.influencer.user.avatar}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      </span>
    );
  } return (
    <Image
      src={defaultImage}
      style={{ width: 40, height: 40, borderRadius: 20 }}

    />
  )

}

function statusFormatter(cell, row) {
  if (row.campaignStatusId === 1) {
    return (
      <span>
        <div style={{ color: 'lightyellow' }}>
          <FontAwesomeIcon icon={faCircle} /> Pending from influencer
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

  if (row.campaignStatusId === CampaignStatus.COMPLETED) {
    return (
      <span>
        <div style={{ color: 'lightyellow' }}>
          <FontAwesomeIcon icon={faCircle} />
          Pending
        </div>
      </span>
    );
  }

  if (row.campaignStatusId === CampaignStatus.APPROVED) {
    return (
      <span>
        <div style={{ color: 'lightyellow' }}>
          <FontAwesomeIcon icon={faCircle} />
          Approved
        </div>
      </span>
    );
  }

  if (row.campaignStatusId === CampaignStatus.DECLINED) {
    return (
      <span>
        <div style={{ color: 'lightyellow' }}>
          <FontAwesomeIcon icon={faCircle} />
          Declined
        </div>
      </span>
    );
  }

  if (row.campaignStatusId === CampaignStatus.DISPUTE) {
    return (
        <span>
        <div style={{ color: 'red' }}>
          <FontAwesomeIcon icon={faCircle} />
          Dispute
        </div>
      </span>
    );
  }

  return <span>{cell}</span>;
}
