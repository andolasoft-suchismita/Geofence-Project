import React, { useEffect, useState } from 'react';
import UserForm from '../components/AddUser';
import { User } from '../components/AddUser';
import { FiUser, FiPlus } from 'react-icons/fi';
import UsersTable from '../UserTable';
import { createUserAPI, fetchUsersAPI } from '../api/services/userService';

import { showToast } from '../utils/toast';

const Users: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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

  // Function to handle adding a user
  const handleAddUser = async (newUser: User) => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const userData = {
      // first_name: 'string',
      // last_name: 'string',
      // email: 'string',
      // hashed_password: 'string',
      // roletype: 'string',
      // designation: 'junior_engineer',
      // doj: '2025-02-24',
      // dob: '2025-02-24',
      // first_name: 'string',
      // last_name: 'string',
      // email: 'string',
      // password: 'string', // Added missing password
      // employee_id: 'string', //  Added missing employee_id
      // roletype: 'string',
      // designation: 'junior_engineer',
      // doj: '2025-02-24',
      // dob: '2025-02-24',
    };
    // try {
    //   const res = await createUserAPI

    //   (userData);

    // } catch (error) {
    //   // showToast('Something went wrong', 'error');
    // }
  };

  // Function to handle updating a user
  const handleUpdateUser = (id: string, updatedUser: Partial<User>) => {
    const updatedUsers = users.map((user) =>
      user.email === id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="p-4">
      <h2 className="relative flex gap-2.5 text-xl font-bold">
        <FiUser />
        Users
        <button
          title="Click here to Add User"
          onClick={() => setIsFormOpen(true)}
          className=" flex items-center justify-center rounded-full bg-[#D1D5DB] p-1 text-black shadow-md hover:bg-[#9CA3AF]"
        >
          <FiPlus size={20} />
        </button>
      </h2>

      {isFormOpen && (
        <UserForm onClose={() => setIsFormOpen(false)} setUsers={setUsers} />
      )}

      <UsersTable
        users={users}
        setUsers={setUsers}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default Users;
