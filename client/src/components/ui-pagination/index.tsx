import React, { useState } from 'react';
import styles from './styles.module.scss';

interface PaginationPropTypes {
	page: number;
	totalPages: number;
	onChangedPage: (page: number) => void;
}

export const UIPagination: React.FC<PaginationPropTypes> = ({
	page,
	totalPages,
	onChangedPage,
}) => {
	const [portionNumber, setPortionNumber] = useState(1);
	let pages = [];
	for (let i = 1; i <= totalPages; i++) {
		pages.push(i);
	}
	let portionCount = Math.ceil(totalPages / 20);

	let leftPortionPageNumber = (portionNumber - 1) * 20 + 1;
	let rightPortionPageNumber = portionNumber * 20;

	return (
		<div className={styles.paginatorWrapper}>
			<ul className="pagination">
				{/*<li className="page-item"><a className="page-link" href="#">Previous</a></li>*/}
				{portionNumber > 1 && (
					<li
						className={`${styles.pageItem} pageItem`}
						onClick={() => {
							setPortionNumber(portionNumber - 1);
						}}>
						<span className="page-link"> Previous </span>
					</li>
				)}
				{pages
					.filter((p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
					.map((p) => {
						return (
							<li
								key={p}
								onClick={(e) => {
									onChangedPage(p);
								}}
								className={`page-item ${styles.pageItem} ${page === p ? styles.currentPage : ''}`}>
								<span className={`${page === p ? 'text-white' : ''} page-link`}>{p}</span>
							</li>
						);
					})}
				{portionCount > portionNumber && (
					<li
						className={`page-item ${styles.pageItem}`}
						onClick={() => {
							setPortionNumber(portionNumber + 1);
						}}>
						<span className="page-link"> Next </span>
					</li>
				)}
				{/*<li className="page-item"><a className="page-link" href="#">Next</a></li>*/}
			</ul>
		</div>
	);
};
