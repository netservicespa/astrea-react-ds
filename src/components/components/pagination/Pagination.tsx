import React, {useEffect, useState} from 'react';
import {Box, Input, Pagination, PaginationItem, TablePagination,} from '@mui/material';
import {styled} from '@mui/material/styles';


/**
 * Dynamic Pagination Component
 *
 * @author vadim.chilinciuc
 */


const PaginationWrapper = styled(Box)(({theme}) => ({
	display: 'flex',
	justifyContent: 'flex-center',
	marginTop: theme.spacing(2),
}));

const divWrapperStyle ={
	fontSize: '0.875rem',
	marginLeft: '8px',
	color: '#000000a6',
}

const inputStyle={
	width: '40px',
	height: '32px',
	border: '1px solid #e8e8e8',
	color: '#000000a6',
}


interface PaginationProps {
	/**
	 * Defines the pagination type : normal or table.
	 */
	paginationType: "normal" | "table"
	/**
	 * Defines the total pages
	 */
	totalPages?: number
	/**
	 * Defines the total elements
	 */
	totalElements?: number
}


export const PaginationComponent = (props: PaginationProps) => {
	const {paginationType, totalPages=0, totalElements=0} = props;
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(10);



	const handleChangePage = (_: unknown, newPage: number) => {
		setCurrentPage(newPage);
	};


	const handleChangeRowsPerPage = (event: any) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setCurrentPage(1);
	};

	const handleInputChange = (event: any) => {
		const value = Number(event.target.value);
		if (value == 0) {
			setCurrentPage(1);
		} else if (totalPages && value < totalPages) {
			setCurrentPage(value);
		} else {
			setCurrentPage(totalPages);
		}
	};


	return (
		<>

			{paginationType == 'table' ?
				<TablePagination
					component="div"
					count={totalElements}
					page={currentPage}
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
							style={divWrapperStyle}
						>
							Pag.
						</div>
						<Input
							style={inputStyle}
							value={currentPage}
							onChange={handleInputChange}
						/>
						<div
							style={divWrapperStyle}
						>
							di {totalPages}
						</div>
					</div>
				</PaginationWrapper>
			}

		</>

	)

};
