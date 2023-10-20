'use client'

import { useState } from 'react';
import { redirect } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users', formData)

      setFormData({
        email: '',
        name: '',
      });

      if (response.ok) {
        redirect("/user-list")
      }

    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  return (
    <div>
      <h2>Peerprep</h2>
      <form onSubmit={handleRegister} className="w-2/3 space-y-6">
        <label>Email:
        <input 
          type="text" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        </label>
        <label>Name:
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <button
          className="flex items-center text-white transition ease-in-out delay-50 bg-gray-900 hover:scale-105 hover:bg-gray-800 duration-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            console.log('clicked')
          }}
          type="submit"
        >
          Create User
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
