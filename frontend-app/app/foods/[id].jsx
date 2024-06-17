import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect,useRef  } from 'react';
import { useUser } from '../../components/UserContext';
import config from '../../constants/apiconfig';
import { FlatList} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Comment from '../../components/Comment';
import CommentCard from '../../components/CommentCard';

const FoodScreen = () => {
    const flatListRef = useRef(null);
    const { id } = useLocalSearchParams();
    const { user } = useUser();
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const foodAPI = `${config.apiBaseUrl}/foods/${id}`;
       
        const fetchData = async () => {
          try {
              setLoading(true);
    
              const [response1] = await Promise.all([
                  fetch(foodAPI),
              ]);
    
              if (!response1.ok) {
                  throw new Error('Failed to fetch data');
              }
    
              const data1 = await response1.json();

              setFood(data1.data);
    
          } catch (error) {
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };
    
      fetchData();
    
    }, []);

    if (loading) {
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    )}

    return (
        <ScrollView>
            <FlatList
                ref={flatListRef}
                data={food.images}
                keyExtractor={(item, index) => index}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View className="w-screen ">
                        <View className="w-full h-[200px]  bg-gray-200 rounded-lg items-center flex-row">
                            <Image 
                                source={{ uri: item.url }} 
                                resizeMode="contain" 
                                className="w-full h-[70vw] rounded-lg"
                            />
                        </View>
                    </View>
                )}
            />
            <View className="px-5 py-5 bg-kem">
                <Text className="text-2xl font-bold ">{food.name}</Text>
                <View className="flex flex-row items-center ">
                    <Text className="text-lg mr-1">{food.rating.toFixed(1)}</Text>
                    <AntDesign name="star" size={20} color="gold" />
                </View>
                <Text className="text-xl font-semibold">${food.price}</Text>
                <Text className="text-lg">{food.description}</Text>
                <View className="pt-2">
                    <Text className="text-gray-500">Origin: {food.origin.originalName}</Text>
                    <Text className="text-gray-500">Ingredients: {food.ingredients.map(ingredient => ingredient.ingredientName).join(', ')}</Text>
                </View>
            </View>
            <View className="px-5 py-5 bg-primary-red-100">
                <Comment foodId={id}/>
                {food.reviews.map((review) => (
                    <View className="my-2">
                        <CommentCard
                            name = {review.username}
                            rating={review.rating}
                            comment={review.comment}
                        />
                    </View>  
                ))}
            </View>

            
        </ScrollView>
    )
}

export default FoodScreen