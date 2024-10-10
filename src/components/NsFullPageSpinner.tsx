import * as React from 'react';
import { Backdrop, CircularProgress, circularProgressClasses, Typography, Box } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export type NsFullPageSpinnerProps = {
    isOpen: boolean;
    value: number;
    variant?: 'determinate' | 'indeterminate';
    backdropColor?: string;
};

const StyledBackdrop = styled(Backdrop, {
    shouldForwardProp: (prop) => prop !== 'backdropColor',
})<any>(({ theme, backdropColor }) => ({
    color: '#fff',
    zIndex: theme.zIndex.appBar + 1,
    backgroundColor: backdropColor ? alpha(backdropColor, 0.7) : alpha(theme.palette.primary.main, 0.7),
}));

const SpinnerContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const PositionedBox = styled(Box)<any>(({ theme, colorStyle }) => ({
    position: 'relative',
    display: 'inline-flex',
    ...colorStyle,
}));

const StyledTypography = styled(Typography)({
    fontWeight: 700,
    fontSize: '1.2rem',
});

const CenteredBox = styled(Box)(({ theme }) => ({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const WaitingText = styled(Typography)({
    marginTop: '16px',
});

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
    [`& .${circularProgressClasses.circle}`]: {
        strokeWidth: '3px',
    },
}));

const getColorStyle = (color: string) => {
    if (color === 'white') {
        return { color: '#ffffff' };
    }
    return {};
};

export const NsFullPageSpinner: React.FC<NsFullPageSpinnerProps> = (props) => {
    const { t } = useTranslation();
    const { isOpen, value, variant = 'indeterminate', backdropColor, ...otherProps } = props;

    const shouldShowPercentage = variant === 'determinate';
    return (
        <StyledBackdrop open={isOpen} backdropColor={backdropColor} {...otherProps}>
            <SpinnerContainer>
                <PositionedBox>
                    <StyledCircularProgress
                        size={70}
                        variant={variant}
                        value={variant === 'determinate' ? value : undefined}
                    />
                    {shouldShowPercentage && (
                        <CenteredBox>
                            <StyledTypography variant="caption">{`${Math.round(value)}%`}</StyledTypography>
                        </CenteredBox>
                    )}
                </PositionedBox>
                <WaitingText variant="h6">{t('spinner.loading')}</WaitingText>
            </SpinnerContainer>
        </StyledBackdrop>
    );
};
