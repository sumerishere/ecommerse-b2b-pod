import React, { useState } from "react";

const CustomDropdown = ({ paymentMethods, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="input-field w-40 border p-2 cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {paymentMethods.find((method) => method.name === selected)?.icon}
        <span>{selected || "Select a method"}</span>
      </div>
      {isOpen && (
        <ul className="absolute bg-white border mt-2 w-full z-10">
          {paymentMethods.map((method) => (
            <li
              key={method.name}
              className="p-2 hover:bg-gray-100 flex items-center cursor-pointer"
              onClick={() => {
                onSelect(method.name);
                setIsOpen(false);
              }}
            >
              {method.icon} <span className="ml-2">{method.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;