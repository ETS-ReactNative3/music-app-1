// ** React Imports
import React, {useState} from 'react'

// ** Third Party Components
import Proptypes from 'prop-types'
import {Card, Accordion} from "react-bootstrap";
// import { ChevronUp } from 'react-feather'
// import { Collapse, Card, CardHeader, CardBody, CardTitle } from 'reactstrap'

const AppCollapse = props => {
  // ** Props
  const {data, type, accordion, active, toggle, titleKey, contentKey, className} = props

  // ** Function to render collapse
  const renderData = () => {
    return data.map((item, index) => {
      const title = titleKey ? item[titleKey] : item.title,
        content = contentKey ? item[contentKey] : item.content

      return (
        <Accordion>
          <Card key={title}>
            <Accordion.Toggle as={Card.Header} eventKey={title}>
              <Card.Title className='collapse-title'>{title}</Card.Title>
            </Accordion.Toggle>
            {/*<ChevronUp size={14} />*/}
            <Accordion.Collapse eventKey={title}>
              <Card.Body>
                <div dangerouslySetInnerHTML={{__html: content}} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )
    })
  }

  return (
    <div>
      {renderData()}
    </div>
  )
}

export default AppCollapse

// ** PropTypes
AppCollapse.propTypes = {
  data: Proptypes.array.isRequired,
  accordion: Proptypes.bool,
  type: Proptypes.oneOf(['shadow', 'border', 'margin']),
  active: Proptypes.oneOfType([Proptypes.array, Proptypes.number]),
  titleKey: Proptypes.string,
  contentKey: Proptypes.string,
  className: Proptypes.string
}

// ** Default Props
AppCollapse.defaultProps = {
  active: [],
  toggle: 'click'
}
