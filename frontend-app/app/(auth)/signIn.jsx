import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { router, Link } from 'expo-router'
import config from '../../constants/apiconfig'
import { useUser } from '../../components/UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignIn = () => {
    const { user, setUser } = useUser();

    const [form, setForm] = useState({
        username: '',
        password: ''
      })

    
    const signIn = async (e) => {

        e.preventDefault();
        const userData = {
          username: form.username,
          password: form.password,
        };
  
        try {
            const response = await fetch(`${config.apiBaseUrl}/auth/signin`, {
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
  
            try {
              await AsyncStorage.setItem('user', JSON.stringify(responseData.data));
            } catch (e) {
              // saving error
            }
            setUser(responseData.data);
            router.replace('/(tabs)/home')
  
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
                    title="Password"
                    value={form.password }
                    handleChangeText={(e) => setForm({ ...form, password: e })}
                    otherStyles="mt-4"
                />

                <Button 
                    title="Sign in"
                    handlePress={signIn}
                    containerStyles="mt-7"
                />

                <View className="flex-row justify-center pt-5 gap-2">
                    <Text className="text-base font-pmedium">Don't have an account?</Text>
                    <Link href="/signUp" className="text-primary text-base font-medium ml-1">Sign up</Link>
                </View>

            </View>
        </ScrollView>
        
    )
}

export default SignIn