import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Box, Tab, Tabs, Typography} from "@mui/material";



function CustomTabPanel(props: any) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			style={{ height: '0px' }}
			{...other}
		>
			{value === index && (
				<Box>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export function TabsComponent({ tabs,configuration }: any) {
	const [value, setValue] = useState(0);
	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const {t} = useTranslation();
	return(
		<>
			<Box
				sx={{
					backgroundColor: 'white',
					border: configuration?.boxBorder,
					boxSizing: 'border-box',
					padding: 10,
				}}
			>
				<Tabs
				centered={configuration?.centered}
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
				TabIndicatorProps={{
					style: {display:'none'}
				}}
				>
					{tabs.map((tab: any,index:number) => {
						return (
							<Tab
								key={tab.id}
								label={tab.label}
								style={{fontSize:'18px'}}
								{...a11yProps(index)}
							/>
						);
					})}
				</Tabs>
				{tabs.map((tab: any, i: number) => (
					<CustomTabPanel  key={tab.id} value={value} index={i}>{tab.children}</CustomTabPanel>
				))}
			</Box>
			<style jsx global>{`
			  .css-1k7kg73-MuiButtonBase-root-MuiTab-root.Mui-selected {
				background: white !important;
			  }
			`}</style>
		</>
	);

}