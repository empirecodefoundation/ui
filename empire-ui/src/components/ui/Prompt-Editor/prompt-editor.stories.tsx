// src/components/ai/prompt-editor/prompt-editor.stories.tsx

import React from 'react';
import { PromptEditor } from './prompt-editor';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PromptEditor> = {
  title: 'AI Components/Prompt Editor',
  component: PromptEditor,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof PromptEditor>;

export const Default: Story = {
  render: () => <PromptEditor />,
};
