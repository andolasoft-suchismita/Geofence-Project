import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import DeleteConfirmationModal from './components/Modal/DeleteConfirmationModal';
import EditUserModal from './components/Modal/EditUserModal';
import ViewUserDetails from './components/Modal/ViewUserDetails';
import { User } from './components/AddUser'; // Import User type
import { useDispatch } from 'react-redux';
import { deleteUserThunk, updateUserThunk } from './redux/slices/userSlice';
import { MdDelete, MdEdit } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { showToast } from './utils/toast';
import { AppDispatch } from './redux/store';
import {
  createUserAPI,
  deleteUser,
  fetchUsersAPI,
} from './api/services/userService';
import moment from 'moment';

interface UsersTableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onUpdate: (id: string, updatedUser: Partial<User>) => void; //  Add this
}

const UsersTable: React.FC<UsersTableProps> = ({ users, setUsers }) => {
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<string | null>(null); // Track user being deleted
  const [editUser, setEditUser] = useState<User | null>(null); // Track user being edited
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Track edit modal visibility
  const [viewUser, setViewUser] = useState<User | null>(null); // Track user being viewed
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Track view modal visibility

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

  const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch to avoid TypeScript errors

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      const updatedData = await fetchUsersAPI();
      if (updatedData) setUsers(updatedData);
      showToast('User deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete user', 'error');
      console.error('Delete error:', error);
    } finally {
      setDeleteIndex(null);
      setDropdownIndex(null);
    }
  };

  const handleSaveEdit = async (updatedUser: User) => {
    try {
      await dispatch(
        updateUserThunk({ id: updatedUser.email, userData: updatedUser })
      ).unwrap();
      setUsers(
        users.map((user) =>
          user.email === updatedUser.email ? updatedUser : user
        )
      ); // Update state
      setIsEditModalOpen(false);
      showToast('User updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update user', 'error');
      console.error('Update error:', error);
    }
  };

  const handleEdit = (index: number) => {
    setEditUser(users[index]); // Set selected user
    setIsEditModalOpen(true);
    setDropdownIndex(null);
  };

  //Handle View
  const handleView = (index: number) => {
    setViewUser(users[index]);
    setIsViewModalOpen(true);
    setDropdownIndex(null);
  };

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
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
              <div className="dropdown-menu absolute  z-10 flex rounded border bg-white shadow-md">
                {/* <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownIndex(null)}
                >
                  View
                </button> */}
                <button
                  title="View User Details"
                  className="hover:bg-gray-200 block w-full px-4 py-2 text-left"
                  onClick={() => handleView(index)}
                >
                  <FaEye />
                </button>
                <button
                  title="Edit User Details"
                  className="hover:bg-gray-200 block w-full px-4 py-2 text-left"
                  onClick={() => handleEdit(index)} // Calls the function to open the modal
                >
                  <MdEdit />
                </button>

                <button
                  title="Delete User"
                  onClick={() => {
                    setDropdownIndex(null); //  Close dropdown first
                    setDeleteIndex(row.original.id); //  Then open delete confirmation modal
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
    { accessorKey: 'designation', header: 'Designation' },
    { accessorKey: 'roletype', header: 'Role Type' },
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
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <h2 className="border-gray-300 mb-4 text-xl font-semibold text-blue-900">
        User List
      </h2>

      <table className="border-gray-300 w-full table-auto border bg-white">
        <thead className="border-gray-300 top-0 bg-[#4B5563] text-white shadow-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 text-left">
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
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="text-gray-900 border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <DeleteConfirmationModal
        isOpen={deleteIndex !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteIndex(null)}
      /> */}
      <DeleteConfirmationModal
        isOpen={deleteIndex !== null}
        onConfirm={() => handleDelete(deleteIndex)} // Pass ID properly
        onCancel={() => setDeleteIndex(null)}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        user={editUser}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
      <ViewUserDetails
        isOpen={isViewModalOpen}
        user={viewUser}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
};

export default UsersTable;
