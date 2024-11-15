import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsAccordion, NsAccordionDetails, NsAccordionProps } from 'src/components/components/NsAccordion';
import Typography from '@mui/material/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FIGMA from '@root/figma.json';

export default {
    title: 'Components/Accordion',
    component: NsAccordion,
    parameters: {
        docs: {
            description: {
                component: `This \`NsAccordion\` component displays an expandable/collapsible section ideal for showing/hiding content.`,
            },
        },
        design: {
            type: 'figma',
            url: FIGMA.components.accordion,
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
    },
} as Meta;

const Template: StoryFn<NsAccordionProps & { expanded: boolean; onChange: () => void }> = (args) => {
    const [expanded, setExpanded] = useState<boolean>(args.expanded || false);

    // The onChange handler should mimic the signature of the Accordion's onChange prop
    const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded);
    };

    return (
        <div>
            <NsAccordion {...args} expanded={expanded} onChange={handleChange}>
                {args.children}
            </NsAccordion>
            <NsAccordion title="Accordion 2">
                <NsAccordionDetails>
                    <Typography>Additional text for the accordion...</Typography>
                </NsAccordionDetails>
            </NsAccordion>
            <NsAccordion title="Disabled Accordion" disabled={true}>
                <NsAccordionDetails>
                    <Typography>Additional text for the accordion...</Typography>
                </NsAccordionDetails>
            </NsAccordion>
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    title: 'Change this content to see how it gets overwritten',
    children: <NsAccordionDetails>Change this title to see how it gets overwritten</NsAccordionDetails>, // Passa il contenuto come children
    expanded: true,
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
    content: <Typography>This is the content of a disabled accordion</Typography>,
    disabled: true,
};
