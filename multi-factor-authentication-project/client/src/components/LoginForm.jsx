import React, { useState } from 'react';

 export const LoginForm = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent the form from refreshing the page
//     // Add your login logic here
//     console.log('Form submitted!');
//   };

    const [isRegister,setisRegister] = useState(false);
  return (
    <form
      className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto p-8"
      onSubmit={handleSubmit}
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">{isRegister?"Create Account":"Login"}</h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 text-lg font-light mb-8">
        {isRegister
        ?"Looks Like You are new"
        :"We are glad to have you here. See you again, my client!"
        }
        
      </p>

      {/* Username Input */}
      <div className="mb-6">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          Username
        </label>
        <input

          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Confirm Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your Password Again"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign In
        </button>
        {/* <div className="text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?
          <Link to="" className="text-blue-500 hover:text-blue-700 font-semibold">
            Sign Up
          </Link>
        </p>
      </div> */}
      </div>
    </form>
  );
};

export default LoginForm;