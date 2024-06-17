'use client'
import React, { useState } from 'react';
import { useUser } from "@/components/UserContext";
import { useRouter } from 'next/navigation';
import config from '@/constants/apiconfig';

import useUpdateView from '@/components/useUpdateView';

const AboutUsPage = () => {

  useUpdateView()

  const { user } = useUser();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    setError(null);
    setSuccess(false);  
    e.preventDefault();
    const updateFoodAPI = `${config.apiBaseUrl}/feedbacks`;

    try {
      console.log(JSON.stringify(formData));
      const response = await fetch(updateFoodAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const responseData = await response.json(); 
        setError(responseData.message); 
        return;
      }

      setSuccess(true);

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='bg-kem'>
      <div className="container mx-auto pt-[100px] py-8">
        <h1 className="text-3xl font-bold mb-4 mt-10">About Us</h1>
        <section className=" bg-primary-red-100 p-6 rounded-lg mb-8 flex flex-row">
          <img src="/about.jpeg" alt="About Us" className="w-[50%] h-full object-cover rounded-lg mb-4" />
          <div className='mx-5'>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-justify">
              We strive to provide our customers with high-quality, delicious meals in a welcoming and cozy atmosphere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue vehicula enim eget gravida. Nullam maximus eget turpis tincidunt convallis. Nam tempor, magna eget vehicula rutrum, ante mauris efficitur libero, ac vehicula eros justo eu massa. Etiam dictum, metus ullamcorper egestas faucibus, lectus metus eleifend neque, nec vestibulum mi erat a orci. Nunc viverra massa id ligula euismod, et pharetra est cursus. In ac est et nibh porta aliquam. Sed cursus lorem eget ipsum tincidunt sollicitudin. Nulla rutrum sapien sed velit euismod, a molestie justo pulvinar. Quisque sollicitudin lorem blandit ex feugiat vestibulum.
            </p>
          </div>
        </section>
        <section className="bg-primary-red-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <div className="grid grid-cols-3 gap-8">
            <TeamMember
              name="Nguyen Gia Bao"
              role="Head Chef"
              image={'/about.jpeg'}
            />
            <TeamMember
              name="Nguyen Dinh Thuan"
              role="Sous Chef"
              image={'/about.jpeg'}
            />
            <TeamMember
              name="Chu Quang Tung"
              role="Waiter"
              image={'/about.jpeg'}
            />
          </div>
        </section>

        <section className="bg-primary-red-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col col-span-2">
              <label htmlFor="name" className="text-lg font-semibold mb-1">Name</label>
              <input 
                required
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your name" 
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="email" className="text-lg font-semibold mb-1">Email</label>
              <input 
                required
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                className="border p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label htmlFor="message" className="text-lg font-semibold mb-1">Message</label>
              <textarea 
                required
                id="message" 
                name="message" 
                rows="4" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Enter your message" 
                className="border p-2 rounded-lg"
              ></textarea>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">Form submitted</p>}
            <button 
              type="submit" 
              className="bg-primary-red text-white py-2 px-2 rounded-lg hover:bg-red-500 transition duration-300"
            >
              Submit Feedback
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

const TeamMember = ({ name, role, image }) => {
  return (
    <div className="flex items-center bg-white rounded-lg p-4 shadow-md">
      <img src={image} alt={name} className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
    </div>
  );
};

export default AboutUsPage;
