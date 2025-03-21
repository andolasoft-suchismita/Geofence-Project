// import React from 'react';
// import Breadcrumb from '../Breadcrumbs/Breadcrumb';
// import PaginationOne from '../Paginations/PaginationOne';
// import PaginationTwo from '../../components/Paginations/PaginationTwo';
// import PaginationThree from '../../components/Paginations/paginationThree';
// import from '../..//';

// const Pagination: React.FC = () => {
//   return (
//     <>
//       <Breadcrumb pageName="Pagination" />

//       <div className="flex flex-col gap-7.5">
//         <PaginationOne />
//         <PaginationTwo />
//         <PaginationThree />
//       </div>
//     </>
//   );
// };

// export default Pagination;
import {
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaCalendarAlt,
} from 'react-icons/fa';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex w-full items-center justify-center p-4 z-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-md border bg-white px-4 
                   py-0.5 transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        ← Prev
      </button>

      <span className="text-gray-700 mx-4 text-sm font-semibold">
        Page <span className="text-black">{currentPage}</span> of{' '}
        <span className="text-black">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-md border bg-white px-4 
                   py-0.5 transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
