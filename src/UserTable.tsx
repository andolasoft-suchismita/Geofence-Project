import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import ViewUserDetails from './components/Modal/ViewUserDetails';
import { User } from './components/AddUser'; // Import User type
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import moment from 'moment';
import Pagination from './components/UiElements/Pagination';
import { fetchUserDetailsAPI } from './api/services/userService';
interface UsersTableProps {
  users: User[];
  setSelectedItem: any;
  setFormType: any;
}

const UsersTable: React.FC<UsersTableProps> = ({
  users,
  setSelectedItem,
  setFormType,
}) => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null); // Track user being viewed
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Track view modal visibility

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of rows per page

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownIndex !== null &&
        !(event.target as HTMLElement).closest('.dropdown-menu')
      ) {
        setDropdownIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownIndex]);

  const handleView = async (userId: string) => {
    try {
      const userDetails = await fetchUserDetailsAPI(userId); // Fetch user details
      console.log('Fetched User Details:', userDetails); // Debug log
      setViewUser(userDetails); // Store in state
      setIsViewModalOpen(true); // Open modal
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
    setDropdownIndex(null);
  };

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  // Pagination Logic
  const totalPages = Math.ceil(users.length / pageSize);
  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const index = row.index;
        return (
          <div className="relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="text-gray-600 hover:text-gray-900 cursor-pointer p-2"
            >
              ⋮
            </button>

            {dropdownIndex === index && (
              <div className="dropdown-menu absolute  z-10 ml-6 flex rounded border bg-white shadow-md">
                <button
                  title="View User Details"
                  className="hover:bg-gray-200 block w-full px-4 py-2 text-left"
                  onClick={() => handleView(row.original.id)} // Pass user ID
                >
                  <FaEye />
                </button>

                <button
                  title="Edit User Details"
                  className="hover:bg-gray-200 block w-full px-4 py-2 text-left"
                  onClick={() => {
                    setDropdownIndex(null); //  Close dropdown first
                    setSelectedItem(row.original);
                    setFormType('edit');
                  }}
                >
                  <MdEdit />
                </button>

                <button
                  title="Delete User"
                  onClick={() => {
                    setDropdownIndex(null); //  Close dropdown first
                    setSelectedItem(row.original);
                    setFormType('delete');
                  }}
                  className="text-red-600 hover:bg-red-100 block w-full px-4 py-2 text-left"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        );
      },
    },
    { accessorKey: 'first_name', header: 'First Name' },
    { accessorKey: 'last_name', header: 'Last Name' },

    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'designation',
      header: 'Designation',
      cell: ({ getValue }) => {
        const designation = String(getValue() || '');
        return designation
          .replace(/_/g, ' ') // Replace underscores with spaces
          .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
      },
    },

    {
      accessorKey: 'roletype',
      header: 'Role Type',
      cell: ({ getValue }) => {
        const roletype = String(getValue() || '');
        return roletype
          .replace(/_/g, ' ') // Replace underscores with spaces
          .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
      },
    },

    {
      accessorKey: 'doj',
      header: 'Date of Joining',
      cell: ({ row }) => {
        const value = moment(row.original.doj).format('DD-MM-YYYY');
        return value;
      },
    },
    {
      accessorKey: 'dob',
      header: 'Date of Birth',
      cell: ({ row }) => {
        const value = moment(row.original.dob).format('DD-MM-YYYY');
        return value;
      },
    },
  ];

  const table = useReactTable({
    data: users, // Keep full dataset here
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 ">
      {/* <h2 className="border-gray-300 mb-4 text-xl font-semibold text-blue-900">
        User List
      </h2> */}

      <div className="w-full overflow-x-auto">
        <table className="border-gray-300 w-full min-w-[600px] table-auto border bg-white">
          <thead className="border-gray-300 top-0 bg-[#4B5563] text-white shadow-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border p-4 text-left">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table
              .getRowModel()
              .rows.slice((currentPage - 1) * pageSize, currentPage * pageSize) // Apply pagination here
              .map((row) => (
                <tr key={row.id} className="border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="text-gray-900 border p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        {/* <EditUserModal
        isOpen={isEditModalOpen}
        user={editUser}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      /> */}

        {/* View User Modal */}
        <ViewUserDetails
          isOpen={isViewModalOpen}
          user={viewUser}
          onClose={() => setIsViewModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default UsersTable;
