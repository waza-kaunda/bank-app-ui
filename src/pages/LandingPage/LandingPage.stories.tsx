import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import LandingPage from './LandingPage';

const meta = {
  title: 'Pages/Landing',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  // The page uses <Link>, which needs a router context.
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
