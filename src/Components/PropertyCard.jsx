import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Bed, Calendar } from 'lucide-react';
import './styles/PropertyCard.css';

const PropertyCard = ({ property, onClick, onAddToFavourites, onDragStart }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (typeof onClick === 'function') onClick();
    navigate(`/property/${property.id}`);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="property-card"
    >
      <img
        src={property.images[0]}
        alt={property.shortDesc}
        className="property-card-image"
      />
      <div className="property-card-content">
        <div className="property-card-header">
          <h3 className="property-price">£{property.price.toLocaleString()}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToFavourites();
            }}
            className="property-favourite-btn"
            title="Add to favourites"
          >
            <Heart size={24} />
          </button>
        </div>
        
        <p className="property-description">{property.shortDesc}</p>
        
        <div className="property-details">
          <div className="property-detail-item">
            <Bed size={16} />
            <span>{property.bedrooms} bed</span>
          </div>
          <div className="property-detail-item">
            <MapPin size={16} />
            <span>{property.location}</span>
          </div>
          <div className="property-detail-item">
            <Calendar size={16} />
            <span>{new Date(property.dateAdded).toLocaleDateString()}</span>
          </div>
        </div>
        
        <button
          onClick={handleViewDetails}
          className="property-details-btn"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired,
    shortDesc: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  onAddToFavourites: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
};

export default PropertyCard;
