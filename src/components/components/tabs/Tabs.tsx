import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs, TabsProps, Typography } from '@mui/material';
import { TabProps } from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  noPadding?: boolean;
}

interface StyledTabProps extends TabProps {
  isActive: boolean;
}

function CustomTabPanel({
  children,
  value,
  index,
  noPadding,
  ...other
}: TabPanelProps) {
  const theme = useTheme();
  const isVisible = value === index;

  return (
    <div
      role="tabpanel"
      hidden={!isVisible}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{
        border: `1px solid ${theme.palette.borderColor.main}`,
        ...(isVisible ? {} : { display: 'none' }),
        overflow: 'hidden',
        zIndex: 1,
        position: 'relative',
      }}
    >
      {isVisible && (
        <Box p={noPadding ? 0 : 3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

interface TabData {
  id: string;
  label: string;
  children: React.ReactNode;
  noPadding: boolean;
}

interface NsTabsProps {
  tabs: TabData[];
  configuration?: {
    boxBorder?: string;
    centered?: boolean;
  };
}

export const NsTabs: React.FC<
  NsTabsProps & Omit<TabsProps, 'value' | 'onChange' | 'children'>
> = ({ tabs, configuration, ...otherProps }) => {
  const [value, setValue] = useState(0);
  const { t } = useTranslation();
  const theme = useTheme();

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );

  const StyledTab = styled(Tab)<StyledTabProps>(({ theme, isActive }) => ({
    textTransform: 'capitalize',
    fontSize: '1rem',
    bgcolor: isActive ? 'white' : `${theme.palette.primary.main}`,
    color: isActive ? '#3D3D3D' : 'white',
    borderLeft: `1px solid ${theme.palette.borderColor.main}`,
    borderRight: `1px solid ${theme.palette.borderColor.main}`,
    borderTop: `1px solid ${theme.palette.borderColor.main}`,
    borderBottom: isActive ? 'none' : `1px solid ${theme.palette.borderColor.main}`,
    height: isActive ? '48px' : '43px',
    minHeight: '43px',
    margin: '0px', // Rimuove margini esterni
    '&:not(:last-child)': {
      marginRight: '4px',
    },
    '&:focus': {
      boxShadow: 'inset 0 0 0 3px black',
    },
  }));

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        boxSizing: 'border-box',
        padding: '0px',
      }}
    >
      <Tabs
        centered={configuration?.centered}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        TabIndicatorProps={{ style: { display: 'none' } }}
        {...otherProps}
        sx={{
          zIndex: 2,
          position: 'relative',
          bottom: '-1px',
        }}
      >
        {tabs.map((tab, index) => (
          <StyledTab
            key={tab.id}
            label={t(tab.label)}
            isActive={value === index}
            tabIndex={0}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <CustomTabPanel
          key={tab.id}
          value={value}
          index={index}
          noPadding={tab.noPadding}
        >
          {tab.children}
        </CustomTabPanel>
      ))}
    </Box>
  );
};
