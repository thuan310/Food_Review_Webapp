import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { router, Link } from 'expo-router'
import config from '../../constants/apiconfig'
import { useUser } from '../../components/UserContext'

const SignUp = () => {

    const { user, setUser } = useUser();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
      })

    
    const signIn = async (e) => {

        e.preventDefault();
        const userData = {
          username: form.username,
          email: form.email,
          password: form.password,
          role: 'user'
        };
  
        try {
            const response = await fetch(`${config.apiBaseUrl}/auth/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
            });
      
            if (!response.ok) {

              throw new Error('Failed to sign in');
              
            }
  
            const responseData = await response.json();
            console.log('Sign in successful', responseData);
  
           
            setUser(responseData.data);

  
          } catch (error) {
            console.error('Error signing in:', error.message);

          }
      };


    return (
        <ScrollView className=" mx-4 "> 
            <View className="w-full justify-center px-4">
                <InputField
                    title="Username"
                    value={form.username}
                    handleChangeText={(e) => setForm({ ...form, username: e })}
                    otherStyles="mt-7"
                />
                <InputField
                    title="Email"
                    value={form.email}
                    handleChangeText={(e) => setForm({ ...form, email: e })}
                    otherStyles="mt-4"
                    keyboardType="email-address"
                />
                <InputField
                    title="Password"
                    value={form.password }
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                    otherStyles="mt-4"
                />

                <Button 
                    title="Sign up"
                    handlePress={signIn}
                    containerStyles="mt-7"
                />

                <View className="flex-row justify-center pt-5 gap-2">
                    <Text className="text-base font-pmedium">Already have account?</Text>
                    <Link href="/signIn" className="text-primary text-base font-medium ml-1">Sign in</Link>
                </View>

            </View>
        </ScrollView>
        
    )
}

export default SignUp