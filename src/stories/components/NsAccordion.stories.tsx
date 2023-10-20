import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
  NsAccordion,
  NsAccordionProps,
} from '../../components/components/NsAccordion';
import Typography from '@mui/material/Typography';

export default {
  title: 'Components/Accordion',
  component: NsAccordion,
  parameters: {
    docs: {
      description: {
        component: `This \`NsAccordion\` component displays an expandable/collapsible section ideal for showing/hiding content.`,
      },
    },
  },
  argTypes: {
    title: {
      description: 'The visible title text for the accordion header.',
      control: 'text',
      defaultValue: 'Accordion Title',
      table: {
        category: 'Content',
      },
    },
    content: {
      description: 'Collapsed content or ReactNode displayed upon expanding the accordion.',
      table: {
        category: 'Content',
      },
    },
    disabled: {
      description: 'Disables interaction if set.',
      control: 'boolean',
      table: {
        category: 'Behavior',
      },
    },
    otherProps: {
      description: 'Additional props inherited from MUI Accordion.',
      table: {
        category: 'Misc',
      },
    },
  }
} as Meta;

const Template: StoryFn<NsAccordionProps> = (args) => (
  <div>
    <NsAccordion {...args} />
    <NsAccordion
      title="Accordion 2"
      content={<Typography>Additional text for the accordion...</Typography>}
    />
    <NsAccordion
      title="Disabled Accordion"
      content={<Typography>Additional text for the accordion...</Typography>}
      disabled={true}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Change this content to see how it gets overwritten',
  content: (
    <Typography>
      Change this title to see how it gets overwritten
    </Typography>
  ),
};


const TemplateDisabled: StoryFn<NsAccordionProps> = (args) => (
  <div>
    <NsAccordion {...args} />
    <NsAccordion {...args} />
    <NsAccordion {...args} />
  </div>
);

export const DisabledAll = TemplateDisabled.bind({});
DisabledAll.args = {
  title: 'Disabled Accordion Title',
  content: (
    <Typography>
      This is the content of a disabled accordion
    </Typography>
  ),
  disabled: true,
};
