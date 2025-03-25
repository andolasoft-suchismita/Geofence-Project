import React, { useEffect, useState } from 'react';
import UserForm from '../components/AddUser';
import { User } from '../components/AddUser';
import { FiPlus, FiSearch } from 'react-icons/fi';
import UsersTable from '../UserTable';
import {
  createUserAPI,
  deleteUserAPI,
  fetchUsersAPI,
  updateUserAPI,
} from '../api/services/userService';
import { showToast } from '../utils/toast';
import DeleteConfirmationModal from '../components/Modal/DeleteConfirmationModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducers';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedItem, setSelectedItem] = useState<User>(null);
  const [formType, setFormType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>(''); // 🔹 Search state

  const company_id = useSelector(
    (state: RootState) => state.authSlice.company_id
  ); // Get company_id from Redux

  const afterSubmit = () => {
    setFormType(null);
    setSelectedItem(null);
  };
  // Fetch Users
  async function fetchUserList() {
    if (!company_id) return; // Prevent API call if company_id is undefined
    setLoading(true); // Start loading
    try {
      const res = await fetchUsersAPI(company_id);
      setUsers(res);
    } catch (error) {
      showToast('Something went wrong', 'error');
    } finally {
      setLoading(false); // Stop loading
    }
  }

  useEffect(() => {
    fetchUserList();
  }, [company_id]);

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      (user.first_name ?? '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (user.last_name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  ///////////////////////////////////////////
  const addUser = async (values: any) => {
    try {
      const response = await createUserAPI(values); // ✅ Call API to add user
      const updatedData = await fetchUsersAPI(company_id);
      if (updatedData) setUsers(updatedData);
      afterSubmit();
      showToast('User created successfully', 'success');
    } catch (error) {
      showToast('Failed to create user', 'error');
    }
  };
  ///////////////////////////////////////////
  const updateUser = async (id: string, values: any) => {
    try {
      await updateUserAPI(id, values);
      const updatedData = await fetchUsersAPI(company_id);
      if (updatedData) setUsers(updatedData);
      afterSubmit();
      showToast('User updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update user', 'error');
    }
  };
  ///////////////////////////////////////////
  const handleDelete = async (id: string) => {
    try {
      await deleteUserAPI(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Remove deleted user without refetching
      showToast('User deleted successfully', 'success');
      afterSubmit();
    } catch (error) {
      showToast('Failed to delete user', 'error');
    }
  };

  return (
    <div className="p-4">
      <div className="justify- ml-6 flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="text-gray-500 absolute left-3 top-3" size={18} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-gray-300 w-100 rounded-md border py-2 pl-10 pr-10 "
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-gray-500 absolute right-3 top-2 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>
        {/* Add User Button */}

        <button
          onClick={() => setFormType('create')}
          className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white shadow hover:bg-[#696969] "
          title="click here to add users"
        >
          <FiPlus size={18} />
          Add User
        </button>
      </div>
      {/* User Form Modal */}
      {formType && ['create', 'edit'].includes(formType?.toLowerCase()) && (
        <UserForm
          formType={formType}
          onClose={() => afterSubmit()}
          addUser={addUser}
          updateUser={updateUser}
          selectedItem={selectedItem}
        />
      )}

      {/* Delete Confirmation Modal */}
      {formType?.toLowerCase() === 'delete' && (
        <DeleteConfirmationModal
          onConfirm={() => handleDelete(selectedItem?.id)}
          onCancel={() => afterSubmit()}
        />
      )}

      {/* Show Loader While Fetching Data */}
      {loading ? (
        <div className="flex  items-center justify-center py-50">
          <span className="border-gray-500 h-10 w-10 animate-spin rounded-full border-t-4"></span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className=" flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 mt-5 text-lg">No users found.</p>

          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1740732908~exp=1740736508~hmac=edc0862513c1a952fc51562e6185ef5440481a874293c00457d69c7bbfa6b713&w=900"
            alt="No Data"
            className="w-full max-w-xs sm:max-w-md md:max-w-lg"
            title="No user Found . Click the Above Button to Add users"
          />
        </div>
      ) : (
        <UsersTable
          users={filteredUsers}
          setSelectedItem={setSelectedItem}
          setFormType={setFormType}
        />
      )}
    </div>
  );
};

export default Users;
