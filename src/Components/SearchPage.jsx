import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import PropertyCard from './PropertyCard';
import './styles/SearchPage.css';

const SearchPage = ({ filters, onFilterChange, onSearch, results, onPropertyClick, onAddToFavourites, onDragStart }) => {
  return (
    <div className="search-page">
      {/* Search Form */}
      <div className="search-form-container">
        <h2 className="search-title">Find Your Perfect Property</h2>
        
        <form onSubmit={onSearch} className="search-form">
          <div className="search-grid">
            {/* Property Type */}
            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select
                value={filters.type}
                onChange={(e) => onFilterChange('type', e.target.value)}
                className="form-input"
              >
                <option value="any">Any</option>
                <option value="house">House</option>
                <option value="flat">Flat</option>
              </select>
            </div>

            {/* Min Price */}
            <div className="form-group">
              <label className="form-label">Min Price (£)</label>
              <input
                type="number"
                value={filters.minPrice}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
                placeholder="No minimum"
                className="form-input"
              />
            </div>

            {/* Max Price */}
            <div className="form-group">
              <label className="form-label">Max Price (£)</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                placeholder="No maximum"
                className="form-input"
              />
            </div>

            {/* Min Bedrooms */}
            <div className="form-group">
              <label className="form-label">Min Bedrooms</label>
              <input
                type="number"
                value={filters.minBedrooms}
                onChange={(e) => onFilterChange('minBedrooms', e.target.value)}
                placeholder="No minimum"
                min="0"
                className="form-input"
              />
            </div>

            {/* Max Bedrooms */}
            <div className="form-group">
              <label className="form-label">Max Bedrooms</label>
              <input
                type="number"
                value={filters.maxBedrooms}
                onChange={(e) => onFilterChange('maxBedrooms', e.target.value)}
                placeholder="No maximum"
                min="0"
                className="form-input"
              />
            </div>

            {/* Postcode */}
            <div className="form-group">
              <label className="form-label">Postcode Area</label>
              <input
                type="text"
                value={filters.postcode}
                onChange={(e) => onFilterChange('postcode', e.target.value)}
                placeholder="e.g., BR1, NW1"
                className="form-input"
              />
            </div>

            {/* Date From */}
            <div className="form-group">
              <label className="form-label">Added After</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => onFilterChange('dateFrom', e.target.value)}
                className="form-input"
              />
            </div>

            {/* Date To */}
            <div className="form-group">
              <label className="form-label">Added Before</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => onFilterChange('dateTo', e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className="search-button"
          >
            <Search size={20} />
            Search Properties
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="results-container">
        <h3 className="results-title">
          {results.length} {results.length === 1 ? 'Property' : 'Properties'} Found
        </h3>
        
        <div className="results-grid">
          {results.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onPropertyClick(property)}
              onAddToFavourites={() => onAddToFavourites(property)}
              onDragStart={(e) => onDragStart(e, property)}
            />
          ))}
        </div>

        {results.length === 0 && (
          <p className="no-results">No properties match your search criteria. Try adjusting your filters.</p>
        )}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  onPropertyClick: PropTypes.func.isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default SearchPage;
