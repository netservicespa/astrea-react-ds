import * as React from 'react';
import { styled } from '@mui/material/styles';
import { lighten } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button as NsButton, CardActions, CardMedia } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

type VariantType = 'flag' | 'classic' | 'clickable';
type CardButtonProps = Pick<ButtonProps, 'color' | 'size' | 'onClick'> & { label?: string };

interface NsBasicCardProps extends CommonBaseType {
    type: 'basic';
    title?: React.ReactNode;
    children?: React.ReactNode;
    buttons?: Array<CardButtonProps>;
    cardVariant?: VariantType;
    sx?: object;
}

interface NsMediaCardProps extends CommonBaseType {
    type: 'media';
    title?: React.ReactNode;
    children?: React.ReactNode;
    mediaImage?: string;
    mediaAlt?: string;
    cardVariant?: VariantType;
    sx?: object;
}

interface NsActionsCardProps extends CommonBaseType {
    type: 'actions';
    title?: React.ReactNode;
    children?: React.ReactNode;
    mediaImage?: string;
    mediaAlt?: string;
    buttons?: Array<CardButtonProps>;
    cardVariant?: VariantType;
    sx?: object;
}

interface NsClickableCardProps extends CommonBaseType {
    type: 'clickable';
    icon?: React.ReactNode;
    title?: React.ReactNode;
    children?: React.ReactNode;
    buttons?: Array<CardButtonProps>;
    cardVariant?: VariantType;
    sx?: object;
}

interface CommonBaseType {}

export type NsCardProps = NsBasicCardProps | NsMediaCardProps | NsActionsCardProps | NsClickableCardProps;

interface StyledCardProps {
    cardVariant?: VariantType;
}

interface StyledCardContentProps {
    cardVariant?: VariantType;
}

const StyledCard = styled(Card, { shouldForwardProp: (prop) => prop !== 'cardVariant' && prop !== 'isActive' })<
    StyledCardProps & { isActive: boolean }
>(({ theme, cardVariant, isActive }) => ({
    border: '1px solid',
    borderColor: cardVariant === 'clickable' && isActive ? 'transparent' : theme.palette.divider,
    borderLeft: cardVariant === 'flag' ? `3px solid ${theme.palette.secondary.main}` : undefined,
    borderBottom: cardVariant === 'clickable' && isActive ? `3px solid ${theme.palette.primary.main}` : undefined,
    backgroundColor: cardVariant === 'clickable' && isActive ? lighten(theme.palette.primary.main, 0.9) : undefined,
}));

const StyledCardActions = styled(CardActions)(() => ({
    padding: '16px',
    paddingTop: '0',
}));

const StyledAvatar = styled('div')(({ theme }) => ({
    color: `${theme.palette.primary.main}`,
}));

const StyledCardContent = styled(CardContent, {
    shouldForwardProp: (prop) => prop !== 'cardVariant',
})<StyledCardContentProps>(({ cardVariant }) => ({
    paddingTop: cardVariant === 'clickable' ? '0' : undefined,
    paddingBottom: cardVariant === 'clickable' ? '14px !important' : undefined,
}));

const StyledH2 = styled(Typography, { shouldForwardProp: (prop) => prop !== 'cardVariant' })<StyledCardContentProps>(
    ({ cardVariant }) => ({
        borderBottom: cardVariant === 'clickable' ? '1px solid lightgray' : undefined,
        paddingBottom: cardVariant === 'clickable' ? '5px' : undefined,
    }),
);
const CardContentTemplate: React.FC<{
    title: React.ReactNode;
    children: React.ReactNode;
    cardVariant: VariantType;
}> = ({ title, children, cardVariant }) => {
    return (
        <StyledCardContent cardVariant={cardVariant}>
            <StyledH2 cardVariant={cardVariant} variant="h2" mb={2}>
                {title}
            </StyledH2>
            {children}
        </StyledCardContent>
    );
};
const CardActionsTemplate: React.FC<{
    buttons: Array<CardButtonProps>;
}> = ({ buttons }) => {
    return (
        <StyledCardActions disableSpacing>
            {buttons.map((btn: CardButtonProps, index: number) => (
                <NsButton
                    key={btn.label}
                    onClick={btn.onClick}
                    color={btn.color ? btn.color : 'primary'}
                    size={btn.size ? btn.size : 'small'}
                    style={{ marginRight: index === buttons.length - 1 ? 0 : 10 }}
                >
                    {btn.label}
                </NsButton>
            ))}
        </StyledCardActions>
    );
};
const NsBasicCard = ({ title = '', children = <></>, buttons = [], cardVariant = 'classic' }: NsBasicCardProps) => {
    return (
        <>
            <CardContentTemplate title={title} cardVariant={cardVariant}>
                {children}
            </CardContentTemplate>
            <CardActionsTemplate buttons={buttons} />
        </>
    );
};

const NsMediaCard = ({
    title = '',
    children = <></>,
    cardVariant = 'classic',
    mediaImage,
    mediaAlt,
}: NsMediaCardProps) => {
    return (
        <>
            {mediaImage && <CardMedia component="img" height="194" image={mediaImage} alt={mediaAlt || ''} />}
            <CardContentTemplate title={title} cardVariant={cardVariant}>
                {children}
            </CardContentTemplate>
        </>
    );
};
const NsActionsCard = ({
    title = '',
    children = <></>,
    buttons = [],
    cardVariant = 'classic',
    mediaImage,
    mediaAlt,
}: NsActionsCardProps) => {
    return (
        <>
            {mediaImage && <CardMedia component="img" height="194" image={mediaImage} alt={mediaAlt || ''} />}
            <CardContentTemplate title={title} cardVariant={cardVariant}>
                {children}
            </CardContentTemplate>
            <CardActionsTemplate buttons={buttons} />
        </>
    );
};

const NsClickableCard = ({ icon, title = '', cardVariant = 'classic', children = <></> }: NsClickableCardProps) => {
    return (
        <>
            {icon && <CardHeader avatar={<StyledAvatar>{icon}</StyledAvatar>} sx={{ paddingBottom: 0 }} />}
            <CardContentTemplate title={title} cardVariant={cardVariant}>
                {children}
            </CardContentTemplate>
        </>
    );
};

export function NsCard(props: NsCardProps, { ...rest }) {
    const [isActive, setIsActive] = React.useState(false);

    const handleCardClick = () => {
        if (props.cardVariant === 'clickable') {
            setIsActive(!isActive);
        }
    };
    const renderCard = () => {
        switch (props.type) {
            case 'basic':
                return <NsBasicCard {...props} />;
            case 'media':
                return <NsMediaCard {...props} />;
            case 'actions':
                return <NsActionsCard {...props} />;
            case 'clickable':
                return <NsClickableCard {...props} />;

            default:
                return <></>;
        }
    };
    return (
        <StyledCard
            cardVariant={props.cardVariant}
            isActive={isActive}
            onClick={handleCardClick}
            className={`${props.cardVariant} ${isActive ? 'active' : ''}`}
            sx={props.sx}
            {...rest}
        >
            {renderCard()}
        </StyledCard>
    );
}
