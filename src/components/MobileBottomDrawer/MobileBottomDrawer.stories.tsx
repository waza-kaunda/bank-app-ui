import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import MobileBottomDrawer from "./MobileBottomDrawer";

const meta = {
  title: "Components/Mobile Bottom Drawer",
  component: MobileBottomDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  globals: {
    viewport: { value: "mobile1", isRotated: false },
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/home"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof MobileBottomDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
