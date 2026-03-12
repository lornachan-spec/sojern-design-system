import type { Preview } from '@storybook/react-vite'

const preview: Preview = {
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
    },

    options: {
      storySort: {
        order: [
          'Components',
          [
            'Button',
            'Icons',
            'Chip',
            'Toggle',
            'Checkbox',
            'Radio',
            'Toast',
            'Tooltip',
            'Badge',
            'MetricCard',
            'Modal',
            'SideNav',
            'NavItem',
            'SecondaryNav',
            'Breadcrumbs',
            'FormField',
            'TextInput',
            'SelectField',
            'Dropdown',
            'DropdownList',
            'Table',
            'Pagination',

            '*',
          ],
          'Tokens',
          [
            'Colors',
            'Typography',
            'Spacing',
            'Radius',
            'Shadows',
          ],
        ],
      },
    },
  },
};

export default preview;
