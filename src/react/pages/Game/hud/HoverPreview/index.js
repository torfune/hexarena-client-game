import React from 'react'
import styled from 'styled-components'
import ActionPreview from './ActionPreview'
import StructurePreview from './StructurePreview'
import store from '../../../../../store'
import getHoveredTileInfo from '../../../../../game/functions/getHoveredTileInfo'
import { observer } from 'mobx-react-lite'

const Container = styled.div.attrs(({ x, y }) => ({
  style: {
    left: `${x}px`,
    top: `${y}px`,
  },
}))`
  padding-top: 8px;
  border-radius: 8px;
  border-top-left-radius: 0;
  background: #fff;
  position: absolute;
  user-select: none;
  box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`

const HoveredTileinfo = () => {
  const { hoveredTile } = store

  const [cursor, setCursor] = React.useState({ x: 0, y: 0 })
  const [hoveredTileInfo, setHoveredTileInfo] = React.useState(null)

  const handleMouseMove = ({ clientX, clientY }) => {
    setCursor({ x: clientX + 12, y: clientY + 12 })
  }

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  })

  React.useEffect(() => {
    setHoveredTileInfo(getHoveredTileInfo(hoveredTile))
  }, [hoveredTile])

  if (!hoveredTileInfo) return null

  return (
    <Container x={cursor.x} y={cursor.y}>
      {hoveredTileInfo.label ? (
        <ActionPreview {...hoveredTileInfo} />
      ) : (
        <StructurePreview structure={hoveredTileInfo.structure} />
      )}
    </Container>
  )
}

export default observer(HoveredTileinfo)
