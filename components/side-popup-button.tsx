"use client";

import React, { useState } from "react";

const SidePopupButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed right-8 bottom-8 z-40">
      <div className="relative">
        {/* Main Button */}
        <button
          onClick={toggleMenu}
          className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          aria-label="Toggle contact options"
        >
          <svg
            className={`w-8 h-8 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>

        {/* Vertical Button List */}
        <div
          className={`absolute bottom-20 right-0 flex flex-col gap-4 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          {/* KakaoTalk Button */}
          <div className="flex items-center group">
            <span className="bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md text-sm font-medium mr-2 opacity-90 group-hover:opacity-100 transform transition-all duration-300 group-hover:translate-x-[-4px] min-w-[120px] text-center">
              카카오톡 문의
            </span>
            <button
              onClick={() =>
                window.open("https://pf.kakao.com/_xaxmKxj", "_blank")
              }
              className="bg-yellow-400 hover:bg-yellow-500 w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="KakaoTalk 문의"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 3C7.03125 3 3 6.03125 3 9.8C3 12.4062 4.73438 14.6562 7.25 15.7812L6.5 18.9375C6.46875 19.0625 6.53125 19.1875 6.625 19.25C6.71875 19.3125 6.84375 19.3125 6.9375 19.25L10.6875 16.75C11.125 16.8125 11.5625 16.8438 12 16.8438C16.9688 16.8438 21 13.8125 21 10.0312C21 6.25 16.9688 3 12 3Z" />
              </svg>
            </button>
          </div>

          {/* Naver Button */}
          <div className="flex items-center group">
            <span className="bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md text-sm font-medium mr-2 opacity-90 group-hover:opacity-100 transform transition-all duration-300 group-hover:translate-x-[-4px] min-w-[120px] text-center">
              네이버 블로그
            </span>
            <button
              onClick={() =>
                window.open("https://blog.naver.com/your-blog", "_blank")
              }
              className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="네이버 블로그"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.5 6.5V14H11.5V9.5L8.5 14H6.5V6.5H8.5V11L11.5 6.5H13.5Z" />
              </svg>
            </button>
          </div>

          {/* Inquiry Button */}
          <div className="flex items-center group">
            <span className="bg-white text-gray-800 py-2 px-4 rounded-lg shadow-md text-sm font-medium mr-2 opacity-90 group-hover:opacity-100 transform transition-all duration-300 group-hover:translate-x-[-4px] min-w-[120px] text-center">
              문의하기
            </span>
            <button
              onClick={() => window.open("/contact", "_blank")}
              className="bg-blue-600 hover:bg-blue-700 w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="문의하기"
            >
              <svg
                className="w-6 h-6 fill-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePopupButton;
