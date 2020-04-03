import React from 'react';
import './App.css';
import Users from '../Users/Users';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Welcome to the app
      </header>
      <section className="container">
        <Users name="Pei" />
      </section>
      
    </div>
  );
}

export default App;
