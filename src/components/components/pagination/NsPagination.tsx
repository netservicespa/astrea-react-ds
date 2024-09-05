import React, { useEffect, useState } from 'react';
import { Box, PaginationItem, Input, Pagination, TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { TablePaginationActions as defaultActions } from './NsPaginationActions';

const PaginationWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-center',
    marginTop: theme.spacing(2),
}));

/**
 * Dynamic Pagination Component
 * @author vadim.chilinciuc
 * @author davide.schiavi
 *
 */

export interface PaginationProps {
    paginationType: 'default' | 'table' | 'custom';
    page: number;
    totalPages: number;
    totalElements: number;
    onChangePage: any;
    showFirstButton?: boolean;
    showLastButton?: boolean;
    TablePaginationActions?: any;
    rowsPerPageOptions?: Array<number | { label: string; value: number }>;
}

export const NsPagination = (props: PaginationProps) => {
    const {
        paginationType,
        page,
        onChangePage,
        totalPages,
        totalElements,
        showFirstButton,
        showLastButton,
        TablePaginationActions = defaultActions,
        rowsPerPageOptions,
    }: any = props;
    const [currentPage, setCurrentPage] = useState(page);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [inputPage, setInputPage] = useState(page);
    const { t } = useTranslation();

    const handleChangePage = (_: unknown, newPage: number) => {
        if (totalPages && newPage >= 0 && newPage <= totalPages) {
            onChangePage(newPage);
            setCurrentPage(newPage);
            setInputPage(newPage);
        }
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const handleInputChange = (event: any) => {
        const value = Number(event.target.value);
        if (value == 0) {
            setInputPage(1);
        } else if (totalPages && value < totalPages) {
            setInputPage(value);
        } else {
            setInputPage(totalPages);
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onChangePage(inputPage);
            setCurrentPage(inputPage);
        }
    };

    const standardPaginator = () => {
        return (
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                showFirstButton={showFirstButton}
                showLastButton={showLastButton}
                color="primary"
                shape="rounded"
            />
        );
    };

    const StyledText = styled(Box)(({ theme }) => ({
        fontSize: '1.125rem',
        marginLeft: '8px',
        color: theme.palette.darkTextColor.primary,
    }));
    const StyledInput = styled(Input)(({ theme }) => ({
        width: '40px',
        height: '32px',
        border: `1px solid ${theme.palette.borderColor.main}`,
        color: theme.palette.darkTextColor.primary,
    }));

    switch (paginationType) {
        case 'default':
            return standardPaginator();
        case 'table':
            return (
                <TablePagination
                    component="div"
                    count={totalElements}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    showFirstButton={showFirstButton}
                    showLastButton={showLastButton}
                    rowsPerPageOptions={rowsPerPageOptions}
                />
            );
        case 'custom':
            return (
                <PaginationWrapper>
                    {/* <Pagination
                        count={totalPages}
                        color="primary"
                        shape="rounded"
                        page={currentPage}
                        onChange={handleChangePage}
                        renderItem={(item: any) => {
                            if (item.type === 'previous' || item.type === 'next') {
                                return <PaginationItem {...item} onClick={item.onClick} />;
                            } else if (item.type === 'start-ellipsis') {
                                return <PaginationItem {...item} hidden={true} style={{ pointerEvents: 'none' }} />;
                            } else if (item.type === 'end-ellipsis') {
                                return <></>;
                            } else if (item.page !== totalPages) {
                                return <PaginationItem {...item} onClick={item.onClick} />;
                            } else if (currentPage === totalPages) {
                                return <PaginationItem {...item} onClick={item.onClick} />;
                            }
                        }}
                        showFirstButton={showFirstButton}
                        showLastButton={showLastButton}
                        boundaryCount={1}
                    /> */}
                    {standardPaginator()}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <StyledText>{t('pagination.pag')}</StyledText>
                        <StyledInput value={inputPage} onChange={handleInputChange} onKeyPress={handleKeyPress} />
                        <StyledText>
                            {t('pagination.of')}
                            {totalPages}
                        </StyledText>
                    </div>
                </PaginationWrapper>
            );
        default:
            return <></>;
    }
};
