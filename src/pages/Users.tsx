import React, { useEffect, useState } from 'react';
import UserForm from '../components/AddUser';
import { User } from '../components/AddUser';
import { FiUser, FiPlus } from 'react-icons/fi';
import UsersTable from '../UserTable';
import { createUserAPI, deleteUserAPI, fetchUsersAPI, updateUserAPI } from '../api/services/userService';
import { showToast } from '../utils/toast';
import DeleteConfirmationModal from '../components/Modal/DeleteConfirmationModal';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedItem, setSelectedItem] = useState<User>(null);
  const [formType, setFormType] = useState<string | null>(null);

  const resetStates = () => { setFormType(null); setSelectedItem(null) }

  async function fetchUserList() {
    try {
      const res = await fetchUsersAPI();
      setUsers(res);
    } catch (error) {
      showToast('Something went wrong', 'error');
    }
  }

  useEffect(() => {
    fetchUserList();
  }, []);
  ///////////////////////////////////////////
  const addUser = async (values: any) => {
    try {
      await createUserAPI(values);
      const updatedData = await fetchUsersAPI();
      if (updatedData) setUsers(updatedData);
      resetStates()
      showToast('User created successfully', 'success');
    } catch (error) {
      showToast('Failed to create user', 'error');
    }
  };
  ///////////////////////////////////////////
  const updateUser = async (id: string, values: any) => {
    try {
      await updateUserAPI(id, values);
      const updatedData = await fetchUsersAPI();
      if (updatedData) setUsers(updatedData);
      resetStates()
      showToast('User updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update user', 'error');
    }
  };
  ///////////////////////////////////////////
  const handleDelete = async (id: string) => {
    try {
      await deleteUserAPI(id);
      const updatedData = await fetchUsersAPI();
      if (updatedData) setUsers(updatedData);
      showToast('User deleted successfully', 'success');
      resetStates()
    } catch (error) {
      showToast('Failed to delete user', 'error');
    }
  };


  return (
    <div className="p-4">
      {/* <h2 className="relative flex gap-2.5 text-xl font-bold">
        <FiUser />
        Users
        <button
          title="Click here to Add User"
          onClick={() => setFormType('create')}
          className=" flex items-center justify-center rounded-full bg-[#D1D5DB] p-1 text-black shadow-md hover:bg-[#9CA3AF]"
        >
          <FiPlus size={20} />
        </button>
      </h2> */}
      <button
        onClick={() => setFormType('create')}
        className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white shadow hover:bg-blue-600 "
        title="click here to add users"
      >
        <FiPlus size={18} />
        Add User
      </button>

      {formType && ['create', 'edit'].includes(formType?.toLowerCase()) ? (
        <UserForm
          formType={formType}
          onClose={() => resetStates()}
          addUser={addUser}
          updateUser={updateUser}
          selectedItem={selectedItem}
        />
      ) : null}

      {formType?.toLowerCase() === 'delete' ? (
        <DeleteConfirmationModal
          onConfirm={() => handleDelete(selectedItem?.id)}
          onCancel={() => resetStates()}
        />
      ) : null}

      {/* <UsersTable
        users={users}
        setSelectedItem={setSelectedItem}
        setFormType={setFormType}
      /> */}

      {users.length === 0 ? (
        <div className=" flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 text-lg">No users found.</p>

          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?t=st=1740732908~exp=1740736508~hmac=edc0862513c1a952fc51562e6185ef5440481a874293c00457d69c7bbfa6b713&w=900"
            alt="No Data"
            className="w-full max-w-xs sm:max-w-md md:max-w-lg"
            title="No user Found . Click the Above Button to Add users"
          />
         
        </div>
      ) : (
        <UsersTable
          users={users}
          setSelectedItem={setSelectedItem}
          setFormType={setFormType}
        />
      )}
    </div>
  );
};

export default Users;