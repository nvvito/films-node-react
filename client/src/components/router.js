import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
//menu
import Menu from './menu'
//pages
import Page404 from '../pages/404'
import Films from '../pages/films'
import Film from '../pages/film'
import Add from '../pages/add'
import Import from '../pages/import'

const PageRouter = () =>
  <Router>
    <Menu />
    <Switch>
      <Route exact path="/" component={Films} />
      <Route exact path="/import" component={Import} />
      <Route exact path="/add" component={Add} />
      <Route exact path="/:id" component={Film} />
      <Route component={Page404} />
    </Switch>
  </Router>
  
export default PageRouter
