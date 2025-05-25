import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PromptEditor from './PromptEditor';

describe('PromptEditor Component', () => {
  const mockInitialPrompt = 'Initial prompt text';
  const mockOnSave = jest.fn();
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the editor with initial prompt', () => {
    render(<PromptEditor prompt={mockInitialPrompt} onSave={mockOnSave} onChange={mockOnChange} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue(mockInitialPrompt);
  });

  test('calls onChange when typing in the textarea', () => {
    render(<PromptEditor prompt={mockInitialPrompt} onSave={mockOnSave} onChange={mockOnChange} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: 'New prompt text' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('New prompt text');
  });

  test('calls onSave when save button is clicked', () => {
    render(<PromptEditor prompt={mockInitialPrompt} onSave={mockOnSave} onChange={mockOnChange} />);
    const saveButton = screen.getByRole('button', { name: /save/i });

    fireEvent.click(saveButton);
    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  test('disables save button if prompt is empty', () => {
    render(<PromptEditor prompt="" onSave={mockOnSave} onChange={mockOnChange} />);
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeDisabled();
  });
});
