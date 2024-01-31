import React, {useEffect, useState} from 'react';
import {Button, Box, PaginationItem, Input, Pagination, TablePagination,} from '@mui/material';
import { styled } from '@mui/material/styles';

const PaginationWrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'flex-center',
	marginTop: theme.spacing(2),
}));

/**
 * Dynamic Pagination Component
 * @author vadim.chilinciuc
 *
 */

interface PaginationProps {
	paginationType:'normal' | 'table'
	page:number
	totalPages?:number
	totalElements?:number
	onChangePage:any
}

export const PaginationComponent = (props: PaginationProps) => {
	const { paginationType,page, onChangePage,totalPages,totalElements,  } = props;
	const [currentPage, setCurrentPage] = useState(page);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [inputPage, setInputPage] = useState(page);


	useEffect(() => {
		setCurrentPage(page);
	}, [page]);

	const handleChangePage = (_: unknown, newPage: number) => {
		if (totalPages && newPage >= 0 && newPage <= totalPages) {
			onChangePage(newPage);
			setCurrentPage(newPage);
		}
	};

	const handleChangeRowsPerPage = (event:any) => {
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

	return (
		<>

			{paginationType == 'table' ?
				<TablePagination
					component="div"
					count={totalElements}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
				:
				<PaginationWrapper>
					<Pagination
						count={totalPages}
						color={'primary'}
						shape="rounded"
						page={currentPage}
						onChange={handleChangePage}
						renderItem={(item: any) => {
							if (item.type === 'previous' || item.type === 'next') {
								return <PaginationItem {...item} onClick={item.onClick}/>;
							} else if (item.type === 'start-ellipsis') {
								return (
									<PaginationItem
										{...item}
										hidden={true}
										style={{pointerEvents: 'none'}}
									/>
								);
							} else if (item.type === 'end-ellipsis') {
								return <></>;
							} else if (item.page !== totalPages) {
								return <PaginationItem {...item} onClick={item.onClick}/>;
							} else if (currentPage === totalPages) {
								return <PaginationItem {...item} onClick={item.onClick}/>;
							}
						}}
						boundaryCount={1}
					/>
					<div style={{display: 'flex', alignItems: 'center'}}>
						<div
							style={{
								fontSize: '1.125rem',
								marginLeft: '8px',
								marginRight: '8px',
								color: '#000000a6',
							}}
						>
							Pag.
						</div>
						<Input
							style={{
								width: '40px',
								height: '32px',
								border: '1px solid #e8e8e8',
								color: '#000000a6',
							}}
							value={inputPage}
							onChange={handleInputChange}
							onKeyPress={handleKeyPress}
						/>
						<div
							style={{
								fontSize: '1.125rem',
								marginLeft: '8px',
								color: '#000000a6',
							}}
						>
							di {totalPages}
						</div>
					</div>
				</PaginationWrapper>
			}

		</>

				)

			};