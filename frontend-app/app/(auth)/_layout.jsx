import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const Auth = () => {

  return (
    <>
        <Stack>
            <Stack.Screen
                name="signIn"
                options={{
                    title: "Sign In",
                    headerStyle:{
                    backgroundColor: '#F1063E',
                    height: 500
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                    },
                    headerBackVisible: false
                }}
            />
            <Stack.Screen
                name="signUp"
                options={{
                    title: "Sign Up",
                    headerStyle:{
                    backgroundColor: '#F1063E',
                    height: 500
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                    fontWeight: 'bold',
                    },
                    headerBackVisible: false
                }}
            />
        </Stack>
    </>
  )
}

export default Auth