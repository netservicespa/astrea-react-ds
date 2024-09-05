import { Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { ILink } from '../../../../util/types';
import { FooterProps } from '../NsFooter';

/**
 * Footer Simple Component
 * @author vadim.chilinciuc
 */

const Logo = styled('img')({
    height: '73px',
    width: '66px',
    boxSizing: 'border-box',
});

const LinkItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
    return (
        <Link
            href={href}
            variant="body2"
            color="inherit"
            sx={{
                mr: 2,
                padding: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                boxSizing: 'border-box',
                fontFamily: '"Titillium Web", sans-serif',
                color: '#000000',
                textAlign: 'center',
                lineHeight: 'normal',
            }}
        >
            {children}
        </Link>
    );
};

export const FooterSimple = ({ logoPath, links }: FooterProps) => {
    return (
        <Box
            sx={{
                backgroundColor: '#ebefef',
                width: '100%',
                boxSizing: 'border-box',
                borderTop: '10px solid white',
            }}
        >
            <Grid container p={2}>
                <Grid item xs={12} sm={6} md={9}>
                    <Box>
                        {links.map((link: ILink) => (
                            <LinkItem key={link.text} href={link.href}>
                                {link.text}
                            </LinkItem>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginRight: '40px',
                        }}
                    >
                        <Logo src={logoPath} alt="logo" />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};
