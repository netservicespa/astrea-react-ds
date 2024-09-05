import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export type LinkItem = {
  name: string;
  href: string;
};

export interface NsBreadcrumbsProps {
  linkItems: LinkItem[];
  title: string;
  separator?: string;
  maxItems?: number;
  linkUnderline?: 'none' | 'hover' | 'always';
}

export const NsBreadcrumbs = ({
  linkItems,
  linkUnderline = 'hover',
  separator = '>',
  title,
  maxItems,
}: NsBreadcrumbsProps) => {
  return (
    <Breadcrumbs
      maxItems={maxItems}
      separator={separator}
      aria-label="breadcrumb"
    >
      {linkItems?.map((item: any) => {
        return (
          <Link
            key={item.name}
            underline={linkUnderline}
            color="inherit"
            href={item.href}
            style={{ fontWeight: '700' }}
          >
            {item.name}
          </Link>
        );
      })}
      <Typography color="text.primary">{title}</Typography>
    </Breadcrumbs>
  );
};
