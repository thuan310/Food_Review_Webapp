'use client'

import Image from "next/image";
import Link from "next/link";
import { banners } from "@/constants";
import ImageSlider from "@/components/ImageSlider";
import FoodCard from "@/components/FoodCard";
import { useState, useEffect } from "react";
import { CustomButton } from "@/components";
import config from "@/constants/apiconfig";
import CategoryButton from "@/components/CategoryButton";
import Cookies from "js-cookie";
import Popup from "@/components/Popup";

import useUpdateView from "@/components/useUpdateView";

export default function Home() {
  useUpdateView()
  const [foods, setFoods] = useState([]);
  const [popularFoods, setPopularFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const allFoodAPI = `${config.apiBaseUrl}/foods/all`;
    const popularFoodAPI = `${config.apiBaseUrl}/foods/popular/10`;
    const categoriesAPI = `${config.apiBaseUrl}/categories/all`;

    const fetchData = async () => {
      try {
          setLoading(true);

          const [response1, response2, response3] = await Promise.all([
              fetch(allFoodAPI, {
                method: 'GET',
                cache: 'no-store'
              }),
              fetch(popularFoodAPI, {
                method: 'GET',
                cache: 'no-store'
              }),
              fetch(categoriesAPI, {
                method: 'GET',
                cache: 'no-store'
              }),
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

  const PAGE_SIZE = 10;
  const [index, setIndex] = useState(0)
  const [filteredData , setFilteredData] = useState ([])
  const [visibleData , setVisibleData] = useState ([])
  
  useEffect(() => {
    setFilteredData(foods)
  }, [foods])

  useEffect(() => {
    const numberOfItems = PAGE_SIZE * ( index +1 ); 

    const newArray = []; 

    for(let i= 0 ; i< filteredData.length ; i++ ){
      if(i < numberOfItems) 
          newArray.push(filteredData[i])
    }

    setVisibleData(newArray);
    
  } , [index, filteredData])
  

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
  


  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupSeen = Cookies.get('popupSeen');
    if (!popupSeen) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        console.log('Show popup');
      }, 5000); 

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    Cookies.set('popupSeen', 'true', { expires: 7 }); 
  };

  
  if (loading) {
    return null
  }
  return (

    <main className="  pt-[100px] ">
      {showPopup && <Popup onClose={handleClosePopup} path={'/foods/1'} />}
      <div className="flex flex-col ">
        <div className="">
          <ImageSlider images={banners} />
        </div>

        <div className="bg-kem px-10 py-10">
          <div>
            <p className=" text-primary-red text-sm font-semibold">CUSTOMER'S FAVOURITES</p>
            <p className="text-3xl font-bold pt-2 pb-5">Popular Dishes</p>
          </div>
          <div className="flex flex-row flex-wrap gap-x-10 gap-y-5">
            {popularFoods.map((food) => (
              <Link
                href={`/foods/${food.id}`}
              >
                <FoodCard
                  key={food.id}
                  name={food.name}
                  description={food.description}
                  rating={food.rating}
                  image={food.images[0].url}
                  containerStyles={'bg-white'}
                />
              </Link>
              
            ))}
          </div>

          
        </div>

        <div className=" bg-primary-red-100 px-10 py-10">
          <div>
            <p className=" text-primary-red text-sm font-semibold">DISCOVER OUR SPECIALTIES</p>
            <p className="text-3xl font-bold pt-2 pb-5">All Menu</p>
          </div>


          <div className="flex flex-wrap gap-5 pb-7">
            <CategoryButton
                title={'All'}
                containerStles={'w-25'}
                handleClick={() => handleCategory("All")}
                isActive={isActive("All")}
            />
            {categories.map((category) => (
                <CategoryButton
                title={category.name}
                containerStles={'w-25'}
                handleClick={() => handleCategory(category.name)}
                isActive={isActive(category.name)}
                />
                
            ))}
          </div>

          {/* grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-5 */}
          <div className="flex flex-row flex-wrap gap-x-10 gap-y-5 ">
            {visibleData.map((food) => (
              <Link
                href={`/foods/${food.id}`}
              >
                <FoodCard
                  key={food.id}
                  name={food.name}
                  description={food.description}
                  rating={food.rating}
                  image={food.images[0].url}
                />
              </Link>
              
            ))}
          </div>

          
          {visibleData.length < foods.length && (
            <CustomButton
              title={"Load more"}
              handleClick={()=> setIndex(index + 1)}
              containerStles={' mt-5'}
            />
          )}
          

        </div>
        
      </div>
      

    </main>
  );
}
