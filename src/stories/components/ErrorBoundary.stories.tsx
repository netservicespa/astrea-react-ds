import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { ErrorBoundary } from 'src/components/error/ErrorBoundary';
import { FallbackPage } from 'src/components/error/FallbackPage';
import { Button, Container } from '@mui/material';

export default {
    title: 'Tools/ErrorBoundary',
    component: ErrorBoundary,
} as Meta<typeof ErrorBoundary>;

const Template: StoryFn<typeof ErrorBoundary> = () => {
    return (
        <ErrorBoundary FallbackComponent={FallbackPage}>
            <Container>
                <BuggyChild />
            </Container>
        </ErrorBoundary>
    );
};

class BuggyChild extends React.Component<{}, { explode: boolean }> {
    constructor(props) {
        super(props);
        this.state = { explode: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(() => ({
            explode: true,
        }));
    }

    render() {
        if (this.state.explode) {
            throw new Error('Explode!');
        }
        return (
            <Button variant="contained" color="error" onClick={this.handleClick}>
                EXPLODE!
            </Button>
        );
    }
}

export const Boundary = Template.bind({});
