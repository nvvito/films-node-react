import React from 'react'
import { Provider } from 'react-redux'
//router
import Router from './components/router'
//store
import store from './store/store'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App