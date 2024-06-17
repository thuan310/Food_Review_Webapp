

import { FlatList, View, Text, ScrollView, Image, SafeAreaView, Pressable } from "react-native";
import { router } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

const FoodCard = ({id, name, description, image, rating, containerStyles}) => {
    return (
      <Pressable 
        className= {` shadow-md bg-kem rounded-xl w-[35vw] h-[60vw] mx-2 ${containerStyles}`}
        onPress={()=>{router.push(
            {
              pathname: `foods/${id}`,
              params: {
                name: name
             }
            }
          )
  
        }}
      >
        <View className="px-2 py-2">
          <Image 
            source={{uri: image}} 
            resizeMode="cover" 
            className=" h-[25vw] w-full object-cover rounded-xl"
          />
        </View>
        <View className=" px-2 py-2 overflow-hidden">
            <Text numberOfLines={1} className=" mb-2 text-base font-bold">{name}</Text>
            <View className="flex flex-row items-center mt-[-5px] mb-1">
                <Text>{rating}</Text>
                <AntDesign name="star" size={18} color="gold" />
            </View>
            <Text numberOfLines={3} className="text-sm text-gray-600">{description}</Text>
        </View>

      </Pressable>
    )
}

export default FoodCard
