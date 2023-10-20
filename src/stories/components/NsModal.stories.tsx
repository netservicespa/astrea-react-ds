import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsModal, NsModalProps } from '../../components/components/NsModal';

export default {
	title: 'Components/Modal',
	component: NsModal,
} as Meta;

const Template: StoryFn<NsModalProps> = (args) => (
	<NsModal {...args} />
);

export const BasicModal = Template.bind({});
BasicModal.args = {
    title: 'Title',
    content: 'Example of paragraph',
    showCancelButton: false,
    showConfirmButton: false,
};
export const ActionsModal = Template.bind({});
ActionsModal.args = {
    title: 'Title of the modal',
    content: 'Example of a paragraph that contains information and details to take an action or cancel it',
    onConfirm: () => alert('Confirmed!'),
    showCancelButton: true,
    showConfirmButton: true,
};
export const SidebarModal = Template.bind({});
SidebarModal.args = {
    title: 'Titolo Drawer',
    content: 'Contenuto del drawer.',
    useDrawer: true,
    drawerPosition: 'right',
    showCancelButton: false,
    showConfirmButton: false,
};
export const FullscreenModal = Template.bind({});
FullscreenModal.args = {
    title: 'Titolo Modal a Schermo Intero',
    content: 'Contenuto della modal a schermo intero.',
    fullScreen: true,
    showCancelButton: true,
    showConfirmButton: true,
};