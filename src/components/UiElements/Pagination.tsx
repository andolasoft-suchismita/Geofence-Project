import React from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import PaginationOne from '../Paginations/PaginationOne';
import PaginationTwo from '../../components/Paginations/PaginationTwo';
import PaginationThree from '../../components/Paginations/paginationThree';
import from '../..//';

const Pagination: React.FC = () => {
  return (
    <>
      <Breadcrumb pageName="Pagination" />

      <div className="flex flex-col gap-7.5">
        <PaginationOne />
        <PaginationTwo />
        <PaginationThree />
      </div>
    </>
  );
};

export default Pagination;
