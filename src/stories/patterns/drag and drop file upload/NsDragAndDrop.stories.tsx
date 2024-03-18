import { Grid, Typography } from '@mui/material';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import React from 'react';
import { NsDragAndDrop } from '../../../components/components/NsDragAndDrop';

/**
 * The DragDrop component allows users to select and upload files easily through a drag-and-drop interface.
 *
 */

const meta: Meta<typeof NsDragAndDrop> = {
  title: 'Patterns/DragDrop',
  component: NsDragAndDrop,
};

export const dragDrop: StoryFn<typeof NsDragAndDrop> = (args) => {
  const [files, setFiles] = React.useState<any[]>([]);

  return (
    <Grid container>
      <Grid item xs={3} md={6}>
        <Typography component="h1" variant="h1" margin={3} padding={0}>
          Upload a File
        </Typography>
        <NsDragAndDrop
          value={files}
          onChange={setFiles}
          displayForm={true}
          multiple={args.multiple}
          loadText={args.loadText ? args.loadText : 'Uploaded Files:'}
        />
      </Grid>
    </Grid>
  );
};

export default meta;
type Story = StoryObj<typeof NsDragAndDrop>;
// export const DragDrop = Template.bind({});
