import React, { useState } from 'react';
import { Heart, Trash2, X } from 'lucide-react';
import DOMPurify from 'dompurify';
import '../styles/FavouritesSidebar.css';

/**
 * FavouritesSidebar Component
 * Displays favourited properties with drag and drop functionality
 */
const FavouritesSidebar = ({
  favourites,
  onRemove,
  onClear,
  onPropertyClick,
  onDragOver,
  onDrop,
  onDropToRemove,
  onDragStart
}) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Sanitize text content
  const sanitizeText = (text) => {
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  };

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
            <Heart className="heart-icon" size={24} />
            Favourites ({favourites.length})
          </h3>
          {favourites.length > 0 && (
            <button
              onClick={onClear}
              className="clear-button"
              aria-label="Clear all favourites"
            >
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>

        {favourites.length === 0 ? (
          <p className="empty-message">
            Drag properties here to save them as favourites
          </p>
        ) : (
          <div className="favourites-list">
            {favourites.map(property => (
              <div
                key={property.id}
                draggable
                onDragStart={(e) => onDragStart(e, property)}
                className="favourite-item"
                onClick={() => onPropertyClick(property)}
              >
                <div className="favourite-content">
                  <img
                    src={property.images[0]}
                    alt={sanitizeText(property.shortDesc)}
                    className="favourite-image"
                  />
                  <div className="favourite-info">
                    <p className="favourite-price">
                      £{property.price.toLocaleString()}
                    </p>
                    <p className="favourite-location">
                      {sanitizeText(property.location)}
                    </p>
                    <p className="favourite-details">
                      {property.bedrooms} bed {property.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(property.id);
                  }}
                  className="remove-button"
                  aria-label="Remove from favourites"
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
          className="removal-zone"
          onDragOver={onDragOver}
          onDrop={onDropToRemove}
        >
          Drag here to remove from favourites
        </div>
      </div>
    </div>
  );
};

export default FavouritesSidebar;