import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { accordionBackgroundColor } from '../../themes/NetServiceTheme';

export interface NsAccordionProps {
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  typographyProps?: React.ComponentProps<typeof Typography>;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  otherProps?: React.ComponentProps<typeof Accordion>;
}

const StyledAccordion = styled(Accordion)({
  marginBottom: '10px',
});

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor:
    theme?.accordion?.backgroundColor || accordionBackgroundColor,
  paddingLeft: '14px',
  paddingRight: '14px',
  '& .MuiTypography-root': {
    fontWeight: '600',
  },
  '& .Mui-expanded': {
    margin: '12px 0',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)({
  backgroundColor: 'white',
  padding: '16px',
});

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export const NsAccordion: React.FC<NsAccordionProps> = ({
  title,
  content,
  disabled = false,
  icon = <ExpandMoreIcon />,
  typographyProps,
  expanded,
  onChange,
  otherProps,
}) => {
  const slugifiedTitle = toSlug(title);

  return (
    <StyledAccordion
      disabled={disabled}
      expanded={expanded}
      onChange={onChange}
      {...otherProps}
    >
      <StyledAccordionSummary
        expandIcon={icon}
        aria-controls={`${slugifiedTitle}-content`}
        id={`${slugifiedTitle}-header`}
      >
        <Typography {...typographyProps}>{title}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>{content}</StyledAccordionDetails>
    </StyledAccordion>
  );
};
