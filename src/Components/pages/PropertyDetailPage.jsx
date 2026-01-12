import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import PropertyDetail from '../PropertyDetail';
import { propertiesData } from '../../data/propertiesData';

const PropertyDetailPage = ({ favourites, onAddToFavourites }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertiesData.find(p => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="app-layout" style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Property not found</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Back to Search
        </button>
      </div>
    );
  }

  const isFavourite = favourites.some(p => p.id === property.id);

  return (
    <div className="app-layout">
      <PropertyDetail
        property={property}
        onClose={() => navigate('/')}
        onAddToFavourites={() => onAddToFavourites(property)}
        isFavourite={isFavourite}
      />
    </div>
  );
};

PropertyDetailPage.propTypes = {
  favourites: PropTypes.array.isRequired,
  onAddToFavourites: PropTypes.func.isRequired
};

export default PropertyDetailPage;
