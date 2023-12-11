import React from 'react';
import { NsTooltip } from '../../components/components/NsTooltip';

export default {
    title: 'Components/Tooltip',
    component: NsTooltip,
    parameters: {
        docs: {
            description: {
                component: `The \`NsTooltip\` component is used to display contextual information to users when they interact with a user interface element. It is customizable in terms of positioning, content, and style.`,
            },
        },
    },
    argTypes: {
        title: {
            description: 'The content of the tooltip. Can be a string or a React node.',
            control: 'text',
            table: {
                category: 'Content',
            },
        },
        placement: {
            description: 'Defines where to place the tooltip relative to the target element.',
            control: { type: 'select', options: ['bottom', 'left', 'right', 'top', 'bottom-end', 'bottom-start', 'left-end', 'left-start', 'right-end', 'right-start', 'top-end', 'top-start'] },
            table: {
                category: 'Appearance',
            },
        },
        icon: {
            description: 'Icon to be displayed in the tooltip. If not provided, a default icon will be used.',
            control: 'object',
            table: {
                category: 'Appearance',
            },
        },
        colorIcon: {
            description: 'Color of the icon displayed in the tooltip.',
            control: 'color',
            table: {
                category: 'Appearance',
            },
        },
        otherProps: {
            description: 'Other properties to be passed to the tooltip for additional customization.',
            control: 'object',
            table: {
                category: 'Misc',
            },
        },
    },    
};

const Template = (args) => <NsTooltip {...args} />;

export const SimpleTooltip = Template.bind({});
SimpleTooltip.args = {
    title: 'Simple Tooltip',
    placement: 'top',
};