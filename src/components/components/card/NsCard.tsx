import * as React from 'react';
import { styled } from '@mui/material/styles';
import { lighten } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActions, CardMedia } from '@mui/material';
import { NsButton } from '../NsButton';

type VariantType = 'flag' | 'classic' | 'clickable';

interface NsCardProps {
  icon?: any;
  title?: string | null;
  subtitle?: string | null;
  mediaImage?: string;
  mediaAlt?: string | null;
  mainText?: string | null;
  subText?: string | null;
  buttons?: any[];
  cardVariant?: VariantType;
}

interface StyledCardProps {
  cardVariant?: VariantType;
}

interface StyledCardContentProps {
  cardVariant?: VariantType;
}

const StyledCard = styled(Card)<StyledCardProps & { isActive: boolean }>(({ theme, cardVariant, isActive }) => ({
  border: '1px solid',
  borderColor: cardVariant === 'clickable' && isActive ? 'transparent' : theme.palette.divider,
  borderLeft: cardVariant === 'flag' ? `3px solid ${theme.palette.secondary.main}` : undefined,
  borderBottom: cardVariant === 'clickable' && isActive ? `3px solid ${theme.palette.primary.main}` : undefined,
  backgroundColor: cardVariant === 'clickable' && isActive ? lighten(theme.palette.primary.main, 0.9) : undefined, // theme.palette.action.selected
}));

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: '16px',
  paddingTop: '0'
}));

const StyledAvatar = styled('div')(({ theme }) => ({
  color: `${theme.palette.primary.main}`,
}));

const StyledCardContent = styled(CardContent)<StyledCardContentProps>(
  ({ cardVariant }) => ({
    paddingTop: cardVariant === 'clickable' ? '0' : undefined,
    paddingBottom: cardVariant === 'clickable' ? '14px !important' : undefined,
  })
);

const StyledH2 = styled(Typography)<StyledCardContentProps>(
  ({ cardVariant }) => ({
    borderBottom: cardVariant === 'clickable' ? '1px solid lightgray' : undefined,
    paddingBottom: cardVariant === 'clickable' ? '5px' : undefined,
  })
);

export function NsCard({
  icon = null,
  title = "",
  subtitle = "",
  mediaImage = '',
  mediaAlt = "Image description",
  mainText = null,
  subText = null,
  buttons = [],
  cardVariant = "classic"
}: NsCardProps) {
  const [isActive, setIsActive] = React.useState(false);

  const handleCardClick = () => {
    if(cardVariant === "clickable") {
      setIsActive(!isActive);
      console.log("Hai cliccato sulla Card!");
    }
  }

  return (
    <StyledCard
      cardVariant={cardVariant}
      isActive={isActive}
      sx={{ maxWidth: 345 }}
      onClick={handleCardClick}
      className={`${cardVariant} ${isActive ? 'active' : ''}`}
    >
      {icon && (
        <CardHeader
          avatar={<StyledAvatar>{icon}</StyledAvatar>}
          title={title}
          subheader={subtitle}
          sx={{ paddingBottom: 0 }}
        />
      )}
      
      {mediaImage && (
        <CardMedia
          component="img"
          height="194"
          image={mediaImage || undefined}
          alt={mediaAlt || ""}
        />
      )}

      <StyledCardContent cardVariant={cardVariant}>
        {mainText && (
          <StyledH2 cardVariant={cardVariant} variant="h2" mb={2}>{mainText}</StyledH2>
        )}

        {subText && (
          <Typography variant="body2">{subText}</Typography>
        )}
      </StyledCardContent>

      {buttons.length > 0 && (
        <StyledCardActions disableSpacing>
          {buttons.map((btn: any, index: number) => (
            <NsButton 
              key={btn.label} 
              onClick={btn.onClick} 
              color={btn.color ? btn.color : 'primary'}
              size="small" 
              style={{ marginRight: index === buttons.length - 1 ? 0 : 10 }}
            >
              {btn.label}
            </NsButton>
          ))}
        </StyledCardActions>
      )}
    </StyledCard>
  );
}
