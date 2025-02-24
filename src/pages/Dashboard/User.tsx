// import DefaultLayout from '../../layout/DefaultLayout';
// const User: React.FC = () => {
    

//     return (
//       <DefaultLayout children={'Admin Panel Page'}>
        
//       </DefaultLayout>
//     );
//   };
  
//   export default User;
  
// import React, { useState } from "react";
// import DefaultLayout from "../../layout/DefaultLayout";
// import AddUserForm from "../../components/AddUser";
// const User: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <DefaultLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-semibold mb-4">Admin Panel Page</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Add User
//         </button>
//       </div>

//       {isModalOpen && <AddUserForm onClose={() => setIsModalOpen(false)} />}
//     </DefaultLayout>
//   );
// };

// export default User;


import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import UserForm from "../../components/AddUser";

const User: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <DefaultLayout>
      <div className="p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4">Admin Panel Page</h1>
        
        <button 
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>

        {showForm && <UserForm onClose={() => setShowForm(false)} />}
      </div>
    </DefaultLayout>
  );
};

export default User;
