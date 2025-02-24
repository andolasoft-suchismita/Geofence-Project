// import React, { useState } from 'react'
// import UserForm from '../components/AddUser'
// import { User } from "../components/AddUser";
// import { FiUser } from "react-icons/fi";
// import UsersTable from '../UserTable';
// const Users: React.FC = () => {
//   const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
//   const [users, setUsers] = useState<User[]>(JSON.parse(localStorage.getItem("users") || "[]"));
//   // Function to handle adding a user
//   const handleAddUser = (newUser: User) => {
//     const updatedUsers = [...users, newUser];
//     setUsers(updatedUsers); // Update state
//     localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update localStorage
//   };
//   const handleDeleteUser = (id: string) => {
//     const updatedUsers = users.filter(user => user.employee_id !== id);
//     setUsers(updatedUsers);
//     localStorage.setItem("users", JSON.stringify(updatedUsers));
//   };

//   const handleUpdateUser = (id: string, updatedUser: Partial<User>) => {
//     const updatedUsers = users.map(user =>
//       user.employee_id === id ? { ...user, ...updatedUser } : user
//     );
//     setUsers(updatedUsers);
//     localStorage.setItem("users", JSON.stringify(updatedUsers));
//   };

//   return (
//     <div className="p-4 ">
//       <h2 className="text-xl font-bold relative flex gap-2.5">
//       <FiUser />Users
//       </h2>
//       <button
//         onClick={() => setIsFormOpen(true)}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add User
//       </button>
//       {isFormOpen && (
//         <UserForm onClose={() => setIsFormOpen(false)} onAddUser={handleAddUser} />
//       )}

// <UsersTable
//   users={users}
//   setUsers={setUsers}
//   onDelete={handleDeleteUser}
//   onUpdate={handleUpdateUser}
// />

//     </div>

//   );
// };

// export default Users;

import React, { useEffect, useState } from 'react';
import UserForm from '../components/AddUser';
import { User } from '../components/AddUser';
import { FiUser } from 'react-icons/fi';
import UsersTable from '../UserTable';
import { createUserAPI, fetchUsersAPI } from '../api/services/userService';

import { showToast } from '../utils/toast';

const Users: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUserList() {
    try {
      const res = await fetchUsersAPI();
      setUsers(res.data);
    } catch (error) {
      showToast('Something went wrong', 'error');
    }
  }
  useEffect(() => {
    fetchUserList();
  }, []);

  // Function to handle adding a user
  const handleAddUser = async(newUser: User) => {
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

  // Function to handle deleting a user
  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.employee_id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Function to handle updating a user
  const handleUpdateUser = (id: string, updatedUser: Partial<User>) => {
    const updatedUsers = users.map((user) =>
      user.employee_id === id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="p-4">
      <h2 className="relative flex gap-2.5 text-xl font-bold">
        <FiUser />
        Users
      </h2>
      <button
        title="Click here to Add User"
        onClick={() => setIsFormOpen(true)}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Add User
      </button>

      {isFormOpen && (
        <UserForm
          onClose={() => setIsFormOpen(false)}
          onAddUser={handleAddUser}
        />
      )}

      <UsersTable
        users={users}
        setUsers={setUsers}
        onDelete={handleDeleteUser}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default Users;
