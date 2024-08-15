import React from 'react';

import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

function Pagination({ onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
