import { useState } from 'react';

const Popover = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        className="text-gray-500 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer h-full"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
      {isOpen && (
        <div className="absolute z-20 w-[180px] bottom-5 left-[-66px] px-3 py-2 text-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm">
          {content}
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
}


export default Popover;