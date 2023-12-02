// Install dependencies
// npm install axios react react-dom react-scripts

// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the Punk API
    axios.get('https://api.punkapi.com/v2/beers')
      .then(response => setBeers(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter(beer =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search by beer name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredBeers.map(beer => (
          <div key={beer.id} style={{ width: '300px', margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <img src={beer.image_url} alt={beer.name} style={{ maxWidth: '100%', height: 'auto' }} />
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
