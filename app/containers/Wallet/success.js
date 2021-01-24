import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import PaperCard from '../../components/PaperCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { createPaymentRequestAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function OrderSuccess({ createOrder }) {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });

  const query = useQuery();

  useEffect(() => {
    createOrder(query.get('session_id'));
  }, [query]);

  return (
    <>
    <PaperCard>
      <Row className="mt-4 justify-content-center">
        <Col lg={6}>
          <Card className="bg-transparent blick-border">
            <ListGroup>
              <ListGroup.Item className="p-4 bg-transparent border-0 text-center">
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  className="h1 text-success"
                />
                <div className="h1 text-center text-success">Success</div>
                <div className="m-4">
                  <small className="h6">Some content here!!</small>
                </div>
                <Button role="link" variant="success" type="button">
                  Go back to wallet
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </PaperCard>
    <PaperCard>
    <Row className="mt-4 justify-content-center">
      <Col lg={6}>
        <Card className="bg-transparent blick-border__danger">
          <ListGroup>
            <ListGroup.Item className="p-4 bg-transparent border-0 text-center">
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="h1 text-danger"
              />
              <div className="h1 text-center text-danger">Success</div>
              <div className="m-4">
                <small className="h6">Some content here!!</small>
              </div>
              <Button role="link" variant="danger" type="button">
                Go back to wallet
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  </PaperCard>
  </>
  );
}

OrderSuccess.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    createOrder: id => dispatch(createPaymentRequestAction(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrderSuccess);
