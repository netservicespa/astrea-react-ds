import React from 'react';
import { Menu, MenuItem, Typography, ListItemIcon, Checkbox, Button, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Table } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

interface ColumnVisibilityMenuProps<RowType extends object> {
    table: Table<RowType>;
}

export function ColumnVisibilityMenu<RowType extends object>({ table }: ColumnVisibilityMenuProps<RowType>) {
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={handleMenuOpen} startIcon={<VisibilityIcon />} size="small">
                <Typography variant="body2">{t('table.controls.columnVisibility')}</Typography>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                sx={{
                    minWidth: 200,
                    width: 'auto',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 200,
                            width: 'auto',
                        },
                    },
                }}
            >
                {table
                    .getAllLeafColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                        const header =
                            typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id;

                        return (
                            <MenuItem
                                key={column.id}
                                onClick={() => {
                                    column.toggleVisibility();
                                    handleMenuClose();
                                }}
                                sx={{
                                    whiteSpace: 'nowrap',
                                    minWidth: 180,
                                }}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={column.getIsVisible()}
                                        size="small"
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <Typography variant="body2" noWrap>
                                    {header}
                                </Typography>
                            </MenuItem>
                        );
                    })}
            </Menu>
        </Box>
    );
}
