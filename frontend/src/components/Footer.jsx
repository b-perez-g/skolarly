import React from 'react';

function Footer() {
  return (
    <footer className=" bg-white rounded-lg">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/image/skolarly/logo_icon.svg" className="h-8 cursor-pointer" alt="Flowbite Logo" />
            <img src="/image/skolarly/logo_text.svg" className="h-8 cursor-pointer" alt="Flowbite Logo" />
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
            <li>
              <span className="hover:underline me-4 md:me-6 cursor-pointer">About</span>
            </li>
            <li>
              <span className="hover:underline me-4 md:me-6 cursor-pointer">Privacy Policy</span>
            </li>
            <li>
              <span className="hover:underline me-4 md:me-6 cursor-pointer">Licensing</span>
            </li>
            <li>
              <span className="hover:underline cursor-pointer">Contact</span>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <span className="hover:underline cursor-pointer">Skolarly™</span>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
