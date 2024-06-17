
import { useState, useEffect ,useRef } from "react";
import { FlatList, View, Text, ScrollView, Image, SafeAreaView, Pressable } from "react-native";
import config from '../../constants/apiconfig'
import images from "../../constants/images";
import { router } from "expo-router";
import FoodCard from "../../components/FoodCard";
import CategoryButton from "../../components/CategoryButton";


export default function Home() {

    const banner=[images.banner,images.banner,images.banner]
    const flatListRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [foods, setFoods] = useState([]);
    const [popularFoods, setPopularFoods] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const allFoodAPI = `${config.apiBaseUrl}/foods/all`;
        const popularFoodAPI = `${config.apiBaseUrl}/foods/popular/10`;
        const categoriesAPI = `${config.apiBaseUrl}/categories/all`;
    
        const fetchData = async () => {
          try {
              setLoading(true);
    
              const [response1, response2, response3] = await Promise.all([
                  fetch(allFoodAPI),
                  fetch(popularFoodAPI),
                  fetch(categoriesAPI),
              ]);
    
              if (!response1.ok || !response2.ok || !response3.ok) {
                  throw new Error('Failed to fetch data');
              }
    
              const data1 = await response1.json();
              const data2 = await response2.json();
              const data3 = await response3.json();
    
              setFoods(data1.data);
              setPopularFoods(data2.data);

              const filteredCategories = data3.data.filter(item => item.tag !== 'origin' && item.tag !== 'ingredient');
              setCategories(filteredCategories);
    
          } catch (error) {
              setError(error.message);
          } finally {
              setLoading(false);
          }
        };
    
      fetchData();
    
      }, []);
    


    const [filteredData, setFilteredData] = useState(foods)
    const [category, setCategory] = useState('All')
    const isActive = (categoryName) => categoryName === category
    
    const handleCategory = (category) => {
        setCategory(category);
        if(category === 'All'){
        setFilteredData(foods)
        } else {
        setFilteredData(foods.filter((food) => food.categories.some(cat => cat.name === category)))
        }
    }

    useEffect(() => {
        setFilteredData(foods)
      }, [foods])

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentPage + 1) % banner.length;
            flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
            setCurrentPage(nextIndex);
        }, 5000);
        return () => clearInterval(interval);
    }, [currentPage]);

    if (loading) {
        return null;
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <FlatList
                    ref={flatListRef}
                    data={banner}
                    keyExtractor={(item, index) => index}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={(event) => {
                        const newIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
                        setCurrentPage(newIndex);
                    }}
                    renderItem={({ item }) => (
                        <View className="w-screen ">
                            <View className="w-full h-[200px]  bg-gray-200 rounded-lg items-center flex-row">
                                <Image 
                                    source={item} 
                                    resizeMode="contain" 
                                    className="w-full  rounded-lg"
                                />
                            </View>
                        </View>
                    )}
                />
                <View className="bg-white pb-5">
                    <Text className="text-2xl font-bold my-5 mx-7">Popular Dishes</Text>
                    <FlatList
                        data={popularFoods}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="px-5 bg-white"
                        renderItem={({ item }) => (
                            <FoodCard
                                id={item.id}
                                name = {item.name}
                                description={item.description}
                                rating={item.rating.toFixed(1)}
                                image={item.images[0].url}
                            
                            />
                        )}
                    />
                </View>

                <View className= " bg-primary-red-100  pb-10">
                    <Text className="text-2xl font-bold my-5 mx-2">All Dishes</Text>
                    <View className="flex flex-row flex-wrap justify-center pb-10 ">
                        <CategoryButton
                            title={"All"}
                            containerStles={'w-25'}
                            handlePress={() => handleCategory("All")}
                            isActive={isActive("All")}
                            containerStyles={'mx-1 my-1'}
                        />  
                        {categories.map((category) => (
                            <CategoryButton
                                title={category.name}
                                containerStles={'w-25'}
                                handlePress={() => handleCategory(category.name)}
                                isActive={isActive(category.name)}
                                containerStyles={'mx-1 my-1'}
                            />
                        ))}
                    </View>
                    <View className="flex flex-row flex-wrap px-5 justify-center">
                        {filteredData.map((food) => (
                            <FoodCard
                                key={food.id}
                                id={food.id}
                                name = {food.name}
                                description={food.description}
                                rating={food.rating.toFixed(1)}
                                image={food.images[0].url}
                                containerStyles="mx-4 mb-4"
                            />
                        ))     
                        }
                    </View>
                
                </View>


                

            </ScrollView>

        </SafeAreaView>

    );
}
