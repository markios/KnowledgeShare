import React from 'react';
import './App.css';
import Users from '../Users/Users';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../store/reducers'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          Welcome to the app
        </header>
        <section className="container">
          <Users name="Pei" />
        </section>
      </div>
    </Provider>
  );
}

export default App;
