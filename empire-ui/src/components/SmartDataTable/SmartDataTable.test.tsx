import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SmartDataTable } from './SmartDataTable';

const mockData = [
  { id: 1, name: 'John', age: 30, department: 'Engineering' },
  { id: 2, name: 'Jane', age: 25, department: 'Marketing' },
  { id: 3, name: 'Bob', age: 35, department: 'Engineering' },
];

const mockColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'department', label: 'Department' },
];

describe('SmartDataTable', () => {
  it('renders the table with initial data', () => {
    render(
      <SmartDataTable
        data={mockData}
        columns={mockColumns}
      />
    );

    // Check if all column headers are rendered
    mockColumns.forEach(column => {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    });

    // Check if all data rows are rendered
    mockData.forEach(row => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.age.toString())).toBeInTheDocument();
      expect(screen.getByText(row.department)).toBeInTheDocument();
    });
  });

  it('shows loading state when processing query', async () => {
    render(
      <SmartDataTable
        data={mockData}
        columns={mockColumns}
        openaiApiKey="test-key"
      />
    );

    const input = screen.getByPlaceholderText('Ask a question about your data...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Show me all engineers' } });
    fireEvent.click(button);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('handles empty query', async () => {
    render(
      <SmartDataTable
        data={mockData}
        columns={mockColumns}
      />
    );

    const input = screen.getByPlaceholderText('Ask a question about your data...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(button);

    // Should show all data
    mockData.forEach(row => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
    });
  });

  it('shows error message when API call fails', async () => {
    render(
      <SmartDataTable
        data={mockData}
        columns={mockColumns}
        openaiApiKey="invalid-key"
      />
    );

    const input = screen.getByPlaceholderText('Ask a question about your data...');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Show me all engineers' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Failed to process query. Please try again.')).toBeInTheDocument();
    });
  });

  it('filters data based on query', async () => {
    render(
      <SmartDataTable
        data={mockData}
        columns={mockColumns}
        openaiApiKey="test-key"
      />
    );

    const input = screen.getByPlaceholderText('Ask a question about your data...');
    const button = screen.getByRole('button');

    // Mock OpenAI response
    global.fetch = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          filters: [
            { column: 'department', operator: '==', value: 'Engineering' }
          ]
        })
      })
    );

    fireEvent.change(input, { target: { value: 'Show me all engineers' } });
    fireEvent.click(button);

    await waitFor(() => {
      // Should only show engineering department
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.queryByText('Jane')).not.toBeInTheDocument();
    });
  });
}); 