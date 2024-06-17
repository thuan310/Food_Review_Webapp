
import React, { useState } from 'react';
import { useUser } from '../../components/UserContext';
import config from '../../constants/apiconfig';
import { ScrollView, View, Text,Image, TextInput } from 'react-native';
import Button from '../../components/Button';
import images from '../../constants/images';

const AboutUsPage = () => {


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
    <ScrollView className='bg-kem'>
      <View className="container mx-auto pt-[100px] py-8">
        <Text className="text-3xl font-bold mb-4 mt-10 mx-6">About Us</Text>
        <View className="bg-primary-red-100 p-6 rounded-lg mb-8 ">
          <Image source={images.about} className="w-full h-[40vw] object-cover rounded-lg mb-4" />
          <View className=''>
            <Text className="text-2xl font-bold mb-2">Our Mission</Text>
            <Text className="text-base text-justify">
              We strive to provide our customers with high-quality, delicious meals in a welcoming and cozy atmosphere. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue vehicula enim eget gravida. Nullam maximus eget turpis tincidunt convallis. 
            </Text>
          </View>
        </View>

        <View className="bg-primary-red-100 p-6 rounded-lg mb-8">
          <Text className="text-2xl font-bold mb-4">Our Team</Text>
          <View className="">
            <TeamMember
              name="Nguyen Gia Bao"
              role="Head Chef"
              image={images.about}
            />
            <TeamMember
              name="Nguyen Dinh Thuan"
              role="Sous Chef"
              image={images.about}
            />
            <TeamMember
              name="Chu Quang Tung"
              role="Waiter"
              image={images.about}
            />
          </View>
        </View>

        <View className="bg-primary-red-100 p-6 rounded-lg mb-8">
          <Text className="text-2xl font-bold mb-4">Feedback Form</Text>
          <View onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <View className="flex flex-col col-span-2">
              <Text className="text-lg font-semibold mb-1">Name</Text>
              <TextInput
                required
                id="name"
                name="name"
                value={formData.name}
                onChangeText={(value) => handleChange('name', value)}
                placeholder="Enter your name"
                className="p-2 rounded-lg bg-kem"
              />
            </View>
            <View className="flex flex-col col-span-2">
              <Text className="text-lg font-semibold mb-1">Email</Text>
              <TextInput
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChangeText={(value) => handleChange('email', value)}
                placeholder="Enter your email"
                className="p-2 rounded-lg bg-kem"
              />
            </View>
            <View className="flex flex-col col-span-2">
              <Text className="text-lg font-semibold mb-1">Message</Text>
              <TextInput
                required
                id="message"
                name="message"
                multiline
                numberOfLines={4}
                value={formData.message}
                onChangeText={(value) => handleChange('message', value)}
                placeholder="Enter your message"
                className="p-2 rounded-lg bg-kem"
              />
            </View>
            {error && <Text className="text-red-500 mb-4">{error}</Text>}
            {success && <Text className="text-green-500 mb-4">Form submitted</Text>}
            <Button
              title="Submit Feedback"
              handlePress={handleSubmit}
              className="bg-primary-red mt-2 text-white  px-2 rounded-lg active:bg-red-500 transition duration-300"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const TeamMember = ({ name, role, image }) => {
  return (
    <View className="flex items-center bg-white rounded-lg p-4 shadow-md my-2">
      <Image source={image} className="w-16 h-16 rounded-full mr-4" />
      <View>
        <Text className="text-xl font-semibold">{name}</Text>
        <Text className="text-gray-600">{role}</Text>
      </View>
    </View>
  );
};

export default AboutUsPage;
