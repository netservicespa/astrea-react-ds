import React from 'react';
import { styled } from '@mui/material/styles';

export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

const StyledSkipLink = styled('a')(({ theme }) => ({
    fontSize: '1rem',
    lineHeight: '1.25',
    padding: '10px 15px',
    background: `${theme.palette.focus.main}`,
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    color: '#000',
    zIndex: 1000,
    transition: 'top 0.2s',
    '&:focus': {
      top: '0',
    },
}));

const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => (
  <StyledSkipLink className="skip-link" href={href}>
    {children}
  </StyledSkipLink>
);

export default SkipLink;