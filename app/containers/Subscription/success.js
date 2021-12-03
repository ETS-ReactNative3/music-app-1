import React, {memo, useEffect} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Link, useLocation} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faFileInvoiceDollar,
} from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {createSubscriptionPayment} from './actions';
import reducer from './reducer';
import saga from './saga';
import PaperCard from '../../components/PaperCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function SubscriptionSuccess({createOrder}) {
  useInjectReducer({key: 'subscription', reducer});
  useInjectSaga({key: 'subscription', saga});

  const query = useQuery();

  useEffect(() => {
    if (query.get('session_id')) {
      createOrder(query.get('session_id'));
    }
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
                    <small className="h6">Your subscription purchase order was successful</small>
                  </div>
                  <Link to="/">
                    <Button className="mt-2" variant="success">
                      Go back to Home
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </PaperCard>
    </>
  );
}

SubscriptionSuccess.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    createOrder: id => dispatch(createSubscriptionPayment(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SubscriptionSuccess);
