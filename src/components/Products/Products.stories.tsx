import type { Meta, StoryObj } from '@storybook/react-vite';

import placeholder from '../../assets/product-placeholder.jpeg';
import Products from './Products';

const mockProducts = [
  { id: 1, name: "Everyday Savings", description: "A simple savings account with no monthly fee.", price: 19.99, imageUrl: placeholder },
  { id: 2, name: "Premium Credit Card", description: "Rewards on every purchase, with travel cover and a generous limit for everyday spending.", price: 29.99, imageUrl: placeholder },
  { id: 3, name: "Home Loan", description: "Competitive rates for first-time buyers.", price: 19.99, imageUrl: placeholder },
  { id: 4, name: "Student Account", description: "Low-cost banking for students.", price: 9.99, imageUrl: placeholder },
];

const meta = {
  title: 'Pages/Products',
  component: Products,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Products>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Empty state */
export const Default: Story = {
  args: {
    products: [],
  },
};

export const WithProducts: Story = {
  args: {
    products: mockProducts,
  },
};

/** Mobile-first: check the swipeable rails at phone width */
export const Mobile: Story = {
  args: {
    products: mockProducts,
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

export const Loading: Story = {
  args: {
    products: [],
    loading: true,
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

export const WithError: Story = {
  args: {
    products: [],
    errorMessage: "The product service returned an error (HTTP 500).",
    onRetry: () => {},
  },
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};
