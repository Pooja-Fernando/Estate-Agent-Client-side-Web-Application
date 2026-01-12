import PropTypes from 'prop-types';
import SearchPage from '../SearchPage';
import FavouritesSidebar from '../FavouritesSidebar';

const HomePage = ({
  filters,
  onFilterChange,
  onSearch,
  results,
  onPropertyClick,
  onAddToFavourites,
  onDragStart,
  onDragOver,
  onDrop,
  onDropToRemove,
  onClearFavourites,
  onRemoveFromFavourites,
  favourites
}) => (
  <div className="app-layout">
    <SearchPage
      filters={filters}
      onFilterChange={onFilterChange}
      onSearch={onSearch}
      results={results}
      onPropertyClick={onPropertyClick}
      onAddToFavourites={onAddToFavourites}
      onDragStart={onDragStart}
    />

    <FavouritesSidebar
      favourites={favourites}
      onRemove={onRemoveFromFavourites}
      onClear={onClearFavourites}
      onPropertyClick={onPropertyClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDropToRemove={onDropToRemove}
      onDragStart={onDragStart}
    />
  </div>
);

HomePage.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  onPropertyClick: PropTypes.func.isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDropToRemove: PropTypes.func.isRequired,
  onClearFavourites: PropTypes.func.isRequired,
  onRemoveFromFavourites: PropTypes.func.isRequired,
  favourites: PropTypes.array.isRequired
};

export default HomePage;
