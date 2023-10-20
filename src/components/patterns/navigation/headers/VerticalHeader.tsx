import * as React from 'react';
import {Box, ButtonBase, List, ListItem, ListItemIcon, ListItemText,} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {styled} from '@mui/material/styles';
import {css} from '@emotion/react';
import {HeaderProps} from 'src/util/types';
import {DynamicLink} from "../../../components/Dropdown/DropDown";

/**
 * Vertical Header Component
 * @author mustapha.aoussar , vadim.chilinciuc
 */

const VerticalHeaderContainer = styled('div')(
	({theme}) => css`
      font-family: 'Titillium Web', sans-serif;
      background-size: cover;
      background-position: center;
      max-width: 150px;
      display: flex;
      flex-direction: column;
      height: 100vh;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${theme.header.menuBackgroundColor};
        opacity: 0.8;
      }
	`
);

const LogoContainer = styled('div')(
	({theme}) => css`
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px 0;
      position: relative;
      background: ${theme.header.backgroundColor};
      border-bottom: 8px solid ${theme.header.borderColor};

      svg {
        max-width: 70px;
      }
	`
);

const StyledButtonBase = styled(ButtonBase)`
  border-radius: 6px;
  padding: 10px !important;
  width: 100%;
  color: #1c3538;

  &:hover,
  &:active {
    background: #fff;
    border-radius: 6px;
  }

  .MuiListItemText-root,
  .MuiSvgIcon-root {
    color: black !important;
  }

  &:hover .MuiListItemText-root,
  &:hover .MuiSvgIcon-root,
  &:active .MuiListItemText-root {
    color: black !important;
  }
`;

const SmallText = styled('small')(
	() => css`
      font-size: 9px;
      color: #1c3538;
	`
);

export default function VerticalHeader({menuItems, logo, router}: HeaderProps) {
	return (
		<VerticalHeaderContainer>
			<LogoContainer>
				{logo ?? (
					<svg
						version="1.1"
						id="Livello_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 300.1 300"
						xmlSpace="preserve"
					>
						<path
							fill="#FFFFFF"
							className="st0"
							d="M227.2,77.4c-42.4,0-39.9,30.5-17.6,41.2c24.2,9.1,20.7,8.3,49.7,21.8c24.4,14.1,40,31,40.7,55.5V63
							c-1.2,4-12.5,30.7-13.7,32.5C272.3,89.2,247.6,75.3,227.2,77.4z"
						/>
						<path
							fill="#FFFFFF"
							className="st0"
							d="M0.1,40.7L0.1,40.7l36.5,0c0,0,80.3,100.8,130.6,159c57.3,56,126.4-2.1,80-25.4c-43.3-21.8-76.9-24.1-88.4-59
							c-13.5-62.9,38-76.6,73.9-74.8c33.6,1.4,53.6,16.7,67.3,22.3V0H0v40.7H0.1z"
						/>
						<path
							fill="#FFFFFF"
							className="st0"
							d="M299.6,205.1c-2.6,23.2-31.1,54.5-75.8,54.5c-65.9,0-85.3-37.7-103.6-59.9c-22.2-26.9-83.6-101-83.6-101v160.9
							H0.1v0H0V300h300V199.7C300,201.5,299.8,203.3,299.6,205.1z"
						/>
					</svg>
				)}
			</LogoContainer>
			<List>
				{menuItems?.map((item) => (
					<ListItem key={item.name}>
						<StyledButtonBase>
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								justifyContent="center"
							>
								<DynamicLink router={router} to={item.path}>
									<div>
										<ListItemIcon style={{justifyContent: 'center'}}>
											{item.icon || <HomeIcon/>}
										</ListItemIcon>
										<ListItemText primary={item.name} style={{color: '#FFF'}}/>
									</div>
								</DynamicLink>
							</Box>
						</StyledButtonBase>
					</ListItem>
				))}
			</List>
			<Box sx={{flex: 1}}></Box>
			<List>
				<ListItem>
					<StyledButtonBase>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							justifyContent="center"
						>
							<ListItemIcon style={{justifyContent: 'center'}}>
								<ExitToAppIcon style={{color: '#FFF'}}/>
							</ListItemIcon>
							<ListItemText primary="Esci" style={{color: '#FFF'}}/>
						</Box>
					</StyledButtonBase>
				</ListItem>
			</List>
		</VerticalHeaderContainer>
	);
}
