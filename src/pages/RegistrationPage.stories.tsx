import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { MemoryRouter, Route, Routes } from "react-router";

import RegistrationPage from "./RegistrationPage";

function mockFetch(impl: () => Promise<Response>) {
    const original = window.fetch;
    window.fetch = impl as typeof window.fetch;
    return () => {
        window.fetch = original;
    };
}

async function fillAndSubmit(canvasElement: HTMLElement) {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText("Username"), "jane@example.com");
    await userEvent.type(canvas.getByPlaceholderText("Password"), "secret");
    await userEvent.type(canvas.getByPlaceholderText("Confirm password"), "secret");
    await userEvent.click(canvas.getByRole("button", { name: "Sign up" }));
    return canvas;
}

const meta = {
    title: "Pages/Registration",
    component: RegistrationPage,
    parameters: {
        layout: "fullscreen",
    },
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={["/register"]}>
                <Routes>
                    <Route path="/register" element={<Story />} />
                    <Route path="/login" element={<p>Login page</p>} />
                </Routes>
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof RegistrationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
    globals: {
        viewport: { value: "mobile1", isRotated: false },
    },
};

export const PasswordMismatch: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.type(canvas.getByPlaceholderText("Username"), "jane@example.com");
        await userEvent.type(canvas.getByPlaceholderText("Password"), "secret");
        await userEvent.type(canvas.getByPlaceholderText("Confirm password"), "different");
        await userEvent.click(canvas.getByRole("button", { name: "Sign up" }));
        await expect(await canvas.findByRole("alert")).toHaveTextContent("Passwords do not match.");
    },
};

export const UsernameAlreadyExists: Story = {
    beforeEach: () =>
        mockFetch(() => Promise.resolve(new Response(null, { status: 400 }))),
    play: async ({ canvasElement }) => {
        const canvas = await fillAndSubmit(canvasElement);
        await expect(await canvas.findByRole("alert")).toHaveTextContent("username");
    },
};

export const SuccessfulRegistration: Story = {
    beforeEach: () => {
        const restoreFetch = mockFetch(() =>
            Promise.resolve(new Response(null, { status: 204 })),
        );
        return restoreFetch;
    },
    play: async ({ canvasElement }) => {
        await fillAndSubmit(canvasElement);
        await expect(await within(canvasElement).findByText("Login page")).toBeInTheDocument();
    },
};
