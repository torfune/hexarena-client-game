import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 32px;
`
const CountdownTime = styled.p`
  color: #fff;
  font-size: 40px;
  font-weight: 700;
`

const OpeningTime = styled.p`
  font-size: 19px;
  color: #ccc;
  font-weight: 200;
  margin-top: 18px;
`

const Countdown = ({ time }) => {
  const date = new Date(time)

  let seconds = date.getUTCSeconds()
  let minutes = date.getUTCMinutes()
  let hours = date.getUTCHours()
  let days = date.getUTCDate() - 1

  seconds = String(seconds)
  minutes = String(minutes)
  hours = String(hours)

  const openingDate = new Date(new Date().getTime() + time)

  // const openingDay = openingDate.getDate()
  // const openingMonth = openingDate.getMonth()
  // const openingYear = openingDate.getFullYear()
  // const openingHour = openingDate.getHours()

  // openingDate = new Date(
  //   openingYear,
  //   openingMonth,
  //   openingDay,
  //   openingHour
  // )

  return (
    <Container>
      <CountdownTime>
        {days}:{hours.padStart(2, '0')}:{minutes.padStart(2, '0')}:
        {seconds.padStart(2, '0')}
      </CountdownTime>
      <OpeningTime>
        {openingDate.toLocaleString(navigator.language)}
      </OpeningTime>
    </Container>
  )
}

export default Countdown
