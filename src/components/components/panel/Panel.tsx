import React from 'react';
import {Card,CardContent, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {lighten} from "@mui/system";

interface IPanel{
	type?: 'primary' | 'secondary';
	title:string
	subtitle:string
}
const StyledCard = styled(Card)<any>(({ theme, type }) => (console.log("typeee",type),{
	border: '1px solid ',
	borderColor: '#b1b4b6',
	boxSizing: 'border-box',
}));

/**
 * Panel Component
 * @author vadim.chilinciuc
 *
 */
export const Panel = ({ type = "primary",title,subtitle}: IPanel) => {

		return (
			<StyledCard type={type}>
				<Card sx={{ backgroundColor:type === 'secondary' ? '#2e5a6019': undefined}}>
					<CardContent>
						<Typography variant={'h3'} fontWeight={900}  gutterBottom>
							{title}
						</Typography>
						<Typography variant={'h4'}  fontWeight={400} >
							{subtitle}
						</Typography>
					</CardContent>
				</Card>
			</StyledCard>


		);


};


