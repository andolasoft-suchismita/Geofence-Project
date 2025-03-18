import React from "react";
import { FaUserFriends, FaUserMinus, FaClock } from "react-icons/fa";

interface CardProps {
  title: string;
  count: number;
  type: "total" | "absentees" | "late"; // To dynamically set colors & icons
}

const Card: React.FC<CardProps> = ({ title, count, type }) => {
  // Define styles and icons based on the card type
  const cardStyles = {
    total: "bg-white text-[#4F4F4F]",
    absentees: "bg-white text-[#4F4F4F]",
    late: "bg-white text-[#4F4F4F]",
  };

  const icons = {
    total: <FaUserFriends className="text-2xl" />,
    absentees: <FaUserMinus className="text-2xl" />,
    late: <FaClock className="text-2xl" />,
  };

  return (
    <div className={`rounded-md p-5 shadow ${cardStyles[type]}`}>
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icons[type]}
      </div>
      <p className="mt-2 text-2xl font-bold">{count}</p>
    </div>
  );
};

export default Card;

