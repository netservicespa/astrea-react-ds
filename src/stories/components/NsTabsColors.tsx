import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { ColorItem, ColorPalette } from '@storybook/blocks';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function NsTabsColors() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Gold Mima" {...a11yProps(0)} />
                    <Tab label="Blue Chia" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <h2>Colour Gold Mima</h2>
                <h3>Dark text on light background</h3>
                <ColorPalette>
                    <ColorItem title="darkTextColor.primary" subtitle="" colors={{ 'astrea-text-colour': '#000000' }} />
                    <ColorItem
                        title="darkTextColor.secondary"
                        subtitle=""
                        colors={{ 'astrea-secondary-text-colour': '#3D3D3D' }}
                    />
                    <ColorItem
                        title="darkTextColor.tertiary"
                        subtitle=""
                        colors={{ 'astrea-tertiary-text-colour': '#595959' }}
                    />
                </ColorPalette>
                <h3>Accent</h3>
                <ColorPalette>
                    <ColorItem title="primary.main" subtitle="" colors={{ 'astrea-primary-colour': '#66572F' }} />
                    <ColorItem title="secondary.main" subtitle="" colors={{ 'astrea-secondary-colour': '#5E512B' }} />
                    <ColorItem
                        title="error.main"
                        subtitle="Only use this colour for success messages. For example, use it as positive feedback when a user completes a task."
                        colors={{ 'astrea-error-colour': '#D4351C' }}
                    />
                    <ColorItem title="info.main" subtitle="" colors={{ 'astrea-info-colour': '#66572F' }} />
                    <ColorItem
                        title="success.main"
                        subtitle="Only use this colour for success messages. For example, use it as positive feedback when a user completes a task."
                        colors={{ 'astrea-success-colour': '#006636' }}
                    />
                    <ColorItem
                        title="focus.main"
                        subtitle="Only use this color to indicate the focus element. For example, when a user selects an element with their keyboard."
                        colors={{ 'astrea-focus-colour': '#FFE300' }}
                    />
                    <ColorItem title="borderColor.main" subtitle="" colors={{ 'astrea-border-colour': '#B1B4B6' }} />
                </ColorPalette>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <h2>Colour Blue Chia</h2>
                <h3>Dark text on light background</h3>
                <ColorPalette>
                    <ColorItem title="darkTextColor.primary" subtitle="" colors={{ 'astrea-text-colour': '#000000' }} />
                    <ColorItem
                        title="darkTextColor.secondary"
                        subtitle=""
                        colors={{ 'astrea-secondary-text-colour': '#3D3D3D' }}
                    />
                    <ColorItem
                        title="darkTextColor.tertiary"
                        subtitle=""
                        colors={{ 'astrea-tertiary-text-colour': '#595959' }}
                    />
                </ColorPalette>
                <h3>Accent</h3>
                <ColorPalette>
                    <ColorItem title="primary.main" subtitle="" colors={{ 'astrea-primary-colour': '#003366' }} />
                    <ColorItem title="secondary.main" subtitle="" colors={{ 'astrea-secondary-colour': '#22479C' }} />
                    <ColorItem
                        title="error.main"
                        subtitle="Only use this colour for success messages. For example, use it as positive feedback when a user completes a task."
                        colors={{ 'astrea-error-colour': '#D4351C' }}
                    />
                    <ColorItem title="info.main" subtitle="" colors={{ 'astrea-info-colour': '#003366' }} />
                    <ColorItem
                        title="success.main"
                        subtitle="Only use this colour for success messages. For example, use it as positive feedback when a user completes a task."
                        colors={{ 'astrea-success-colour': '#006636' }}
                    />
                    <ColorItem
                        title="focus.main"
                        subtitle="Only use this color to indicate the focus element. For example, when a user selects an element with their keyboard."
                        colors={{ 'astrea-focus-colour': '#FFE300' }}
                    />
                    <ColorItem title="borderColor.main" subtitle="" colors={{ 'astrea-border-colour': '#B1B4B6' }} />
                </ColorPalette>
            </CustomTabPanel>
        </Box>
    );
}
