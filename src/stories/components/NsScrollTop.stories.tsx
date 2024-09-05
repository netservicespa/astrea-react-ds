import React from 'react';
import { NsScrollTop } from 'src/components/components/NsScrollTop';
import { Box } from '@mui/system';

export default {
    title: 'Components/ScrollTop',
    component: NsScrollTop,
    argTypes: {},
};

const Template = (args) => {
    return (
        <NsScrollTop {...args}>
            <Box
                sx={{
                    height: '300px',
                    width: '200px',
                    overflow: 'auto',
                }}
            >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet
                    euismod diam, non egestas tellus. Vivamus dictum orci quis est
                    eleifend, sit amet molestie arcu molestie. Fusce tristique justo vitae
                    pharetra imperdiet. Fusce enim est, convallis a condimentum sed,
                    tincidunt sed magna. Maecenas mauris dolor, semper in condimentum a,
                    auctor eu dolor. Integer volutpat mauris at aliquet vehicula. Morbi in
                    justo sed mi interdum ultricies. Aliquam erat volutpat. Curabitur
                    cursus in tellus a tincidunt. Morbi mollis leo nibh, ut sodales metus
                    convallis sed.
                </p>
            </Box>
        </NsScrollTop>
    );
};

export const Default = Template.bind({});
Default.args = {
    buttonText: true,
    opacity: 0.7,
    side: 'left',
};
