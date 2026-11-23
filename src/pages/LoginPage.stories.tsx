import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { MemoryRouter, Route, Routes } from 'react-router';

import LoginPage from './LoginPage';

/** Replaces window.fetch for a story and restores it afterwards. */
function mockFetch(impl: () => Promise<Response>) {
  const original = window.fetch;
  window.fetch = impl as typeof window.fetch;
  return () => {
    window.fetch = original;
  };
}

async function fillAndSubmit(canvasElement: HTMLElement) {
  const canvas = within(canvasElement);
  await userEvent.type(canvas.getByPlaceholderText('Username'), 'jane@example.com');
  await userEvent.type(canvas.getByPlaceholderText('Password'), 'secret');
  await userEvent.click(canvas.getByRole('button', { name: 'Login' }));
  return canvas;
}

const meta = {
  title: 'Pages/Login',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  // The page uses useNavigate(), which needs a router context.
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Story />} />
          <Route path="/home" element={<p>Home page</p>} />
        </Routes>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
};

export const InvalidCredentials: Story = {
  beforeEach: () =>
    mockFetch(() => Promise.resolve(new Response(null, { status: 401 }))),
  play: async ({ canvasElement }) => {
    const canvas = await fillAndSubmit(canvasElement);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Invalid username or password.');
  },
};

export const ServerUnreachable: Story = {
  beforeEach: () => mockFetch(() => Promise.reject(new TypeError('Failed to fetch'))),
  play: async ({ canvasElement }) => {
    const canvas = await fillAndSubmit(canvasElement);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('Unable to reach the server.');
  },
};

export const SuccessfulLogin: Story = {
  beforeEach: () => {
    const restoreFetch = mockFetch(() =>
      Promise.resolve(
        new Response(JSON.stringify({ loginAccessKey: 'test-token' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );
    return () => {
      restoreFetch();
      sessionStorage.removeItem('accessToken');
    };
  },
  play: async ({ canvasElement }) => {
    const canvas = await fillAndSubmit(canvasElement);
    // On success the page navigates to /home.
    await expect(await canvas.findByText('Home page')).toBeInTheDocument();
  },
};
