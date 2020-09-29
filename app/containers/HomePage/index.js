/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Carousel from 'react-elastic-carousel'

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import LatestPosts from 'components/LatestPosts';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <article>
      <Helmet>
        <title>Latest Posts</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      
<section>
<h3>Featured Album</h3>
<Carousel itemsToShow={4}>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-1.jpg')} alt="" className="slider-img"/>
                    <div className="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div className="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div className="image-area">
                    <img src={require('./../../images/album-2.jpg')} alt="" className="slider-img"/>
                    <div className="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div className="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div className="image-area">
                    <img src={require('./../../images/album-3.jpg')} alt="" className="slider-img"/>
                    <div className="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div className="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-4.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-5.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-6.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
            </Carousel>
</section>

<section className="post-area">
<h3>Latest Posts</h3>
<Carousel itemsToShow={3}>
                <div className="slider-box">
                  <div class="image-area">
                  <img src={require('./../../images/post-2.jpg')} alt="" class="slider-img"/>
                  <div class="caption clearfix">
                  <div class="float-left">
                        <h4>Shallow Bay: The Bes</h4>
                      <h6>Kevin Buckland,</h6>
                      </div>
                </div>
              </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                  <img src={require('./../../images/post-2.jpg')} alt="" class="slider-img"/>
                  <div class="caption clearfix">
                  <div class="float-left">
                        <h4>Shallow Bay: The Bes</h4>
                      <h6>Kevin Buckland,</h6>
                      </div>
                </div>
              </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                  <img src={require('./../../images/post-2.jpg')} alt="" class="slider-img"/>
                  <div class="caption clearfix">
                  <div class="float-left">
                        <h4>Shallow Bay: The Bes</h4>
                      <h6>Kevin Buckland,</h6>
                      </div>
                </div>
              </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                  <img src={require('./../../images/post-2.jpg')} alt="" class="slider-img"/>
                  <div class="caption clearfix">
                  <div class="float-left">
                        <h4>Shallow Bay: The Bes</h4>
                      <h6>Kevin Buckland,</h6>
                      </div>
                </div>
              </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                  <img src={require('./../../images/post-2.jpg')} alt="" class="slider-img"/>
                  <div class="caption clearfix">
                  <div class="float-left">
                        <h4>Shallow Bay: The Bes</h4>
                      <h6>Kevin Buckland,</h6>
                      </div>
                </div>
              </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                  <img src={require('./../../images/post-2.jpg')} alt="" class="slider-img"/>
                  <div class="caption clearfix">
                  <div class="float-left">
                        <h4>Shallow Bay: The Bes</h4>
                      <h6>Kevin Buckland,</h6>
                      </div>
                </div>
              </div>
                </div>
                </Carousel>
</section>


<section>
<h3>Weekly Top 12</h3>
<div class="row">
	<div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">01</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">02</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">03</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    
</div>
<div class="row">
	<div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">04</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">02</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">03</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    
</div>
<div class="row">
	<div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">07</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">02</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">03</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    
</div>
<div class="row">
	<div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">10</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">02</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    <div class="col-md-4">
    	<div class="weekly-list">
        	<div class="no-box  d-inline-block">03</div>
            <div class="img-thumb d-inline-block"><img src={require('./../../images/album-6.jpg')} alt="" /></div>
            <div class="tag-box d-inline-block">
            	<h5>Walking Promises</h5>
                <h6>Anna Ellison, Claire,</h6>
            </div>
            <div class="time-box d-inline-block">
            	0:23
            </div>
            <div class="dot-box d-inline-block">
            	...
            </div>
            <div class="play-box d-inline-block">
                <img src={require('./../../images/play-icon-blue.png')} alt=""/>
            </div>
        </div>
    </div>
    
</div>

</section>

<section>
<h3>New Releases</h3>
<Carousel itemsToShow={4}>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-1.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-2.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-3.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-4.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-5.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-6.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
            </Carousel>
</section>


<section>
<h3>Recommended For You</h3>
<Carousel itemsToShow={4}>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-1.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-2.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-3.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-4.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-5.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
                <div className="slider-box">
                  <div class="image-area">
                    <img src={require('./../../images/album-6.jpg')} alt="" class="slider-img"/>
                    <div class="hover-box"><img src={require('./../../images/play-icon.png')} alt=""/></div>
                  </div>
                  <div class="caption">
                      <h4>One More Stranger</h4>
                      <h6>Kevin Buckland,</h6>
                  </div>
                </div>
            </Carousel>
</section>
      {/* <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        
        <Section>
          <H2>
            <FormattedMessage {...messages.trymeHeader} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="username"
                type="text"
                placeholder="mxstbr"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
          </Form>
          <ReposList {...reposListProps} />
        </Section>
      </div> */}
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
