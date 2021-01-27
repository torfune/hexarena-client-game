// import styled from 'styled-components'
// import { History } from 'history'
// import React, { useEffect, useState } from 'react'
// import { observer } from 'mobx-react-lite'
// import Header from '../Header'
// import store from '../../store'
// import { CHAT_WIDTH, PRIMARY, BREAKPOINT } from '../../constants/react'
// import Leaderboard from '../hud/Leaderboard'
// import HoverPreview from '../hud/HoverPreview'
// import EndScreen from '../screens/EndScreen'
// import GameTime from '../hud/GameTime'
// import Economy from '../hud/Economy'
// import Socket from '../../core/websockets/Socket'
// import shadeColor from '../../utils/shade'
// import Spectators from '../hud/Spectators'
//
// const Container = styled.div`
//   width: calc(100vw - ${CHAT_WIDTH});
//   height: 100vh;
//   overflow: hidden;
//
//   @media (max-width: ${BREAKPOINT.HIDE_CHAT}) {
//     width: 100vw;
//   }
// `
//
// const InfoContainer = styled.div`
//   margin-top: 160px;
//   color: #fff;
//   text-align: center;
//
//   h2 {
//     font-size: 30px;
//     font-weight: 500;
//   }
//
//   button {
//     display: flex;
//     background: ${PRIMARY};
//     color: #fff;
//     font-weight: 500;
//     font-size: 20px;
//     align-items: center;
//     justify-content: center;
//     border-radius: 4px;
//     transition: 200ms;
//     width: 200px;
//     height: 45px;
//     text-align: center;
//     border: 2px solid ${shadeColor(PRIMARY, -20)};
//     margin: 64px auto;
//
//     :hover {
//       transform: scale(1.05);
//     }
//   }
// `
//
// let timeout: NodeJS.Timeout | null = null
//
// const SpectatePage = observer(() => {
//   const [loading, setLoading] = useState(true)
//
//   store.routerHistory = history
//
//   useEffect(() => {
//     if (!store.spectating) {
//       const { gameId } = qs.parse(window.) window.location.href.split('?game=')[1]
//       store.socket.send('spectate', gameId)
//     }
//
//     timeout = setTimeout(() => {
//       setLoading(false)
//       timeout = null
//     }, 500)
//
//     return () => {
//       if (timeout) {
//         clearTimeout(timeout)
//         timeout = null
//       }
//     }
//   }, [])
//
//   useEffect(() => {
//     if (store.game) {
//       const canvas = document.getElementById('game-canvas')
//       if (!canvas) throw Error('Cannot find canvas.')
//       store.game.render(canvas)
//     }
//   }, [store.game])
//
//   return (
//     <>
//       <Header />
//       <Container>
//         <div id="game-canvas" />
//
//         {store.game && (
//           <>
//             <GameTime />
//             <HoverPreview />
//             <Spectators />
//             <Leaderboard />
//             <Economy />
//
//             {store.game.status === 'finished' && <EndScreen />}
//           </>
//         )}
//       </Container>
//     </>
//   )
// })
//
// export default SpectatePage

export {}