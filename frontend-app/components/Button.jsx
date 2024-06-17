import { Text, Pressable } from 'react-native'
import React from 'react'



const Button = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <Pressable
        onPress={handlePress}
        className={`bg-primary active:bg-red-600  bg-red-500 py-3 px-5 rounded-md ${containerStyles}`}
        disabled={isLoading}
    >
        <Text className={`text-white text-center font-bold text-lg ${textStyles}`}>
            {title}
        </Text>
    </Pressable>
  )
}

export default Button