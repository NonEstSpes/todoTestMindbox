import React from 'react';
import './App.css';
import {ListTodo} from "./components/listTodo";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <ListTodo />
      </header>
    </div>
  );
}

export default App;
