import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import placeholder from "../../assets/product-placeholder.jpeg";
import type { Product } from "../../api/client";
import HomePage from "./HomePage";

const products: Product[] = [
  {
    id: 1,
    name: "Everyday Savings",
    description: "A simple savings account with no monthly fee.",
    price: 19.99,
    imageUrl: placeholder,
  },
  {
    id: 2,
    name: "Premium Cover",
    description: "Flexible protection for your everyday needs.",
    price: 29.99,
    imageUrl: placeholder,
  },
  {
    id: 3,
    name: "Home Loan",
    description: "Competitive rates for first-time buyers.",
    price: 19.99,
    imageUrl: placeholder,
  },
];

function mockProductsResponse(data: Product[]) {
  const originalFetch = window.fetch;
  window.fetch = (() =>
    Promise.resolve(
      new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )) as typeof window.fetch;

  return () => {
    window.fetch = originalFetch;
  };
}

const meta = {
  title: "Pages/Home",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/home"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  beforeEach: () => mockProductsResponse(products),
};

export const Mobile: Story = {
  beforeEach: () => mockProductsResponse(products),
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};

export const Empty: Story = {
  beforeEach: () => mockProductsResponse([]),
};
