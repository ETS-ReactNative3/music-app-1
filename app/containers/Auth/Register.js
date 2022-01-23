import React, { memo, useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useForm } from 'react-hook-form';
import { registerReq } from './actions';
import saga from './saga';
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../../components/InputPhone/index.scss';

function Register({ registerRequest }) {
  useInjectSaga({ key: 'auth', saga });
  const onSubmit = values => registerRequest(values);

  const validationSchema = Yup.object().shape({
    name: Yup.string()

      .required('Name is required')
      .test('space', 'Name is required', val => { return val.trim().toString().length > 0 })
      .test('min', 'Name must have 5 characters atleast', val => { return val.trim().toString().length > 4 })
      .test('max', 'Name should have atmost 50 characters', val => { return val.trim().toString().length < 51 }),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    phone: Yup.string().required('Phone is required').min(10, "Phone number should contain minimum 10 digits").max(15, "Phone number should contain atmost 15 digits"),
    password: Yup.string()
      .required('Password is required')
      .test('space', 'Password is required', val => { return val.trim().toString().length > 0 })
      .test('min', 'Password must have 6 characters atleast', val => { return val.trim().toString().length > 5 })
      .test('max', 'Password must have atmost 100 characters', val => { return val.trim().toString().length < 101 })
      .test('spaceatstart', 'Your password can’t start or end with a blank space', val => { return val.trim().toString().length === val.toString().length }),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Accept Ts & Cs is required')
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <div className="mb-5">
            <h1 className="display-4">Create your account</h1>
            <p>Already have an account? <Link to="/auth/login">Sign in here</Link></p>
          </div>
        </div>
        <div className="form-group text-center">
          <div className="form-check-inline">
            <input
              className={`form-check-input ${errors.roleId ? 'is-invalid' : ''
                }`}
              ref={register}
              type="radio"
              name="roleId"
              defaultChecked="checked"
              value={1}
              id="regular"
            />
            <label className="form-check-label" htmlFor="regular">
              Regular
            </label>
          </div>
          <div className="form-check-inline">
            <input
              className={`form-check-input ${errors.roleId ? 'is-invalid' : ''
                }`}
              ref={register}
              type="radio"
              name="roleId"
              value={2}
              id="artist"
            />
            <label className="form-check-label" htmlFor="artist">
              Artist
            </label>
          </div>
          <div className="invalid-feedback">
            {errors.roleId && errors.roleId.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Name</label>
          <input
            name="name"
            placeholder="Enter name"
            ref={register}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {errors.name && errors.name.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="Enter email"
            ref={register}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">
            {errors.email && errors.email.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Phone</label>
          <input
            type="number"
            name="phone"
            pattern="[0-9]{10,15}"
            placeholder="Enter phone"
            className={`phone_field form-control ${errors.phone ? 'is-invalid' : ''}`}
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.phone && errors.phone.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.password && errors.password.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Re-type Password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''
              }`}
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword && errors.confirmPassword.message}
          </div>
        </div>
        <div className="js-form-message form-group">
          <div className="custom-control custom-checkbox">
            <input
              name="acceptTerms"
              type="checkbox"
              ref={register}
              className={`custom-control-input ${errors.acceptTerms ? 'is-invalid' : ''
                }`}
              id="termsCheckbox"
            />
            <label className="custom-control-label" htmlFor="termsCheckbox">
              I accept the <a href="#" className="cursor-pointer" onClick={handleShow}>Terms and Conditions</a>
            </label>
            <div className="invalid-feedback">{errors.acceptTerms && errors.acceptTerms.message}</div>
          </div>
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <article>
            <h2>Terms and conditions</h2>

            <small>
              These terms and conditions (“Agreement”) set forth the general
              terms and conditions of your use of the{' '}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.bliiink.co.uk"
              >
                bliiink.co.uk
              </a>{' '}
              website (“Website”), “Bliiink” mobile application (“Mobile
              Application”) and any of their related products and services
              (collectively, “Services”). This Agreement is legally binding
              between you (“User”, “you” or “your”) and Bliiink (“Bliiink”,
              “we”, “us” or “our”). If you are entering into this agreement on
              behalf of a business or other legal entity, you represent that you
              have the authority to bind such entity to this agreement, in which
              case the terms “User”, “you” or “your” shall refer to such entity.
              If you do not have such authority, or if you do not agree with the
              terms of this agreement, you must not accept this agreement and
              may not access and use the Services. By accessing and using the
              Services, you acknowledge that you have read, understood, and
              agree to be bound by the terms of this Agreement. You acknowledge
              that this Agreement is a contract between you and Bliiink, even
              though it is electronic and is not physically signed by you, and
              it governs your use of the Services.
            </small>
            <h2>Accounts and membership</h2>
            <small>
              You must be at least 13 years of age to use the Services. By using
              the Services and by agreeing to this Agreement you warrant and
              represent that you are at least 13 years of age. If you create an
              account on the Services, you are responsible for maintaining the
              security of your account and you are fully responsible for all
              activities that occur under the account and any other actions
              taken in connection with it. We may, but have no obligation to,
              monitor and review new accounts before you may sign in and start
              using the Services. Providing false contact information of any
              kind may result in the termination of your account. You must
              immediately notify us of any unauthorized uses of your account or
              any other breaches of security. We will not be liable for any acts
              or omissions by you, including any damages of any kind incurred as
              a result of such acts or omissions. We may suspend, disable, or
              delete your account (or any part thereof) if we determine that you
              have violated any provision of this Agreement or that your conduct
              or content would tend to damage our reputation and goodwill. If we
              delete your account for the foregoing reasons, you may not
              re-register for our Services. We may block your email address and
              Internet protocol address to prevent further registration.
            </small>
            <h2>User content</h2>
            <small>
              We do not own any data, information or material (collectively,
              “Content”) that you submit on the Services in the course of using
              the Service. You shall have sole responsibility for the accuracy,
              quality, integrity, legality, reliability, appropriateness, and
              intellectual property ownership or right to use of all submitted
              Content. We may, but have no obligation to, monitor and review the
              Content on the Services submitted or created using our Services by
              you. You grant us permission to access, copy, distribute, store,
              transmit, reformat, display and perform the Content of your user
              account solely as required for the purpose of providing the
              Services to you. Without limiting any of those representations or
              warranties, we have the right, though not the obligation, to, in
              our own sole discretion, refuse or remove any Content that, in our
              reasonable opinion, violates any of our policies or is in any way
              harmful or objectionable. You also grant us the license to use,
              reproduce, adapt, modify, publish or distribute the Content
              created by you or stored in your user account for commercial,
              marketing or any similar purpose.
            </small>
            <h2>Adult content</h2>
            <small>
              Please be aware that there may be certain adult or mature content
              available on the Services. Where there is mature or adult content,
              individuals who are less than 18 years of age or are not permitted
              to access such content under the laws of any applicable
              jurisdiction may not access such content. If we learn that anyone
              under the age of 18 seeks to conduct a transaction through the
              Services, we will require verified parental consent, in accordance
              with the Children’s Online Privacy Protection Act of 1998
              (“COPPA”). Certain areas of the Services may not be available to
              children under 18 under any circumstances.
            </small>
            <h2>c</h2>
            <small>
              You shall pay all fees or charges to your account in accordance
              with the fees, charges, and billing terms in effect at the time a
              fee or charge is due and payable. If, in our judgment, your
              purchase constitutes a high-risk transaction, we will require you
              to provide us with a copy of your valid government-issued photo
              identification, and possibly a copy of a recent bank statement for
              the credit or debit card used for the purchase. We reserve the
              right to change products and product pricing at any time.
            </small>
            <h2>Accuracy of information</h2>
            <small>
              Occasionally there may be information on the Services that
              contains typographical errors, inaccuracies or omissions that may
              relate to pricing, promotions and offers. We reserve the right to
              correct any errors, inaccuracies or omissions, and to change or
              update information or cancel orders if any information on the
              Services or Services is inaccurate at any time without prior
              notice (including after you have submitted your order). We
              undertake no obligation to update, amend or clarify information on
              the Services including, without limitation, pricing information,
              except as required by law. No specified update or refresh date
              applied on the Services should be taken to indicate that all
              information on the Services or Services has been modified or
              updated.
            </small>
            <h2>Third party services</h2>
            <small>
              If you decide to enable, access or use third party services, be
              advised that your access and use of such other services are
              governed solely by the terms and conditions of such other
              services, and we do not endorse, are not responsible or liable
              for, and make no representations as to any aspect of such other
              services, including, without limitation, their content or the
              manner in which they handle data (including your data) or any
              interaction between you and the provider of such other services.
              You irrevocably waive any claim against Bliiink with respect to
              such other services. Bliiink is not liable for any damage or loss
              caused or alleged to be caused by or in connection with your
              enablement, access or use of any such other services, or your
              reliance on the privacy practices, data security processes or
              other policies of such other services. You may be required to
              register for or log into such other services on their respective
              platforms. By enabling any other services, you are expressly
              permitting Bliiink to disclose your data as necessary to
              facilitate the use or enablement of such other service.
            </small>
            <h2>Uptime guarantee</h2>
            <small>
              We offer a Service uptime guarantee of 99% of available time per
              month. The service uptime guarantee does not apply to service
              interruptions caused by: (1) periodic scheduled maintenance or
              repairs we may undertake from time to time; (2) interruptions
              caused by you or your activities; (3) outages that do not affect
              core Service functionality; (4) causes beyond our control or that
              are not reasonably foreseeable; and (5) outages related to the
              reliability of certain programming environments.
            </small>
            <h2>Backups</h2>
            <small>
              We are not responsible for the Content residing on the Services.
              In no event shall we be held liable for any loss of any Content.
              It is your sole responsibility to maintain appropriate backup of
              your Content. Notwithstanding the foregoing, on some occasions and
              in certain circumstances, with absolutely no obligation, we may be
              able to restore some or all of your data that has been deleted as
              of a certain date and time when we may have backed up data for our
              own purposes. We make no guarantee that the data you need will be
              available.
            </small>
            <h2>Advertisements</h2>
            <small>
              During your use of the Services, you may enter into correspondence
              with or participate in promotions of advertisers or sponsors
              showing their goods or services through the Services. Any such
              activity, and any terms, conditions, warranties or representations
              associated with such activity, is solely between you and the
              applicable third party. We shall have no liability, obligation or
              responsibility for any such correspondence, purchase or promotion
              between you and any such third party.
            </small>
            <h2>Links to other resources</h2>
            <small>
              Although the Services may link to other resources (such as
              websites, mobile applications, etc.), we are not, directly or
              indirectly, implying any approval, association, sponsorship,
              endorsement, or affiliation with any linked resource, unless
              specifically stated herein. Some of the links on the Services may
              be “affiliate links”. This means if you click on the link and
              purchase an item, Bliiink will receive an affiliate commission. We
              are not responsible for examining or evaluating, and we do not
              warrant the offerings of, any businesses or individuals or the
              content of their resources. We do not assume any responsibility or
              liability for the actions, products, services, and content of any
              other third parties. You should carefully review the legal
              statements and other conditions of use of any resource which you
              access through a link on the Services. Your linking to any other
              off-site resources is at your own risk.
            </small>
            <h2>Prohibited uses</h2>
            <small>
              In addition to other terms as set forth in the Agreement, you are
              prohibited from using the Services or Content: (a) for any
              unlawful purpose; (b) to solicit others to perform or participate
              in any unlawful acts; (c) to violate any international, federal,
              provincial or state regulations, rules, laws, or local ordinances;
              (d) to infringe upon or violate our intellectual property rights
              or the intellectual property rights of others; (e) to harass,
              abuse, insult, harm, defame, slander, disparage, intimidate, or
              discriminate based on gender, sexual orientation, religion,
              ethnicity, race, age, national origin, or disability; (f) to
              submit false or misleading information; (g) to upload or transmit
              viruses or any other type of malicious code that will or may be
              used in any way that will affect the functionality or operation of
              the Services, third party products and services, or the Internet;
              (h) to spam, phish, pharm, pretext, spider, crawl, or scrape; (i)
              for any obscene or immoral purpose; or (j) to interfere with or
              circumvent the security features of the Services, third party
              products and services, or the Internet. We reserve the right to
              terminate your use of the Services for violating any of the
              prohibited uses.
            </small>
            <h2>Intellectual property rights</h2>
            <small>
              “Intellectual Property Rights” means all present and future rights
              conferred by statute, common law or equity in or in relation to
              any copyright and related rights, trademarks, designs, patents,
              inventions, goodwill and the right to sue for passing off, rights
              to inventions, rights to use, and all other intellectual property
              rights, in each case whether registered or unregistered and
              including all applications and rights to apply for and be granted,
              rights to claim priority from, such rights and all similar or
              equivalent rights or forms of protection and any other results of
              intellectual activity which subsist or will subsist now or in the
              future in any part of the world. This Agreement does not transfer
              to you any intellectual property owned by Bliiink or third
              parties, and all rights, titles, and interests in and to such
              property will remain (as between the parties) solely with Bliiink.
              All trademarks, service marks, graphics and logos used in
              connection with the Services, are trademarks or registered
              trademarks of Bliiink or its licensors. Other trademarks, service
              marks, graphics and logos used in connection with the Services may
              be the trademarks of other third parties. Your use of the Services
              grants you no right or license to reproduce or otherwise use any
              of Bliiink or third party trademarks.
            </small>
            <h2>Disclaimer of warranty</h2>
            <small>
              You agree that such Service is provided on an “as is” and “as
              available” basis and that your use of the Services is solely at
              your own risk. We expressly disclaim all warranties of any kind,
              whether express or implied, including but not limited to the
              implied warranties of merchantability, fitness for a particular
              purpose and non-infringement. We make no warranty that the
              Services will meet your requirements, or that the Service will be
              uninterrupted, timely, secure, or error-free; nor do we make any
              warranty as to the results that may be obtained from the use of
              the Service or as to the accuracy or reliability of any
              information obtained through the Service or that defects in the
              Service will be corrected. You understand and agree that any
              material and/or data downloaded or otherwise obtained through the
              use of Service is done at your own discretion and risk and that
              you will be solely responsible for any damage or loss of data that
              results from the download of such material and/or data. We make no
              warranty regarding any goods or services purchased or obtained
              through the Service or any transactions entered into through the
              Service unless stated otherwise. No advice or information, whether
              oral or written, obtained by you from us or through the Service
              shall create any warranty not expressly made herein.
            </small>
            <h2>Limitation of liability</h2>
            <small>
              To the fullest extent permitted by applicable law, in no event
              will Bliiink, its affiliates, directors, officers, employees,
              agents, suppliers or licensors be liable to any person for any
              indirect, incidental, special, punitive, cover or consequential
              damages (including, without limitation, damages for lost profits,
              revenue, sales, goodwill, use of content, impact on business,
              business interruption, loss of anticipated savings, loss of
              business opportunity) however caused, under any theory of
              liability, including, without limitation, contract, tort,
              warranty, breach of statutory duty, negligence or otherwise, even
              if the liable party has been advised as to the possibility of such
              damages or could have foreseen such damages. To the maximum extent
              permitted by applicable law, the aggregate liability of Bliiink
              and its affiliates, officers, employees, agents, suppliers and
              licensors relating to the services will be limited to an amount
              greater of one pound or any amounts actually paid in cash by you
              to Bliiink for the prior one month period prior to the first event
              or occurrence giving rise to such liability. The limitations and
              exclusions also apply if this remedy does not fully compensate you
              for any losses or fails of its essential purpose.
            </small>
            <h2>Indemnification</h2>
            <small>
              You agree to indemnify and hold Bliiink and its affiliates,
              directors, officers, employees, agents, suppliers and licensors
              harmless from and against any liabilities, losses, damages or
              costs, including reasonable attorneys’ fees, incurred in
              connection with or arising from any third party allegations,
              claims, actions, disputes, or demands asserted against any of them
              as a result of or relating to your Content, your use of the
              Services or any willful misconduct on your part.
            </small>
            <h2>Severability</h2>
            <small>
              All rights and restrictions contained in this Agreement may be
              exercised and shall be applicable and binding only to the extent
              that they do not violate any applicable laws and are intended to
              be limited to the extent necessary so that they will not render
              this Agreement illegal, invalid or unenforceable. If any provision
              or portion of any provision of this Agreement shall be held to be
              illegal, invalid or unenforceable by a court of competent
              jurisdiction, it is the intention of the parties that the
              remaining provisions or portions thereof shall constitute their
              agreement with respect to the subject matter hereof, and all such
              remaining provisions or portions thereof shall remain in full
              force and effect.
            </small>
            <h2>Dispute resolution</h2>
            <small>
              The formation, interpretation, and performance of this Agreement
              and any disputes arising out of it shall be governed by the
              substantive and procedural laws of United Kingdom without regard
              to its rules on conflicts or choice of law and, to the extent
              applicable, the laws of United Kingdom. The exclusive jurisdiction
              and venue for actions related to the subject matter hereof shall
              be the courts located in United Kingdom, and you hereby submit to
              the personal jurisdiction of such courts. You hereby waive any
              right to a jury trial in any proceeding arising out of or related
              to this Agreement. The United Nations Convention on Contracts for
              the International Sale of Goods does not apply to this Agreement.
            </small>
            <h2>Assignment</h2>
            <small>
              You may not assign, resell, sub-license or otherwise transfer or
              delegate any of your rights or obligations hereunder, in whole or
              in part, without our prior written consent, which consent shall be
              at our own sole discretion and without obligation; any such
              assignment or transfer shall be null and void. We are free to
              assign any of its rights or obligations hereunder, in whole or in
              part, to any third party as part of the sale of all or
              substantially all of its assets or stock or as part of a merger.
            </small>
            <h2>Changes and amendments</h2>
            <small>
              We reserve the right to modify this Agreement or its terms related
              to the Services at any time at our discretion. When we do, we will
              revise the updated date at the bottom of this page. We may also
              provide notice to you in other ways at our discretion, such as
              through the contact information you have provided.
            </small>
            <small>
              An updated version of this Agreement will be effective immediately
              upon the posting of the revised Agreement unless otherwise
              specified. Your continued use of the Services after the effective
              date of the revised Agreement (or such other act specified at that
              time) will constitute your consent to those changes.
            </small>
            <h2>Acceptance of these terms</h2>
            <small>
              You acknowledge that you have read this Agreement and agree to all
              its terms and conditions. By accessing and using the Services you
              agree to be bound by this Agreement. If you do not agree to abide
              by the terms of this Agreement, you are not authorized to access
              or use the Services.
            </small>
            <h2>Contacting us</h2>
            <small>
              If you have any questions, concerns, or complaints regarding this
              Agreement, we encourage you to contact us using the details below:
            </small>
            <small>info@bliiink.co.uk</small>
            <small>This document was last updated on February 21, 2021</small>
          </article>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

Register.propTypes = {
  registerRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    registerRequest: data => dispatch(registerReq(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Register);
