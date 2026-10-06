import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export type LinkItem = {
  name: string;
  href: string;
};

export interface NsBreadcrumbsProps {
  linkItems: LinkItem[];
  title: string;
  separator?: React.ReactNode;
  maxItems?: number;
  linkUnderline?: MuiLinkProps['underline'];
  renderLink?: (item: LinkItem, index: number) => React.ReactNode;
}

export const NsBreadcrumbs = ({
  linkItems,
  linkUnderline = 'hover',
  separator = <NavigateNextIcon fontSize="small" />,
  title,
  maxItems,
  renderLink,
}: NsBreadcrumbsProps) => {
  const renderDefaultLink = React.useCallback(
    (item: LinkItem, index: number) => (
      <Link
        key={item.name ?? index}
        underline={linkUnderline}
        color="inherit"
        href={item.href}
        style={{ fontWeight: '700' }}
      >
        {item.name}
      </Link>
    ),
    [linkUnderline]
  );

  const renderItem = React.useCallback(
    (item: LinkItem, index: number) =>
      renderLink ? renderLink(item, index) : renderDefaultLink(item, index),
    [renderLink, renderDefaultLink]
  );

  return (
    <Breadcrumbs
      maxItems={maxItems}
      separator={separator}
      aria-label="breadcrumb"
    >
      {linkItems?.map(renderItem)}
      <Typography sx={{
        color: "text.primary"
      }}>{title}</Typography>
    </Breadcrumbs>
  );
};
