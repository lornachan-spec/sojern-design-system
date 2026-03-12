import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Components/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Standard: Story = {
  args: {
    title: 'Campaign Performance',
    subtitle: 'Last 30 days',
    variant: 'standard',
    callouts: [
      { description: 'Impressions', metric: '1.2M' },
      { description: 'Clicks', metric: '24,500' },
      { description: 'CTR', metric: '2.04%' },
      { description: 'Conversions', metric: '1,830' },
    ],
  },
};

export const StandardWithTooltips: Story = {
  args: {
    title: 'Campaign Performance',
    titleTooltip: 'Metrics for all active campaigns',
    subtitle: 'Last 30 days',
    variant: 'standard',
    callouts: [
      { description: 'Impressions', metric: '1.2M', tooltip: 'Total ad impressions served' },
      { description: 'Clicks', metric: '24,500', tooltip: 'Total clicks on ads' },
      { description: 'CTR', metric: '2.04%', tooltip: 'Click-through rate' },
      { description: 'Conversions', metric: '1,830', tooltip: 'Total conversions tracked' },
    ],
  },
};

export const StandardSmallSize: Story = {
  args: {
    title: 'Campaign Performance',
    variant: 'standard',
    calloutSize: 'small',
    callouts: [
      { description: 'Impressions', metric: '1.2M' },
      { description: 'Clicks', metric: '24,500' },
      { description: 'CTR', metric: '2.04%' },
      { description: 'Conversions', metric: '1,830' },
    ],
  },
};

export const Expanded: Story = {
  args: {
    title: 'Detailed Metrics',
    subtitle: 'Broken down by channel',
    variant: 'expanded',
    calloutsPerRow: 3,
    callouts: [
      { description: 'Impressions', metric: '1.2M' },
      { description: 'Clicks', metric: '24,500' },
      { description: 'CTR', metric: '2.04%' },
      { description: 'Conversions', metric: '1,830' },
      { description: 'CPC', metric: '$0.42' },
      { description: 'Spend', metric: '$10,290' },
    ],
  },
};

export const List: Story = {
  args: {
    title: 'Performance by Channel',
    variant: 'list',
    listCallouts: [
      {
        header: 'Display',
        headerTooltip: 'Display advertising metrics',
        items: [
          { description: 'Impressions', metric: '850K' },
          { description: 'Clicks', metric: '12,400' },
          { description: 'CTR', metric: '1.46%' },
        ],
      },
      {
        header: 'Search',
        headerTooltip: 'Search advertising metrics',
        items: [
          { description: 'Impressions', metric: '350K' },
          { description: 'Clicks', metric: '12,100' },
          { description: 'CTR', metric: '3.46%' },
        ],
      },
      {
        header: 'Video',
        items: [
          { description: 'Impressions', metric: '200K' },
          { description: 'Clicks', metric: '4,200' },
          { description: 'CTR', metric: '2.10%' },
        ],
      },
    ],
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'No Metrics Yet',
    subtitle: 'Data will appear once your campaign is live',
    variant: 'standard',
    callouts: [],
  },
};
