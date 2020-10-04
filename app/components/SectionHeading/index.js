import styled from 'styled-components';

const SectionHeading = styled.h3`
  font-size: 18px;
  position: relative;
  color: #fff;
  padding: 15px 0;
  display: inline-block;
  margin-bottom: 40px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 500;

  :before,
  :after {
    position: absolute;
    content: '';
    height: 2px;
    bottom: 0;
  }
  :before {
    width: 60%;
    background: #0284cd;
    left: 0;
  }
  :after {
    width: 30%;
    background: #21c583;
    left: 59%;
  }
`;

export default SectionHeading;
