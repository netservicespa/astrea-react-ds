// NsTable.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NsTable } from '../../components/components/NsTable';

export default {
  title: 'Components/Table Classic',
  component: NsTable,
  argTypes: {
    onFrameClick: { action: 'onFrameClick' }
  }
} as Meta;

const Template: StoryFn<any> = (args) => <NsTable {...args} />;

export const Default = Template.bind({});
Default.args = {
    rows: [
        {
            nome: 'nome#1',
            cognome: 'cognome#1',
            codiceFiscale: 'codiceFiscale#1',
        },
        {
            nome: 'nome#2',
            cognome: 'cognome#2',
            codiceFiscale: 'codiceFiscale#2 <br> SSRMTP92M24A000L',
        },
    ],
    columns: [
        {
            id: 'nome',
            label: 'Nome',
            align: 'left',
            fontSize: '20px',
            // renderBodyCell: renderData,  // optional
        },
        {
            id: 'cognome',
            label: 'Cognome',
            align: 'left',
            fontSize: '20px',
        },
        {
            id: 'codiceFiscale',
            label: 'Codice Fiscale',
            align: 'left',
            fontSize: '20px',
        },
    ]
};
