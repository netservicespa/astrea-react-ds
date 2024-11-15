import React, { CSSProperties } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ButtonProps } from '@mui/material/Button';
import { Button as NsButton, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NsGridLayout } from 'src/components/layout/NsGridLayout';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import CheckIcon from '@mui/icons-material/Check';
import FIGMA from '@root/figma.json';

const meta: Meta<ButtonProps> = {
    title: 'Components/Button',
    component: NsButton,
    parameters: {
        docs: {
            // controls: { exclude: ['DoDontsOne'] },
            source: {
                type: 'code',
                code: '<NsButton {...args} />',
            },
        },
        design: {
            type: 'figma',
            url: FIGMA.components.button,
        },
    },
    argTypes: {
        variant: {
            label: 'Variant',
            control: { type: 'radio' },
            options: ['text', 'outlined', 'contained'],
        },
        color: {
            label: 'Color',
            control: { type: 'radio' },
            options: ['primary', 'secondary', 'success', 'error'],
        },
        disabled: {
            label: 'Disabled',
            control: { type: 'boolean' },
            defaultValue: false,
        },
        size: {
            label: 'Size',
            control: { type: 'radio' },
            options: ['small', 'medium', 'large'],
        },
    },
};
export default meta;

export type DoDontsProps = {
    doText?: string;
    dontText?: string;
    singleText?: string;
    LeftSide: React.ComponentType<any>;
    RightSide: React.ComponentType<any>;
};
const doDontStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    gap: '8px',
};
const buttonContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    background: '#f0f0f0',
    // background: '#e0e0e0',
    // background: '#d3d3d3',
    padding: '30px 0',
};

const DoDonts: StoryFn<DoDontsProps> = (args) => {
    const { LeftSide, RightSide } = args;
    return (
        <div>
            <NsGridLayout rowSize={2}>
                <div style={buttonContainerStyle}>
                    <LeftSide />
                </div>
                <div style={buttonContainerStyle}>
                    <RightSide />
                </div>
            </NsGridLayout>
            {args.doText && args.dontText && (
                <NsGridLayout rowSize={2}>
                    <div>
                        <div style={doDontStyle}>
                            <CheckIcon color="success" />
                            <h4>Do</h4>
                        </div>
                        <p>{args.doText}</p>
                    </div>
                    <div>
                        <div style={doDontStyle}>
                            <DoNotDisturbIcon color="error" />
                            <h4>Don't</h4>
                        </div>
                        <p>{args.dontText}</p>
                    </div>
                </NsGridLayout>
            )}
            {args.singleText && <p>{args.singleText}</p>}
        </div>
    );
};

const TemplateExample: StoryFn<ButtonProps> = (args) => {
    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="large" variant="contained" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="medium" variant="contained" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="small" variant="contained" />
                </Grid>
            </Grid>
        </Box>
    );
};
const Template: StoryFn<ButtonProps> = (args) => {
    return (
        <Box>
            <Typography variant="h4" mt={4} mb={2}>
                Filled
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="large" variant="contained" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="medium" variant="contained" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="small" variant="contained" />
                </Grid>
            </Grid>

            <Typography variant="h4" mt={4} mb={2}>
                Outlined
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="large" variant="outlined" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="medium" variant="outlined" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <NsButton {...args} size="small" variant="outlined" />
                </Grid>
            </Grid>
        </Box>
    );
};

export const ExampleButton = TemplateExample.bind({});
ExampleButton.args = {
    color: 'primary',
    children: 'Click me',
};
export const DefaultButton = Template.bind({});
DefaultButton.args = {
    color: 'primary',
    children: 'Primary button',
};

export const SecondaryButton = Template.bind({});
SecondaryButton.args = {
    color: 'secondary',
    children: 'Secondary button',
};

export const ErrorButton = Template.bind({});
ErrorButton.args = {
    color: 'error',
    children: 'Delete',
};

export const DisabledButton = Template.bind({});
DisabledButton.args = {
    color: 'primary',
    children: 'Disabled button',
    disabled: true,
};

export const DoDontsOne = DoDonts.bind({});
DoDontsOne.args = {
    doText: 'Use 1 or 2 words, no longer than 4 words, with fewer than 20 characters including spaces.',
    dontText: 'Don’t use punctuation marks such as periods or exclamation points.',
    LeftSide: () => (
        <NsButton onClick={() => {}} color="primary" size="small">
            Get started
        </NsButton>
    ),
    RightSide: () => (
        <NsButton onClick={() => {}} color="primary" size="small">
            Get started and enjoy the content!
        </NsButton>
    ),
};
export const DoDontsTwo = DoDonts.bind({});
DoDontsTwo.args = {
    doText: 'Use active verbs or phrases that clearly indicate action.',
    dontText: 'Use vague and generic labels that make the user read the dialog before taking action.',
    LeftSide: () => (
        <>
            <NsButton onClick={() => {}} color="secondary" size="small">
                Cancel
            </NsButton>
            <NsButton onClick={() => {}} color="primary" size="small">
                Get started
            </NsButton>
        </>
    ),
    RightSide: () => (
        <>
            <NsButton onClick={() => {}} color="secondary" size="small">
                Yes
            </NsButton>
            <NsButton onClick={() => {}} color="primary" size="small">
                No
            </NsButton>
        </>
    ),
};

const doDontPaddingContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    gap: '8px',
};
const doDontPaddingData: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
};
const showPaddingRight: CSSProperties = {
    borderTop: ' 1px solid black',
    width: '20px',
    textAlign: 'center',
};
const showPaddingWrong: CSSProperties = {
    borderTop: ' 1px solid black',
    width: '40px',
    textAlign: 'center',
};

export const DoDontsPadding = DoDonts.bind({});
DoDontsPadding.args = {
    doText: ' ',
    dontText: ' ',
    singleText:
        'The width of the button depends on the text. The space to the right and left of the text will always be 20',
    LeftSide: () => (
        <div style={doDontPaddingContainer}>
            <NsButton onClick={() => {}} color="primary" size="large">
                Call to action
            </NsButton>
            <div style={doDontPaddingData}>
                <div style={showPaddingRight}>20</div>
                <div style={showPaddingRight}>20</div>
            </div>
        </div>
    ),
    RightSide: () => (
        <div style={doDontPaddingContainer}>
            <NsButton onClick={() => {}} color="primary" size="large">
                <span style={{ paddingLeft: '20px', paddingRight: '20px' }}>Call to action</span>
            </NsButton>
            <div style={doDontPaddingData}>
                <div style={showPaddingWrong}>40</div>
                <div style={showPaddingWrong}>40</div>
            </div>
        </div>
    ),
};
