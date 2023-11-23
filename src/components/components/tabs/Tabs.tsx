import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Tab, Tabs, TabsProps, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  noPadding?: boolean;
}

function CustomTabPanel({
  children,
  value,
  index,
  noPadding,
  ...other
}: TabPanelProps) {
  const isVisible = value === index;
  return (
    <div
      role="tabpanel"
      hidden={!isVisible}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{
        border: '1px solid gray',
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

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    []
  );

  const { t } = useTranslation();

  const tabStyle = (isActive: boolean) => ({
    textTransform: 'capitalize',
    bgcolor: isActive ? 'white' : 'primary.main',
    color: isActive ? 'grey' : 'white',
    borderLeft: '1px solid gray',
    borderRight: '1px solid gray',
    borderTop: isActive ? '1px solid gray' : '1px solid gray', // Mantiene il bordo superiore per il tab attivo
    borderBottom: isActive ? 'none' : '1px solid gray', // Nasconde il bordo inferiore se attivo
    height: isActive ? '48px' : '40px',
    minHeight: '40px',
    margin: '0px', // Rimuove margini esterni
    '&:not(:last-child)': {
      marginRight: '4px',
    },
  });

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
          <Tab
            key={tab.id}
            label={t(tab.label)}
            {...a11yProps(index)}
            sx={tabStyle(value === index)}
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
