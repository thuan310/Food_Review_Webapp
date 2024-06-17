import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

const CommentCard = ({name, rating, comment}) => {
  return (
    <View className=' flex-1 flex flex-col p-4 bg-white rounded-md shadow-md'>
        <View className ="flex justify-between">
            <Text className="font-semibold">{name}</Text>
            <View className="flex flex-row items-center ">
                <Text className="text-md mr-1">{rating.toFixed(1)}</Text>
                <AntDesign name="star" size={15} color="gold" />
            </View>
            <Text className='text-sm text-gray-500'>{comment}</Text>
        </View>

    </View>
  )
}

export default CommentCard