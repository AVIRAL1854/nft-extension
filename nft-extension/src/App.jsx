import { useState } from 'react'
import SearchBar from './Components/SearchBar'
import './App.css';
import ListCollections from './Components/ListCollection';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-white bg-black customSize">
      <section>
        <SearchBar text={"text"} />
      </section>
      <section className="bg-black ">
        <ListCollections />
      </section>
    </div>
  );
}

export default App
