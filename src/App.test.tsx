import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App component', () => {
  test('renders input field and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Enter location')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get Weather' })).toBeInTheDocument();
  });

  test('fetches weather data on button click', async () => {
    const mockData = {
      name: 'London',
      main: { temp: 10 },
      weather: [{ description: 'Cloudy' }],
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => mockData,
    });

    render(<App />);

    const input = screen.getByPlaceholderText('Enter location');
    fireEvent.change(input, { target: { value: 'London' } });

    const button = screen.getByRole('button', { name: 'Get Weather' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Location: London')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Temperature: 10 °C')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText('Description: Cloudy')).toBeInTheDocument();
    });
  });

  test('displays error message if weather data cannot be fetched', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<App />);

    const input = screen.getByPlaceholderText('Enter location');
    fireEvent.change(input, { target: { value: 'InvalidLocation' } });

    const button = screen.getByRole('button', { name: 'Get Weather' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Error fetching weather data')).toBeInTheDocument();
    });
  });

  test('clears weather data when input is cleared', async () => {
    const mockData = {
      name: 'London',
      main: { temp: 10 },
      weather: [{ description: 'Cloudy' }],
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async () => mockData,
    });

    render(<App />);

    const input = screen.getByPlaceholderText('Enter location');
    fireEvent.change(input, { target: { value: 'London' } });

    const button = screen.getByRole('button', { name: 'Get Weather' });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Location: London')).toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {
      expect(screen.queryByText('Location: London')).not.toBeInTheDocument();
    });
  });
});
