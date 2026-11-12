import { useEffect } from 'react'
import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Brand theme (sets data-theme on <html>)',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'blue', title: 'Blue' },
          { value: 'purple', title: 'Purple' },
          { value: 'teal', title: 'Teal' },
        ],
      },
    },
  },

  initialGlobals: {
    theme: 'blue',
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme ?? 'blue'

      useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
      }, [theme])

      return <Story />
    },
  ],

  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
