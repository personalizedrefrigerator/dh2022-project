import logo from './logo.svg';
import axios from "axios";
import './App.css';
import { useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  function getData() {
    axios({
      method: "GET",
      url:"/posts",
    })
    .then((response) => {
      const res =response.data
      setData(({
        name: res.name,
        content: res.content,
        tag: res.tag}))
      console.log(data)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Show Data: </p><button onClick={getData}>Click me</button>
          {data && <div>
                <p>Name: {data.name}</p>
                <p>Content: {data.content}</p>
                <p>Tag: {data.tag}</p>
              </div>
          }
      </header>
    </div>
  );
}

export default App;
