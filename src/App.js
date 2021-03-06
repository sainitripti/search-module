import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Header';
import SearchForm from './SearchForm';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <SearchForm></SearchForm>
    </div>
  );
}

export default App;
