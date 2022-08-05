import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import 'styles/core.scss'
import Layout from 'containers/Layout'

import Home from 'pages/Home'
import AppHome from 'pages/AppHome'
import Dragondrop from 'pages/Dragondrop'
import Eggsale from 'pages/Eggsale'
import Inventory from 'pages/Inventory'
import Hatching from 'pages/Hatching'
import Stake from 'pages/Stake'
import Market from 'pages/Market'
// import { BuyDragon } from 'pages/Market'
// import { BuyEgg } from 'pages/Market'

const routes = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/app" component={AppHome} />
        <Route exact path="/eggsale" component={Eggsale} />
        <Route exact path="/inventory" component={Inventory} />
        <Route exact path="/hatching" component={Hatching} />
        <Route exact path="/stake" component={Stake} />
        <Route exact path="/market" component={Market} />
        {/* <Route exact path="/buy-dragon" component={BuyDragon} />
        <Route exact path="/buy-egg" component={BuyEgg} /> */}
        <Route exact path="/dragondrop" component={Dragondrop} />
        <Redirect to="/" />
      </Switch>
    </Layout>
  </Router>
)

export default routes
