import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import HomeHeader from "./HomeHeader";

const meta = {
  title: "Components/Home Header",
  component: HomeHeader,
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
} satisfies Meta<typeof HomeHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
};
