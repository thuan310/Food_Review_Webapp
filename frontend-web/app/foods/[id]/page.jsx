'use client'
import SimpleImageSlider from "react-simple-image-slider";
import React from 'react'
import { banners } from '@/constants'
import StarRating from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import { useState, useEffect } from "react";
import config from "@/constants/apiconfig";
import { useUser } from "@/components/UserContext";
import CommentSection from "@/components/CommentSection";
import useUpdateView from "@/components/useUpdateView";

const FoodDetail = ({params}) => {

    useUpdateView()
    const { user } = useUser();
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const foodAPI = `${config.apiBaseUrl}/foods/${params.id}`;
       
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
        return <div className='pt-[100px] bg-kem'>Loading...</div>;
    }

    return (
        <div className='pt-[100px] bg-kem'>
            <div className='flex flex-row'>
                <SimpleImageSlider
                    
                    width={'60vw'}
                    height={'35vw'}
                    images={food.images.map(image => ({ url: image.url }))}
                    showNavs={true}
                    autoPlay={false}


                />
                <div className="w-[40vw] px-10">
                    <p className=" text-3xl font-bold pt-5">{food.name}</p>
                    <div className='flex flex-row items-center mt-[-5px] mb-1'>
                        <StarRating rating={food.rating} size={20}/>
                        <p className='text-[15px] pl-1 pt-[7px]'>({food.rating.toFixed(1)})</p>
                    </div>
                    <p className="text-xl font-semibold">${food.price}</p>
                    <p className="pt-2 text-lg">{food.description}</p>

                    <div className='mt-5 text-gray-400'>

                        <p className="">Origin: {food.origin.originalName}</p>
                        <p className="">Ingredients: {food.ingredients.map(ingredient => ingredient.ingredientName).join(', ')}</p>
    
                    </div>
                    
                </div>
            </div>
            <div className=" bg-primary-red-100 py-10 px-10">
                <p className="text-3xl font-bold pt-2 pb-5">Reviews</p>
                {user && user?.role != "admin" && (
                    <CommentSection foodId={food.id} />
                )}

                {food.reviews.map((review) => (
                    <div className="my-2">
                        <ReviewCard
                            name={review.username}
                            rating={review.rating.toFixed(1)}
                            review={review.comment}
                        />

                    </div>
                    
                ))}
            </div>
            
        </div>
    )
}

export default FoodDetail