import styled from 'styled-components'
import { PRIMARY } from '../../constants/react'

const Heading: React.FC = styled.h3`
  font-size: 26px;
  font-weight: 400;
  margin-bottom: 8px;
  color: #fff;

  span {
    color: ${PRIMARY};
    font-weight: 500;
  }
`

export default Heading