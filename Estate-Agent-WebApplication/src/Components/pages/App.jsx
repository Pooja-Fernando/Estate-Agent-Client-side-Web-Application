import React, { useState } from 'react';
import SearchPage from './components/SearchPage';
import PropertyDetail from './components/PropertyDetail';
import FavouritesSidebar from './components/FavouritesSidebar';
import Header from './components/Header';
import { propertiesData } from './data/properties';
import './styles/App.css';

/**
 * Main Application Component
 * Manages the overall state and routing for the Estate Agent application
 */
const App = () => {
  // View management
  const [view, setView] = useState('search');
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Favourites management
  const [favourites, setFavourites] = useState([]);

  // Search results
  const [searchResults, setSearchResults] = useState(propertiesData);

  // Drag and drop state
  const [draggedProperty, setDraggedProperty] = useState(null);

  // Search criteria state
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: ''
  });

  /**
   * Handle filter changes from search form
   */
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Search function - filters properties based on multiple criteria
   */
  const handleSearch = (e) => {
    e.preventDefault();

    let results = propertiesData.filter(property => {
      // Type filter
      if (filters.type !== 'any' && property.type !== filters.type) return false;

      // Price filters
      if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;

      // Bedroom filters
      if (filters.minBedrooms && property.bedrooms < Number(filters.minBedrooms)) return false;
      if (filters.maxBedrooms && property.bedrooms > Number(filters.maxBedrooms)) return false;

      // Date filters
      if (filters.dateFrom && property.dateAdded < filters.dateFrom) return false;
      if (filters.dateTo && property.dateAdded > filters.dateTo) return false;

      // Postcode filter
      if (filters.postcode && !property.postcode.toLowerCase().includes(filters.postcode.toLowerCase())) return false;

      return true;
    });

    setSearchResults(results);
  };

  /**
   * Add property to favourites (prevents duplicates)
   */
  const addToFavourites = (property) => {
    if (!favourites.find(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  /**
   * Remove property from favourites by ID
   */
  const removeFromFavourites = (propertyId) => {
    setFavourites(favourites.filter(fav => fav.id !== propertyId));
  };

  /**
   * Clear all favourites
   */
  const clearFavourites = () => {
    setFavourites([]);
  };

  /**
   * Drag and drop handlers
   */
  const handleDragStart = (e, property) => {
    setDraggedProperty(property);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropToFavourites = (e) => {
    e.preventDefault();
    if (draggedProperty) {
      addToFavourites(draggedProperty);
      setDraggedProperty(null);
    }
  };

  const handleDropToRemove = (e) => {
    e.preventDefault();
    if (draggedProperty) {
      removeFromFavourites(draggedProperty.id);
      setDraggedProperty(null);
    }
  };

  return (
    <div className="app-container">
      <Header view={view} setView={setView} />

      <div className="main-content">
        <div className="content-wrapper">
          {/* Main Content Area */}
          <div className="main-area">
            {view === 'search' && !selectedProperty && (
              <SearchPage
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                results={searchResults}
                onPropertyClick={setSelectedProperty}
                onAddToFavourites={addToFavourites}
                onDragStart={handleDragStart}
                favourites={favourites}
              />
            )}

            {selectedProperty && (
              <PropertyDetail
                property={selectedProperty}
                onClose={() => setSelectedProperty(null)}
                onAddToFavourites={addToFavourites}
                isFavourite={favourites.some(fav => fav.id === selectedProperty.id)}
              />
            )}
          </div>

          {/* Favourites Sidebar */}
          <FavouritesSidebar
            favourites={favourites}
            onRemove={removeFromFavourites}
            onClear={clearFavourites}
            onPropertyClick={setSelectedProperty}
            onDragOver={handleDragOver}
            onDrop={handleDropToFavourites}
            onDropToRemove={handleDropToRemove}
            onDragStart={handleDragStart}
          />
        </div>
      </div>
    </div>
  );
};

export default App;