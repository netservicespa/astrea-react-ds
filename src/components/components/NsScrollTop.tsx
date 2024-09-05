import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button as NsButton, Box } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { styled } from '@mui/system';

export interface NsScrollTopProps {
    children: any;
    buttonText?: boolean;
    opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
    side?: 'left' | 'right';
}

const StyledNsButton = styled(NsButton)(({ theme, color, variant }) => ({
    color: color,
    variant: variant,
    bottom: 0,
    position: 'absolute',
    marginRight: '30px',
    marginBottom: '30px',
}));

export const NsScrollTop: React.FC<NsScrollTopProps> = ({ children, buttonText, opacity, side = 'right' }) => {
    const { t } = useTranslation();
    const divRef = React.useRef<HTMLDivElement>();
    const child = React.cloneElement(children, { ref: divRef });
    const goToTopPage = () => {
        divRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{}}>
            {child}
            <StyledNsButton onClick={goToTopPage} sx={{ opacity: opacity, [side]: 0 }}>
                {/* opacity={opacity} side={side} */}
                {buttonText ? t('scrollTop.goUp') : <KeyboardDoubleArrowUpIcon />}
            </StyledNsButton>
        </Box>
    );
};
