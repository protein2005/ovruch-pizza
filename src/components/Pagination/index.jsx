import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPageCount } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

function Pagination() {
  const currentPage = useSelector((state) => state.filter.pageCount);
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setPageCount(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
