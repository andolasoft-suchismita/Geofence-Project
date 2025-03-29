import React from "react";
import {
  FaUserFriends,
  FaUserMinus,
  FaClock,
  FaUserPlus,
} from 'react-icons/fa';

interface CardProps {
  title: string;
  count:string| number;
  type: "total" | "absentees" | "late" | "present"; // To dynamically set colors & icons
}

const Card: React.FC<CardProps> = ({ title, count, type }) => {
  // Define styles and icons based on the card type
  const cardStyles = {
    total: 'bg-white text-gray-700',
    absentees: 'bg-white text-gray-700',
    late: 'bg-white text-gray-700',
    present: 'bg-white text-gray-700',
  };

  const icons = {
    total: <FaUserFriends className="text-2xl" />,
    absentees: <FaUserMinus className="text-2xl" />,
    late: <FaClock className="text-2xl" />,
    present: <FaUserPlus className="text-2xl" />,
  };

  return (
    <div className={`rounded-md p-5 shadow ${cardStyles[type]}`}>
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icons[type]}
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-600">{count}</p>
    </div>
  );
};

export default Card;

