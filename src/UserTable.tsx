import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from "@tanstack/react-table";
import DeleteConfirmationModal from "./components/Modal/DeleteConfirmationModal";
import EditUserModal from "./components/Modal/EditUserModal";
import ViewUserDetails from "./components/Modal/ViewUserDetails";
import { User } from "./components/AddUser"; // Import User type
import { MdDelete ,MdEdit} from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { showToast } from "./utils/toast";
interface UsersTableProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    onDelete: (id: string) => void;  //  Add this
  onUpdate: (id: string, updatedUser: Partial<User>) => void; //  Add this
  }
  
  
const UsersTable: React.FC<UsersTableProps>  = ({ users, setUsers ,onDelete, onUpdate }) => {
//   const [users, setUsers] = useState<User[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);// Track user being deleted
  const [editUser, setEditUser] = useState<User | null>(null); // Track user being edited
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Track edit modal visibility
  const [viewUser, setViewUser] = useState<User | null>(null); // Track user being viewed
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Track view modal visibility


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownIndex !== null &&
        !(event.target as HTMLElement).closest(".dropdown-menu")
      ) {
        setDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownIndex]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);
   //Handle delete
   const handleDelete = () => {
    if (deleteIndex !== null) {
      const updatedUsers = users.filter((_, i) => i !== deleteIndex);
      
      setUsers([...updatedUsers]); // Ensure state update triggers a re-render
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      showToast("User deleted successfully", "success"); //  Show toast
      setDeleteIndex(null); // Close modal
      setDropdownIndex(null); // Close dropdown
    }
  };

  // Handle Edit
  const handleEdit = (index: number) => {
    setEditUser(users[index]); // Set user data in state
    
    setIsEditModalOpen(true);
    setDropdownIndex(null);
  };

  // Save edited user
  const handleSaveEdit = (updatedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.employee_id === updatedUser.employee_id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setIsEditModalOpen(false);
    showToast('User Updated successfully', 'success'); //  Show toast
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
    // { accessorKey: "first_name", header: "First Name" },
    // { accessorKey: "last_name", header: "Last Name" },
    // { accessorKey: "employee_id", header: "Employee ID" },
    // { accessorKey: "email", header: "Email" },
    // { accessorKey: "designation", header: "Designation" },
    // { accessorKey: "roletype", header: "Role Type" },
    // { accessorKey: "doj", header: "Date of Joining" },
    // { accessorKey: "dob", header: "Date of Birth" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const index = row.index;
        return (
          <div className="relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="p-2 text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              ⋮
            </button>

            {dropdownIndex === index && (
              <div className="absolute flex  bg-white shadow-md rounded border z-10 dropdown-menu">
                {/* <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownIndex(null)}
                >
                  View
                </button> */}
                <button
                title="View User Details"
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleView(index)}
                >
                  <FaEye />
                </button>
                <button
                title="Edit User Details"
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                    onClick={() => handleEdit(index)} // Calls the function to open the modal
                    >
                    <MdEdit />
                    </button>

                
                <button
                title="Delete User"
                    onClick={() => {
                        setDropdownIndex(null); //  Close dropdown first
                        setDeleteIndex(index);  //  Then open delete confirmation modal
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                    <MdDelete />
                </button>
              </div>
            )}
          </div>
        );
      },
    },
    { accessorKey: "first_name", header: "First Name" },
    { accessorKey: "last_name", header: "Last Name" },
    { accessorKey: "employee_id", header: "Employee ID" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "designation", header: "Designation" },
    { accessorKey: "roletype", header: "Role Type" },
    { accessorKey: "doj", header: "Date of Joining" },
    { accessorKey: "dob", header: "Date of Birth" },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
        
      <h2 className="text-xl font-semibold mb-4 text-blue-900">User List</h2>

      <table className="w-full border border-gray-300 table-auto">
        <thead className="top-0 bg-blue-900 text-white shadow-md">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2 text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmationModal
        isOpen={deleteIndex !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteIndex(null)}
      />
        <EditUserModal isOpen={isEditModalOpen} user={editUser} onClose={() => setIsEditModalOpen(false)} onSave={handleSaveEdit} />
        <ViewUserDetails isOpen={isViewModalOpen} user={viewUser} onClose={() => setIsViewModalOpen(false)} />
    </div>
    
  );
};

export default UsersTable;



