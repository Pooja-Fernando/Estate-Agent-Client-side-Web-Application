import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight, X, Heart, Bed, MapPin, Calendar } from 'lucide-react';
import './styles/PropertyDetail.css';

const PropertyDetail = ({ property, onClose, onAddToFavourites, isFavourite }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="property-detail-modal">
      <div className="property-detail-container">
        <div className="property-detail-content">
          {/* Header */}
          <div className="property-detail-header">
            <h2 className="property-detail-title">{property.location}</h2>
            <button onClick={onClose} className="property-detail-close">
              <X size={28} />
            </button>
          </div>

          <div className="property-detail-body">
            {/* Image Gallery */}
            <div className="property-gallery">
              <div className="gallery-main">
                <img
                  src={property.images[currentImageIndex]}
                  alt={`Property ${currentImageIndex + 1}`}
                  className="gallery-image"
                />
                <button
                  onClick={prevImage}
                  className="gallery-nav-btn gallery-nav-prev"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="gallery-nav-btn gallery-nav-next"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="gallery-thumbnails">
                {property.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`gallery-thumbnail ${idx === currentImageIndex ? 'gallery-thumbnail-active' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="property-info">
              <div className="property-price-section">
                <div>
                  <h3 className="property-price-large">£{property.price.toLocaleString()}</h3>
                  <p className="property-short-desc">{property.shortDesc}</p>
                </div>
                <button
                  onClick={onAddToFavourites}
                  className={`property-favourite-btn-large ${isFavourite ? 'favourite-active' : ''}`}
                >
                  <Heart size={24} fill={isFavourite ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className="property-specs">
                <div className="property-spec-item">
                  <Bed size={20} />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="property-spec-item">
                  <MapPin size={20} />
                  <span>{property.postcode}</span>
                </div>
                <div className="property-spec-item">
                  <Calendar size={20} />
                  <span>Added {new Date(property.dateAdded).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="property-tabs">
              <div className="tabs-nav">
                {['description', 'floorplan', 'map'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`tab-button ${activeTab === tab ? 'tab-button-active' : ''}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="tabs-content">
              {activeTab === 'description' && (
                <div>
                  <h4 className="tab-content-title">Property Description</h4>
                  <p className="tab-content-text">{property.longDesc}</p>
                </div>
              )}

              {activeTab === 'floorplan' && (
                <div>
                  <h4 className="tab-content-title">Floor Plan</h4>
                  <img src={property.floorPlan} alt="Floor plan" className="tab-content-image" />
                </div>
              )}

              {activeTab === 'map' && (
                <div>
                  <h4 className="tab-content-title">Location Map</h4>
                  <iframe
                    title="Property Location"
                    width="100%"
                    height="400"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}&zoom=14`}
                    className="tab-content-map"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PropertyDetail.propTypes = {
  property: PropTypes.shape({
    images: PropTypes.array.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    shortDesc: PropTypes.string.isRequired,
    longDesc: PropTypes.string.isRequired,
    floorPlan: PropTypes.string,
    bedrooms: PropTypes.number.isRequired,
    postcode: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToFavourites: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
};

export default PropertyDetail;
