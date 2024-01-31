import React from 'react';

import {styled} from "@mui/material/styles";
import {css} from "@emotion/react";
import {Box, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const HeaderContainer = styled('header')(
	({theme}) => css`
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      font-family: ${theme.typography.fontFamily};
	`
);

const NavigationContainer = styled('div')(
	({theme, configurations}: any) => css`
      display: flex;
      justify-content: space-between;
      background-color: ${!configurations?.backgroundColor ? theme?.header?.menuBackgroundColor : configurations.backgroundColor};
      margin-bottom: 30px;
      padding: 6px 8px;

      nav {
        display: flex;
        justify-content: flex-start;

        span {
          padding: 4px 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          color: ${!configurations?.color ? '#1c3538' : configurations.color};
        }

        a {
          padding: 4px 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          color: ${!configurations?.color ? '#1c3538' : configurations.color};
          text-decoration: none;

          &:hover {
            color: rgba(255, 255, 255, 0.53);
          }

          &:focus {
            background: #ffe300;
            position: relative;

            &:after {
              content: '';
              display: inline-block;
              height: 3px;
              width: 100%;
              background: black;
              position: absolute;
              left: 0;
              bottom: 0;
            }
          }
        }
      }
	`
);
const AuthContainer = styled('div')(
	() => css`
      display: flex;
      justify-content: space-between;
      padding: 6px;
	`
);

/**
 * Page Header
 * @author vadim.chilinciuc
 */

export interface PageHeaderProps {
	/**
	 * The `pageData` object is used to configure the Page Header.
	 * It enables you to specify a logo, title, subtitle, and optionally include additional buttons, which can be defined in the `pageHeaderButton` array.
	 * For each extra button, provide an object containing a `childComponent` and a `handleFunction`.
	 */
	pageData: {
		logoPath: string;
		title: string;
		subtitle: string;
		pageHeaderButton: {
			childComponent: any;
			handleFunction: () => void;
		}[];
	};
	/**
	 * Callback function invoked when the "CloseIcon" is clicked.
	 */

	onClose: void;
	/**
	 * Additional configuration options for adjusting details like background color and text color.
	 */

	configuration?: {
		backgroundColor: string;
		color: string;
	};
}


export const PageHeader = ({pageData, configuration, onClose}: PageHeaderProps) => {

	return (
		<HeaderContainer>
			<NavigationContainer configurations={configuration}>
				<nav aria-label="Menu principale">
					{pageData.logoPath ? <Box
						component="img"
						sx={{
							height: 60,
							width: 60,
							maxHeight: {xs: 25, md: 55},
							maxWidth: {xs: 25, md: 55},
						}}
						src={pageData.logoPath}
					/> : null}
					<span>
						<Typography variant={'h1'} fontWeight={700} sx={{fontFamily: ["Titillium Web"]}}>
							{pageData.title}
						</Typography>
					</span>
					<span>
						<Typography variant={'h4'} fontWeight={700}
									sx={{fontFamily: ["Titillium Web"]}}>
							{pageData.subtitle}
						</Typography>

					</span>

					{pageData && pageData?.pageHeaderButton.map((item: any) => (
						<a onClick={item?.handleFunction} style={{cursor: 'pointer'}}>
							{item?.childComponent}
						</a>
					))}
				</nav>
			</NavigationContainer>

		</HeaderContainer>
	);
};


