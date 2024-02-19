import React from "react";

const FormInput = ({
  name,
  type = "text",
  value,
  setValue,
  placeholder,
  isListing = false,
}) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={(e) =>
        isListing ? setValue(name, e.target.value) : setValue(e.target.value)
      }
      className="border border-gray-300 px-2 py-4 rounded-md w-full"
    />
  );
};

export default FormInput;
