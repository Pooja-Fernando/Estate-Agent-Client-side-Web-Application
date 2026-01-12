import { useState } from 'react';
import PropTypes from 'prop-types';
import { Heart, Trash2, X } from 'lucide-react';
import './styles/FavouritesSidebar.css';

const FavouritesSidebar = ({ favourites, onRemove, onClear, onPropertyClick, onDragOver, onDrop, onDropToRemove, onDragStart }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <div className="favourites-sidebar">
      <div
        className={`favourites-container ${isDraggingOver ? 'dragging-over' : ''}`}
        onDragOver={(e) => {
          onDragOver(e);
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          onDrop(e);
          setIsDraggingOver(false);
        }}
      >
        <div className="favourites-header">
          <h3 className="favourites-title">
            <Heart className="favourites-icon" size={24} />
            Favourites ({favourites.length})
          </h3>
          {favourites.length > 0 && (
            <button
              onClick={onClear}
              className="favourites-clear-btn"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        {favourites.length === 0 ? (
          <p className="favourites-empty">Drag properties here to save them as favourites</p>
        ) : (
          <div className="favourites-list">
            {favourites.map(property => (
              <div
                key={property.id}
                draggable
                onDragStart={(e) => onDragStart(e, property)}
                className="favourites-item"
                onClick={() => onPropertyClick(property)}
              >
                <div className="favourites-item-content">
                  <img
                    src={property.images[0]}
                    alt={property.shortDesc}
                    className="favourites-item-image"
                  />
                  <div className="favourites-item-info">
                    <p className="favourites-item-price">£{property.price.toLocaleString()}</p>
                    <p className="favourites-item-location">{property.location}</p>
                    <p className="favourites-item-type">{property.bedrooms} bed {property.type}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(property.id);
                  }}
                  className="favourites-item-remove"
                >
                  <X size={14} />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Drop zone for removal */}
        <div
          className="favourites-drop-zone"
          onDragOver={onDragOver}
          onDrop={onDropToRemove}
        >
          Drag here to remove from favourites
        </div>
      </div>
    </div>
  );
};

FavouritesSidebar.propTypes = {
  favourites: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onPropertyClick: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onDropToRemove: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default FavouritesSidebar;
