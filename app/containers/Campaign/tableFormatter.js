import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Image} from 'react-bootstrap';
import {CampaignStatus} from '../Requests/constants';
import defaultImage from '../../images/user.svg';

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
          style={{width: 40, height: 40, borderRadius: 20}}
          onError={e => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
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

function statusFormatter(cell, row) {
  if (row.campaignStatusId === 1) {
    return (
      <span>
        <div style={{color: 'lightyellow'}}>
          <FontAwesomeIcon icon={faCircle}/> Pending
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
          In Progress
      </span>
    );
  }

  if (row.campaignStatusId === CampaignStatus.COMPLETED) {
    return (
      <span>
          Pending
      </span>
    );
  }

  if (row.campaignStatusId === CampaignStatus.APPROVED) {
    return (
      <span>
          Approved
      </span>
    );
  }

  if (row.campaignStatusId === CampaignStatus.DECLINED) {
    return (
      <span>
          Declined
      </span>
    );
  }

  if (row.campaignStatusId === CampaignStatus.DISPUTE) {
    return (
      <span>
          Dispute
      </span>
    );
  }

  return <span>{cell}</span>;
}
