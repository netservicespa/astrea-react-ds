import React, { useState } from 'react'; 
import { Meta, StoryFn } from '@storybook/react';
import {
  NsAccordion,
  NsAccordionProps,
} from '../../components/components/NsAccordion';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
    icon: {
      description: 'The icon to be used as the expand more indicator in the accordion summary.',
      control: 'object',
      table: {
        category: 'Appearance',
      },
    },
    typographyProps: {
      description: 'Props to customize the typography component used for the title text.',
      control: 'object',
      table: {
        category: 'Appearance',
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

const Template: StoryFn<NsAccordionProps & { expanded: boolean; onChange: () => void }> = (args) => {
  const [expanded, setExpanded] = useState<boolean | undefined>(args.expanded);

  // The onChange handler should mimic the signature of the Accordion's onChange prop
  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <div>
      <NsAccordion
        {...args}
        expanded={expanded}
        onChange={handleChange}
      />
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
};

export const Default = Template.bind({});
Default.args = {
  title: 'Change this content to see how it gets overwritten',
  content: (
    <Typography>
      Change this title to see how it gets overwritten
    </Typography>
  ),
  expanded: 'panel1',
  icon: <FilterAltIcon />,
  typographyProps: { 
    variant: 'h2', 
  },
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
