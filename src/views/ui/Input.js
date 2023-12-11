import React from "react";

const Input = (props) => {
  const { placeholder, label, type, onChange } = props;

  return (
    <div className="flex flex-col  gap-1 text-black">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="border py-3 rounded-md px-4 outline-none text-[#07294D]"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;