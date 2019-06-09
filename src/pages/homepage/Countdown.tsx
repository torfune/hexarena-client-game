import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Heading from './Heading'
import React from 'react'

const Container = styled.div``

const CountdownTime = styled.p`
  color: #fff;
  font-size: 40px;
  font-weight: 700;
`

const OpeningTime = styled.p`
  font-size: 19px;
  color: #aaa;
  font-weight: 600;
  margin-top: 8px;
`

let interval: NodeJS.Timeout | null = null

interface Props {
  openingTime: number
}
const Countdown: React.FC<Props> = ({ openingTime }) => {
  const [remainingDate, setRemainingDate] = useState<Date | null>(null)

  useEffect(() => {
    interval = setInterval(updateCountdown, 100)

    return () => {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }
  }, [])

  const openingDate = new Date(openingTime)
  if (openingDate.getSeconds() > 50) {
    openingDate.setHours(openingDate.getHours() + 1, 0, 0)
  }

  const updateCountdown = () => {
    const remainingTime = openingTime - Date.now()

    if (remainingTime < 0) {
      setRemainingDate(null)
      if (interval) {
        clearInterval(interval)
        interval = null
      }
      window.location.reload()
    } else {
      setRemainingDate(new Date(remainingTime))
    }
  }

  if (!remainingDate) return null

  return (
    <Container>
      <Heading>
        <span>Alpha</span> test starts in
      </Heading>

      <CountdownTime>
        {remainingDate.getUTCDate() - 1}:
        {String(remainingDate.getUTCHours()).padStart(2, '0')}:
        {String(remainingDate.getUTCMinutes()).padStart(2, '0')}:
        {String(remainingDate.getUTCSeconds()).padStart(2, '0')}
      </CountdownTime>

      <OpeningTime>{openingDate.toLocaleString()}</OpeningTime>
    </Container>
  )
}

export default Countdown
