import { Meta, StoryObj } from '@storybook/react-webpack5';
import { NsFooter } from '@/components/patterns/footer/NsFooter';

/**
 * Dynamic Footer Stories
 * @author vadim.chilinciuc, mustapha.aoussar
 */

const meta: Meta<typeof NsFooter> = {
    title: 'Patterns/Footer',
    component: NsFooter,
};

export const FooterSimple: Story = {
    args: {
        type: 'simple',
        logoPath: './images/netservice_monogramma.svg',
        links: [
            { href: '#', text: 'Accessibility' },
            { href: '#', text: 'Sitemap' },
            { href: '#', text: 'Cookies' },
            { href: '#', text: 'Privacy' },
        ],
        columns: [
            {
                title: 'Column 1',
                links: [
                    { href: '#', text: 'Navigation item 1' },
                    { href: '#', text: 'Navigation item 2' },
                    { href: '#', text: 'Navigation item 3' },
                    { href: '#', text: 'Navigation item 4' },
                ],
            },
            {
                title: 'Column 2',
                links: [
                    { href: '#', text: 'Navigation item 1' },
                    { href: '#', text: 'Navigation item 2' },
                    { href: '#', text: 'Navigation item 3' },
                ],
            },
        ],
        rowSize: 3,
    },
    argTypes: {
        columns: {
            if: {
                arg: 'type',
                eq: 'multiColumn',
            },
            control: { type: 'array' },
        },
        rowSize: {
            if: {
                arg: 'type',
                eq: 'multiColumn',
            },
            control: { type: 'number' },
        },
        links: {
            if: {
                arg: 'type',
                eq: 'simple',
            },
            control: { type: 'array' },
        },
    },
};

export const FooterMultiColumn: Story = {
    args: {
        type: 'multiColumn',
        logoPath: './images/netservice_monogramma.svg',
        links: [
            { href: '#', text: 'Accessibility' },
            { href: '#', text: 'Sitemap' },
            { href: '#', text: 'Cookies' },
            { href: '#', text: 'Privacy' },
        ],
        columns: [
            {
                title: 'Column 1',
                links: [
                    { href: '#', text: 'Navigation item 1' },
                    { href: '#', text: 'Navigation item 2' },
                    { href: '#', text: 'Navigation item 3' },
                    { href: '#', text: 'Navigation item 4' },
                ],
            },
            {
                title: 'Column 2',
                links: [
                    { href: '#', text: 'Navigation item 1' },
                    { href: '#', text: 'Navigation item 2' },
                    { href: '#', text: 'Navigation item 3' },
                ],
            },
        ],
        rowSize: 3,
    },
    argTypes: {
        columns: {
            if: {
                arg: 'type',
                eq: 'multiColumn',
            },
            control: { type: 'array' },
        },
        rowSize: {
            if: {
                arg: 'type',
                eq: 'multiColumn',
            },
            control: { type: 'number' },
        },
        links: {
            if: {
                arg: 'type',
                eq: 'simple',
            },
            control: { type: 'array' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof NsFooter>;
