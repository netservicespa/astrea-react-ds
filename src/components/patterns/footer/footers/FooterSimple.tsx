import { FooterProps, ILink } from '@/components/patterns/footer/NsFooter';
import { Box, Grid, Link } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';

/**
 * Footer Simple Component
 * @author vadim.chilinciuc
 */

const Logo = styled('img')({
    boxSizing: 'border-box',
});

const LinkItem = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const theme = useTheme();

    return (
        <Link
            href={href}
            //variant="body2"
            color="inherit"
            sx={{
                mr: 2,
                padding: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0)',
                boxSizing: 'border-box',
                fontFamily: '"Titillium Web", sans-serif',
                color: theme.footer.fontColor,
                fontSize: theme.footer.fontSize,
                fontWeight: theme.footer.fontWeight,
                textAlign: 'center',
                lineHeight: 'normal',
            }}
        >
            {children}
        </Link>
    );
};

export const FooterSimple = ({ logoPath, links }: FooterProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.footer.backgroundColor,
                width: theme.footer.width,
                height: theme.footer.height,
                boxSizing: theme.footer.boxSizing,
                borderTop: theme.footer.borderTop,
                borderColor: theme.footer.borderColor,
            }}
        >
            <Grid
                container
                sx={{
                    p: 2,
                }}
            >
                <Grid
                    size={{
                        xs: 12,
                        sm: logoPath ? 6 : 12,
                        md: logoPath ? 9 : 12,
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            pl: '24px',
                        }}
                    >
                        {links.map((link: ILink) => (
                            <LinkItem key={link.text} href={link.href}>
                                {link.text}
                            </LinkItem>
                        ))}
                    </Box>
                </Grid>
                {logoPath && (
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                mr: '40px',
                            }}
                        >
                            <Logo
                                src={logoPath}
                                alt="logo"
                                sx={{
                                    width: theme.footer?.imageWidth ?? '66px',
                                    height: theme.footer?.imageHeight ?? '73px',
                                }}
                            />
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};
