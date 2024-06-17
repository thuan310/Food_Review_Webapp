import { Text, Pressable } from 'react-native'
import React from 'react'



const CategoryButton = ({title, handlePress, containerStyles, textStyles, isActive}) => {
  return (
    <Pressable
        onPress={handlePress}
        className={isActive ? `bg-primary-red rounded-md px-3 py-2 ${containerStyles}`:` bg-white hover:text-white hover:bg-primary-red rounded-md px-3 py-2 ${containerStyles}`}
    >
        <Text className={isActive ? ' font-semibold text-white': '  font-semibold' }>
            {title}
        </Text>
    </Pressable>
  )
}

export default CategoryButton