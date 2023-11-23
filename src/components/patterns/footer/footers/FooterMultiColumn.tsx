import { Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { GridLayout } from '../../../../components/layout/GridLayout';
import { FooterProps } from 'src/components/patterns/footer/NsFooter';

/**
 * Footer Multi Column Component
 * @author vadim.chilinciuc
 */

const Logo = styled('img')({
  height: '73px',
  width: '66px',
  boxSizing: 'border-box',
});

const LinkItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
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
        textAlign: 'left',
        lineHeight: 2,
        fontSize: '20px',
        textTransform: 'none',
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  );
};

const LineBox = () => {
  return (
    <Box
      sx={{
        borderBottom: 2,
        borderColor: 'divider',
        marginBottom: '10px',
        borderBottomColor: '#000',
        width: '85px',
      }}
    />
  );
};

const FooterMultiColumn = ({ logoPath, columns, rowSize }: FooterProps) => {
  return (
    <>
      <Box sx={{ backgroundColor: '#ebefef' }}>
        <Box p={2}>
          <Logo src={logoPath} alt="logo" />
        </Box>
        <Grid container p={2}>
          <GridLayout rowSize={rowSize}>
            {columns &&
              columns?.map((column: any, id: number) => {
                return (
                  <div key={id}>
                    <h1
                      style={{
                        alignItems: 'left',
                        marginBottom: '10px',
                        fontWeight: '600',
                      }}
                    >
                      {column.title ? column.title : <>&nbsp;</>}
                    </h1>

                    <LineBox />

                    <Box
                      sx={{
                        display: 'grid',
                        alignItems: 'left',
                        float: 'left',
                      }}
                    >
                      {column?.links?.slice(0, 3).map((link: any) => (
                        <LinkItem key={link.text} href={link.href}>
                          <div>{link.text}</div>
                        </LinkItem>
                      ))}
                    </Box>
                  </div>
                );
              })}
          </GridLayout>
        </Grid>
      </Box>
    </>
  );
};

export default FooterMultiColumn;
