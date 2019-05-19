import styled from 'styled-components'

const Container = styled.div`
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 12px;
`

const Structure = styled.div`
  font-size: 16px;
  font-style: italic;
`

interface Props {
  structure: string
}

const StructurePreview: React.FC<Props> = ({ structure }) => (
  <Container>
    <Structure>{structure}</Structure>
  </Container>
)

export default StructurePreview
