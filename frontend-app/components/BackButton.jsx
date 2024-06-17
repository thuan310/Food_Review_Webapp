import { Text, Pressable, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';


const BackButton = () => {
  return (
    <Pressable
        onPress={() => {
            router.back()
        }}
        
        
    >
        <AntDesign name="back" size={24} color="white" />
    </Pressable>
  )
}

export default BackButton