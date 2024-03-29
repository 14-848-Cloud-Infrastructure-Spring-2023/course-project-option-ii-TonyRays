import React, { useEffect } from "react";

import "./Dropdown.css";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

 

const Dropdown = ({ placeHolder, options }) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const getDisplay = () => {
    return placeHolder;
  };

  useEffect(() => {
    const handler = (event) => {
      setShowMenu(false);
    };

    window.addEventListener("click", handler);
    return () => {window.removeEventListener("click", handler);}
  });
  
  const handleInputClick = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
    console.log("event:", event.target.textContent);
    if (event.target.textContent !== "10" && event.target.textContent !== "20" && event.target.textContent !== "50" && event.target.textContent !== "100") {
      return;
    }
    let ele = document.getElementById("dropdown-selected-value-id");
    ele.textContent = event.target.textContent;
  };

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        {showMenu && (<div className="dropdown-menu">
            {options.map((options) => (
              <div className="dropdown-item" key={options.value}>
                {options.label}
              </div>
            ))}
        </div>)}
        <div className="dropdown-selected-value" id="dropdown-selected-value-id">{getDisplay()}</div>
          <div className="dropdown-tools">
            <div className="dropdown-tool">
              <Icon />
            </div>
          </div>
        </div>
      </div>
      
  );
};

export default Dropdown;