import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from '../SearchPage';

describe('SearchPage Component', () => {
  const mockProps = {
    filters: {
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      postcode: '',
      dateFrom: '',
      dateTo: ''
    },
    onFilterChange: jest.fn(),
    onSearch: jest.fn(),
    results: [
      {
        id: 1,
        type: 'House',
        price: 750000,
        bedrooms: 3,
        postcode: 'BR1',
        location: 'London, Bromley',
        shortDesc: 'Spacious family home with garden',
        dateAdded: '2024-01-10',
        images: ['https://example.com/image1.jpg']
      }
    ],
    onPropertyClick: jest.fn(),
    onAddToFavourites: jest.fn(),
    onDragStart: jest.fn()
  };

  test('renders search form', () => {
    render(
      <MemoryRouter>
        <SearchPage {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('renders results grid', () => {
    render(
      <MemoryRouter>
        <SearchPage {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('Spacious family home with garden')).toBeInTheDocument();
  });

  test('displays correct number of results', () => {
    render(
      <MemoryRouter>
        <SearchPage {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('London, Bromley')).toBeInTheDocument();
  });

  test('renders search title', () => {
    render(
      <MemoryRouter>
        <SearchPage {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Find Your Perfect Property/i)).toBeInTheDocument();
  });

  test('displays no results message when results array is empty', () => {
    const emptyProps = { ...mockProps, results: [] };
    render(
      <MemoryRouter>
        <SearchPage {...emptyProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/No properties match your search criteria/i)).toBeInTheDocument();
  });
});
