import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavouritesSidebar from '../FavouritesSidebar';

describe('FavouritesSidebar Component', () => {
  const mockProperty1 = {
    id: 1,
    type: 'House',
    price: 750000,
    bedrooms: 3,
    postcode: 'BR1',
    location: 'London, Bromley',
    shortDesc: 'Spacious family home',
    dateAdded: '2024-01-10',
    images: ['https://example.com/image1.jpg']
  };

  const mockProperty2 = {
    id: 2,
    type: 'Apartment',
    price: 550000,
    bedrooms: 2,
    postcode: 'SW15',
    location: 'London, Putney',
    shortDesc: 'Luxury riverside apartment',
    dateAdded: '2024-01-12',
    images: ['https://example.com/image2.jpg']
  };

  const mockProps = {
    favourites: [mockProperty1, mockProperty2],
    onRemove: jest.fn(),
    onClear: jest.fn(),
    onPropertyClick: jest.fn(),
    onDragOver: jest.fn(),
    onDrop: jest.fn(),
    onDropToRemove: jest.fn(),
    onDragStart: jest.fn()
  };

  test('renders sidebar with favorites count', () => {
    const { container } = render(<FavouritesSidebar {...mockProps} />);
    const title = container.querySelector('.favourites-title');
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain('2');
  });

  test('displays favorite properties', () => {
    render(<FavouritesSidebar {...mockProps} />);
    expect(screen.getByText('London, Bromley')).toBeInTheDocument();
    expect(screen.getByText('London, Putney')).toBeInTheDocument();
  });

  test('displays clear all button when favourites exist', () => {
    render(<FavouritesSidebar {...mockProps} />);
    expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument();
  });

  test('calls onClear when Clear All is clicked', async () => {
    const user = userEvent.setup();
    render(<FavouritesSidebar {...mockProps} />);
    const clearButton = screen.getByRole('button', { name: /Clear/i });
    await user.click(clearButton);
    expect(mockProps.onClear).toHaveBeenCalled();
  });

  test('displays empty message when no favourites', () => {
    const emptyProps = { ...mockProps, favourites: [] };
    render(<FavouritesSidebar {...emptyProps} />);
    expect(screen.getByText(/Drag properties here to save them/i)).toBeInTheDocument();
  });

  test('shows correct number of favourite items', () => {
    const { container } = render(<FavouritesSidebar {...mockProps} />);
    const items = container.querySelectorAll('.favourites-item');
    expect(items.length).toBe(2);
  });
});
