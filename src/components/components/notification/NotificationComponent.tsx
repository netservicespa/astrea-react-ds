import React, {useState} from 'react';
import {Badge, Box, Button, List, ListItem, ListItemIcon} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {TabsComponent} from '../../../components/components/tabs/Tabs';
import { IReadWrite} from 'src/util/types';

/**
 * Notification Component
 * @author vadim.chilinciuc
 */



export interface INotificationData {
	/**
	 * The clickable element (e.g., icon, div, component) that triggers the Notification Dropdown.
	 */
	children: React.ReactElement;
	/**
	 * An object containing the notification data, including both read and unread notifications.
	 */
	notificationData: {
		read: IReadWrite[];
		unread: IReadWrite[];
	};
}


/**
 * Notifaction status
 */

const Status = {
	valid: 'valid',
	invalid: 'invalid',
};

const MainNotificationDiv = ({data, isReadUnread}: any) => {
	const readOrUnread = isReadUnread === 'READ' ? 'read' : 'unread';

	return (
		<List
			sx={{
				width: '364px',
				border: '1px solid #b1b4b6',
				backgroundColor: '#ffffff',
				boxSizing: 'border-box',
				p: 3,
			}}
		>
			{isReadUnread === 'READ' ? (
				<div style={{fontSize: '24px'}}>Read Notification</div>
			) : (
				<div key={'x'} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<div style={{fontSize: '24px'}}>Unread Notification</div>
					<Badge style={{marginRight: '8px'}} badgeContent={data?.unread?.length} color="error"/>
				</div>
			)}

			{data[readOrUnread].map((item: any, index: number) => {
				return <ListItem key={index} divider
								 style={{display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
					<ListItemIcon>
						{item.status === Status.valid ? <CheckCircleIcon color={'primary'}/> :
							<ErrorOutlineIcon color={'error'}/>}
					</ListItemIcon>
					<a href="/" style={{fontSize: '16px', textAlign: 'center'}}>
						{item.text}
					</a>
				</ListItem>
			})}


			{isReadUnread === 'UNREAD' ? (
				<Button sx={{width: '100%', fontSize: '18px', textDecoration: 'underline'}} onClick={() => {
				}}>
					Mark all as read
				</Button>
			) : (
				<></>
			)}
		</List>
	);
};

export const NotificationComponent = ({notificationData, children}: INotificationData) => {
	const [isOpenNotification, setIsOpenNotification] = useState(false);

	const tabs = [
		{
			label: `Unread (${notificationData.unread.length})`,
			children: <MainNotificationDiv data={notificationData} isReadUnread={'UNREAD'}/>
		},
		{
			label: `Read (${notificationData.read.length})`,
			children: <MainNotificationDiv data={notificationData} isReadUnread={'READ'}/>
		},
	];

	return (
		<>
			{!isOpenNotification ? (
				<Box sx={{width: '364px', height: '40px'}}>
					<div onClick={() => setIsOpenNotification(!isOpenNotification)}
						 style={{textAlign: 'right', cursor: 'pointer'}}>
						<Badge style={{marginRight: '5px'}} badgeContent={notificationData?.unread?.length}
							   color="error">
							{children}
						</Badge>
					</div>
				</Box>
			) : (
				<>
					<Box sx={{width: '364px', height: '40px'}}>
						<div onClick={() => setIsOpenNotification(!isOpenNotification)}
							 style={{textAlign: 'right', cursor: 'pointer'}}>
							<Badge style={{marginRight: '5px'}} badgeContent={notificationData?.unread?.length}
								   color="error">
								{children}
							</Badge>
						</div>
						<TabsComponent tabs={tabs} configuration={{centered: true, boxBorder: '1px solid #b1b4b6'}}/>
					</Box>
				</>)
			}
		</>
	);
};
