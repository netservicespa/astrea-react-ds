import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsModal, NsModalProps } from 'src/components/components/modals/NsModal';
import { Box, Container } from '@mui/system';

// export default {
//     title: 'Components/Modal',
//     component: NsModal,
// } as Meta;

const meta: Meta<NsModalProps> = {
    title: 'Components/Modal',
    component: NsModal,
    parameters: {
        docs: {
            source: {
                type: 'code',
                code: '<NsModal {...args} />',
            },
        },
    },
    // argTypes: {
    //     variant: {
    //         label: 'Variant',
    //         control: { type: 'radio' },
    //         options: ['text', 'outlined', 'contained'],
    //     },
    //     color: {
    //         label: 'Color',
    //         control: { type: 'radio' },
    //         options: ['primary', 'secondary', 'success', 'error'],
    //     },
    //     disabled: {
    //         label: 'Disabled',
    //         control: { type: 'boolean' },
    //         defaultValue: false,
    //     },
    //     size: {
    //         label: 'Size',
    //         control: { type: 'radio' },
    //         options: ['small', 'medium', 'large'],
    //     },
    // },
};
export default meta;

const TemplateInsidePage: StoryFn<NsModalProps> = (args) => {
    // const containerRef = useRef<HTMLDivElement>(null);
    // const [containerReady, setContainerReady] = useState(false);

    // useEffect(() => {
    //   // Imposta il container quando il componente è montato
    //   if (containerRef.current) {
    //     setContainerReady(true);
    //   }
    // }, []);

    // const otherProps = containerReady ? { container: containerRef.current } : {};

    const containerRef = useRef(null);
    return (
        <Container fixed>
            <Box sx={{ bgcolor: '#cfe8fc', height: '100px' }}>
                <div ref={containerRef}></div>

                <NsModal {...args} otherProps={{ container: containerRef.current }} />
                {/* <NsModal {...args} otherProps={otherProps} /> */}
            </Box>
        </Container>
    );
};

const Template: StoryFn<NsModalProps> = (args) => <NsModal {...args} />;

export const TestModal = TemplateInsidePage.bind({});
TestModal.args = {
    title: 'Modal',
    content: 'this Modal does not need any action to be opened and has a custom width',
    showCancelButton: false,
    showConfirmButton: false,
    externalOpen: true,
    openFromParent: true,
    width: '600px',
};
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
