import React, { useState, useEffect } from 'react'
import styled, { ThemeConsumer } from 'styled-components'
import Label from './Label'
import { Doughnut } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import { observer } from 'mobx-react-lite'
import store from '../../../../store'

const Container = styled.div``

const ChartWrapper = styled.div`
  margin-top: 16px;
`

const OPTIONS: ChartOptions = {
  legend: {
    position: 'right',
    labels: {
      fontFamily: 'Montserrat',
      usePointStyle: true,
      fontSize: 14,
      fontColor: '#000',
      fontStyle: '500',
      padding: 8,
    },
  },
}

const Chart = () => {
  const [data, setData] = useState<ChartData | null>(null)

  useEffect(() => {
    const data: ChartData = {
      labels: store.players.map(p => p.name),
      datasets: [
        {
          data: store.players.map(p => p.houses),
          backgroundColor: store.players.map(p => p.pattern),
          borderWidth: 4,
        },
      ],
    }

    setData(data)
  }, [store.economy])

  if (!data) return null

  return (
    <Container>
      <Label>Economy overview</Label>

      <ChartWrapper>
        <Doughnut data={data} options={OPTIONS} height={140} width={300} />
      </ChartWrapper>
    </Container>
  )
}

export default observer(Chart)