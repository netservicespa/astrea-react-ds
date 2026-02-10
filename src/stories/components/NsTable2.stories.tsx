// NsTable.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsTable2, NsTableColumn } from '../../components/components/NsTable2';
import { Stack, Typography } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';

export default {
    title: 'Components/Table Classic 2',
    component: NsTable2,
    argTypes: {
        onFrameClick: { action: 'onFrameClick' },
    },
} as Meta;

const Template: StoryFn<typeof NsTable2> = (args) => <NsTable2 {...args} />;

interface TestPerson {
    nome: string;
    cognome: string;
    codiceFiscale: string;
}

export const Default = Template.bind({});
Default.args = {
    data: [
        {
            nome: 'nome#1',
            cognome: 'cognome#1',
            codiceFiscale: 'codiceFiscale#1',
        },
        {
            nome: 'nome#2',
            cognome: 'cognome#2',
            codiceFiscale: 'codiceFiscale#2\n SSRMTP92M24A000L',
        },
    ] as TestPerson[],
    columns: [
        {
            key: 'nome',
            header: 'Nome',
        },
        {
            key: 'cognome',
            header: 'Cognome',
        },
        {
            key: 'codiceFiscale',
            header: (
                <Stack direction="row">
                    <QrCodeIcon sx={{ mr: 2 }} />
                    <Typography variant="h3" component="h2">
                        Codice Fiscale
                    </Typography>
                </Stack>
            ),
        },
    ] as NsTableColumn<TestPerson>[],
};
