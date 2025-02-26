import React, { useEffect, useState } from 'react';
import UserForm from '../components/AddUser';
import { User } from '../components/AddUser';
import { FiUser, FiPlus } from 'react-icons/fi';
import UsersTable from '../UserTable';
import { fetchUsersAPI } from '../api/services/userService';

import { showToast } from '../utils/toast';

const Users: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [formType, setFormType] = useState<string>('create');

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
        <UserForm
          formType={formType}
          onClose={() => setIsFormOpen(false)}
          setUsers={setUsers}
        />
      )}

      <UsersTable
        users={users}
        setUsers={setUsers}
        onUpdate={handleUpdateUser}
        // setFormType={setFormType}
      />
    </div>
  );
};

export default Users;
