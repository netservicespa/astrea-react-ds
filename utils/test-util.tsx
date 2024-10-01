import React, { PropsWithChildren } from 'react';
import { Queries, render as originalRender, RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { theme } from 'src/themes/NetServiceTheme';
import { I18nextProvider } from 'react-i18next';
import i18n from '__mocks__/i18nForTests';

const AllTheProviders: React.FC<PropsWithChildren<unknown>> = ({
    children,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </ThemeProvider>
    );
};

function customRender<
    Q extends Queries,
    Container extends Element | DocumentFragment = HTMLElement,
    BaseElement extends Element | DocumentFragment = Container
>(
    ui: React.ReactNode,
    options?: RenderOptions<Q, Container, BaseElement>,
): RenderResult<Q, Container, BaseElement> {
    return originalRender(ui, { wrapper: AllTheProviders, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
