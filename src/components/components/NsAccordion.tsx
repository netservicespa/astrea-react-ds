import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { accordionBackgroundColor } from '../../themes/NetServiceTheme';

export interface NsAccordionDetailsProps {
  children: React.ReactNode;
}

export interface NsAccordionProps {
  title: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  typographyProps?: React.ComponentProps<typeof Typography>;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  otherProps?: React.ComponentProps<typeof Accordion>;
  children: React.ReactNode;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  marginBottom: '10px',
  '& .Mui-disabled': {
    color: '#ffffff !important',
    backgroundColor: '#a5a5a5',
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor:
    theme?.accordion?.backgroundColor || accordionBackgroundColor,
  paddingLeft: '14px',
  paddingRight: '14px',
  border: '1px solid #E1E1E1',
  '&:active': {
    boxShadow: `0 0 0 3px ${theme.palette.focus.main}`,
  },
  '&:hover': {
    color: '#2E5A60 ',
    textDecoration: 'underline',
  },
  '& .MuiTypography-root': {
    fontWeight: '600',
    letterSpacing: '0.4px',
  },
  '& .Mui-expanded': {
    margin: '12px 0',
    color: '#2E5A60 ',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: 'white',
  borderWidth: '0 1px 1px 1px',
  borderStyle: 'solid',
  borderColor: theme.palette.borderColor.main,
  padding: '16px',
  '& .MuiTypography-root': {
    fontSize: '1.25rem !important',
  },
}));

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export const NsAccordionDetails: React.FC<NsAccordionDetailsProps> = ({ children }) => {
  return (
    <StyledAccordionDetails>
      {children}
    </StyledAccordionDetails>
  );
};

export const NsAccordion: React.FC<NsAccordionProps> = ({
  title,
  disabled = false,
  icon,
  expandIcon = <ExpandMoreIcon />,
  typographyProps,
  expanded,
  onChange,
  otherProps,
  children,
}) => {
  const slugifiedTitle = toSlug(title);

  const content = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === NsAccordionDetails) {
      return child;
    }
    return <StyledAccordionDetails>{child}</StyledAccordionDetails>;
  });

  return (
    <StyledAccordion
      disabled={disabled}
      expanded={expanded}
      onChange={onChange}
      {...otherProps}
    >
      <StyledAccordionSummary
        expandIcon={expandIcon}
        aria-controls={`${slugifiedTitle}-content`}
        id={`${slugifiedTitle}-header`}
      >
        {icon && <div style={{ marginRight: '8px' }}>{icon}</div>}
        <Typography {...typographyProps}>{title}</Typography>
      </StyledAccordionSummary>
      {content}
    </StyledAccordion>
  );
};