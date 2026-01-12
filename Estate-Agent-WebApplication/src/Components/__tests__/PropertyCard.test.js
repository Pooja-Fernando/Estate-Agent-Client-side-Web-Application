import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import PropertyCard from '../PropertyCard';

describe('PropertyCard Component', () => {
  const mockProperty = {
    id: 1,
    type: 'Apartment',
    price: 450000,
    bedrooms: 2,
    postcode: 'NW1 6XE',
    location: 'London, Camden',
    shortDesc: 'Modern apartment with great views',
    dateAdded: '2024-01-15',
    images: ['https://example.com/image1.jpg']
  };

  const mockProps = {
    property: mockProperty,
    onClick: jest.fn(),
    onAddToFavourites: jest.fn(),
    onDragStart: jest.fn(),
  };

  test('renders property price', () => {
    render(
      <MemoryRouter>
        <PropertyCard {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/450,000/)).toBeInTheDocument();
  });

  test('renders property image', () => {
    render(
      <MemoryRouter>
        <PropertyCard {...mockProps} />
      </MemoryRouter>
    );
    const image = screen.getByRole('img', { hidden: true });
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  test('renders property location', () => {
    render(
      <MemoryRouter>
        <PropertyCard {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText('London, Camden')).toBeInTheDocument();
  });

  test('renders property bedrooms', () => {
    render(
      <MemoryRouter>
        <PropertyCard {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/2.*bed/)).toBeInTheDocument();
  });

  test('renders View Details button', () => {
    render(
      <MemoryRouter>
        <PropertyCard {...mockProps} />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /View Details/i })).toBeInTheDocument();
  });

  test('calls onClick when View Details is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <PropertyCard {...mockProps} />
      </MemoryRouter>
    );
    const detailsButton = screen.getByRole('button', { name: /View Details/i });
    await user.click(detailsButton);
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  test('has draggable attribute', () => {
    const { container } = render(
      <MemoryRouter>
        <PropertyCard {...mockProps} />
      </MemoryRouter>
    );
    const card = container.querySelector('.property-card');
    expect(card).toHaveAttribute('draggable', 'true');
  });
});
