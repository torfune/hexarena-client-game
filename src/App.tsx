import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GameComponent from './components/GameComponent'
import GlobalStyle from './components/GlobalStyle'
import PageNotFound from './components/PageNotFound'

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/play">
            <GameComponent spectate={false} />
          </Route>
          <Route path="/spectate">
            <GameComponent spectate={true} />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
