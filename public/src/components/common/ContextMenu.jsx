import React, { useRef } from "react";

const ContextMenu = ({ options, cordinates, contextMenu, setContextMenu }) => {
  const contextMenuRef = useRef(null);

  return (
    <div
      ref={contextMenuRef}
      style={{
        boxShadow:
        "0 2px 5px 0 rgba(var(11,20,26),.26),0 2px 10px 0 rgba(11,20,26;),.16",
        top:cordinates.y,
        left:cordinates.x,
      }}
      className="bg-white shadow-2x1 fixed py-5 z-[100] rounded-lg border border-gray-200"
    >
      <ul>
        {
          options.map(({name,callback})=> <li className="hover:bg-gray-100 pl-5 pr-10 py-2 cursor-ponter" key={name}>
            <span>{name}</span>
          </li>)
        }
      </ul>
    </div>
  );
};

export default ContextMenu;
