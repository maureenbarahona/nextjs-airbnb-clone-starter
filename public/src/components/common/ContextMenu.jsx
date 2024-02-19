import React, { useEffect, useRef } from "react";

const ContextMenu = ({ options, cordinates, contextMenu, setContextMenu }) => {
  const contextMenuRef = useRef(null);

  const handleClick = (e, callBack) => {
    e.stopPropagation();
    callBack();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {      
        if (
          contextMenuRef.current &&
          !contextMenuRef.current.contains(event.target)
        ) {
          setContextMenu(false);
        }     
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={contextMenuRef}
      style={{
        boxShadow:
          "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(var(11,20,26;),.16)",
        top: cordinates.y,
        left: cordinates.x,
      }}
      className="bg-white shadow-2x1 fixed py-5 z-[100] rounded-lg border border-gray-200"
    >
      <ul>
        {options.map(({ name, callBack }) => (
          <li
            className="hover:bg-gray-100 pl-5 pr-10 py-2 cursor-ponter"
            key={name}
            onClick={(e) => handleClick(e, callBack)}
          >
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
