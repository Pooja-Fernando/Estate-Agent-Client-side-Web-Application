import { propertiesData } from '../propertiesData';

describe('Properties Data', () => {
  test('should contain property data array', () => {
    expect(Array.isArray(propertiesData)).toBe(true);
  });

  test('should have at least one property', () => {
    expect(propertiesData.length).toBeGreaterThan(0);
  });

  test('each property should have required fields', () => {
    propertiesData.forEach(property => {
      expect(property).toHaveProperty('id');
      expect(property).toHaveProperty('type');
      expect(property).toHaveProperty('price');
      expect(property).toHaveProperty('bedrooms');
      expect(property).toHaveProperty('location');
      expect(property).toHaveProperty('images');
    });
  });

  test('all properties should have valid price values', () => {
    propertiesData.forEach(property => {
      expect(typeof property.price).toBe('number');
      expect(property.price).toBeGreaterThan(0);
    });
  });

  test('all properties should have valid bedroom counts', () => {
    propertiesData.forEach(property => {
      expect(typeof property.bedrooms).toBe('number');
      expect(property.bedrooms).toBeGreaterThanOrEqual(0);
    });
  });

  test('all properties should have images array', () => {
    propertiesData.forEach(property => {
      expect(Array.isArray(property.images)).toBe(true);
      expect(property.images.length).toBeGreaterThan(0);
    });
  });
});
