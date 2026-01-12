import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'lucide-react';
import HomePage from './components/pages/HomePage';
import PropertyDetailPage from './components/pages/PropertyDetailPage';
import { propertiesData } from './data/propertiesData';
import './App.css';

const App = () => {
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: '',
    dateTo: ''
  });

  const [results, setResults] = useState(propertiesData);
  const [favourites, setFavourites] = useState([]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    let filtered = propertiesData;

    if (filters.type !== 'any') {
      filtered = filtered.filter(p => p.type === filters.type);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
    }

    if (filters.minBedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.minBedrooms));
    }

    if (filters.maxBedrooms) {
      filtered = filtered.filter(p => p.bedrooms <= parseInt(filters.maxBedrooms));
    }

    if (filters.postcode) {
      filtered = filtered.filter(p => p.postcode.includes(filters.postcode.toUpperCase()));
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(p => new Date(p.dateAdded) >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      filtered = filtered.filter(p => new Date(p.dateAdded) <= toDate);
    }

    setResults(filtered);
  };

  const handleAddToFavourites = (property) => {
    setFavourites(prev => {
      const exists = prev.find(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      }
      return [...prev, property];
    });
  };

  const handleRemoveFromFavourites = (propertyId) => {
    setFavourites(prev => prev.filter(p => p.id !== propertyId));
  };

  const handleClearFavourites = () => {
    setFavourites([]);
  };

  const handleDragStart = (e, property) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('property', JSON.stringify(property));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const propertyData = e.dataTransfer.getData('property');
    if (propertyData) {
      const property = JSON.parse(propertyData);
      handleAddToFavourites(property);
    }
  };

  const handleDropToRemove = (e) => {
    e.preventDefault();
    const propertyData = e.dataTransfer.getData('property');
    if (propertyData) {
      const property = JSON.parse(propertyData);
      handleRemoveFromFavourites(property.id);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <Home size={32} />
            <h1>Estate Agent SPA</h1>
          </div>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                results={results}
                onPropertyClick={() => {}}
                onAddToFavourites={handleAddToFavourites}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDropToRemove={handleDropToRemove}
                onClearFavourites={handleClearFavourites}
                onRemoveFromFavourites={handleRemoveFromFavourites}
                favourites={favourites}
              />
            }
          />
          <Route
            path="/property/:id"
            element={
              <PropertyDetailPage
                favourites={favourites}
                onAddToFavourites={handleAddToFavourites}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
