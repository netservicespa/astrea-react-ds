import React from 'react';

import Box from '@mui/material/Box';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { styled, useTheme } from '@mui/material/styles';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { Button } from '@mui/material';

/**
 * Renders the default pagination actions for a table.
 *
 * @param {TablePaginationActionsProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const TablePaginationActions = (props: TablePaginationActionsProps) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    const StyledNsButton = styled(Button)(({ theme }) => ({
        width: '35px',
        height: '35px',
        minWidth: 0,
    }));

    return (
        <Box sx={{ display: 'flex', gap: '10px', ml: '10px' }}>
            <StyledNsButton
                sx={{ width: '35px', height: '35px', minWidth: 0 }}
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
                color="primary"
                variant="outlined"
                size="small"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </StyledNsButton>
            <StyledNsButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
                color="primary"
                variant="outlined"
                size="small"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </StyledNsButton>
            <StyledNsButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
                color="primary"
                variant="outlined"
                size="small"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </StyledNsButton>
            <StyledNsButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
                color="primary"
                variant="outlined"
                size="small"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </StyledNsButton>
        </Box>
    );
};

export default TablePaginationActions;
