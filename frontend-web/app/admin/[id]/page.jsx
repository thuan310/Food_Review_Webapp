'use client'

import React, { useState, useEffect } from 'react';
import StarRating from "@/components/StarRating";
import ReviewCard from "@/components/ReviewCard";
import config from "@/constants/apiconfig";
import { CustomButton } from '@/components';
import { useUser } from '@/components/UserContext';

const EditFoodDetail = ({ params }) => {
    const { user } = useUser();
    const [food, setFood] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
    });

    useEffect(() => {
        const foodAPI = `${config.apiBaseUrl}/foods/${params.id}`;
        const categoriesAPI = `${config.apiBaseUrl}/categories/all`;

        const fetchData = async () => {
            try {
                setLoading(true);

                const [response1, response2] = await Promise.all([
                    fetch(foodAPI),
                    fetch(categoriesAPI),
                ]);

                if (!response1.ok || !response2.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data1 = await response1.json();
                const data2 = await response2.json();

                const foodData = data1.data;

                setFood(foodData);
                setCategories(data2.data);
                setFormData({
                    name: foodData.name || '',
                    description: foodData.description || '',
                    price: foodData.price || ''
                });

            } catch (error) {

            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateFoodAPI = `${config.apiBaseUrl}/foods/${params.id}`;

        try {
            console.log(JSON.stringify(formData));
            const response = await fetch(updateFoodAPI, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const responseData = await response.json(); 
                setError(responseData.message); 
                return;
            }

            
            const updatedFood = await response.json();
            setFood(updatedFood);

        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const deleteReviewAPI = `${config.apiBaseUrl}/reviews/${params.id}/${reviewId}`;

        try {
            const response = await fetch(deleteReviewAPI, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete review');
            }

            setFood((prevFood) => ({
                ...prevFood,
                reviews: prevFood.reviews.filter((review) => review.id !== reviewId)
            }));

        } catch (error) {
            setError(error.message);
        }
    };



    if (loading) {
        return <div className='pt-[100px] bg-kem'>Loading...</div>;
    }

    return (
        <div className='pt-[100px] bg-kem'>
            <div className='py-10 px-10'>
                <p className="text-3xl font-bold pt-2 pb-5">Edit Food Details</p>
                <form onSubmit={handleSubmit} >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-bold mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-lg font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-lg font-bold mb-2">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label className="block text-lg font-bold mb-2">Images</label>
                        {formData.images.map((image, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={image.url}
                                    onChange={(e) => handleImageChange(e, index)}
                                    className="w-full px-3 py-2 border rounded-md mr-2"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddImage}
                            className="bg-primary-red text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
                        >
                            Add Image
                        </button>
                    </div> */}
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="bg-primary-red text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>

            <div className="bg-primary-red-100 py-10 px-10">
                <p className="text-3xl font-bold pt-2 pb-5">Reviews</p>

                {food.reviews?.map((review) => (
                    <div key={review.id} className="my-2 flex justify-between items-center">
                        <ReviewCard
                            name={review.username}
                            rating={review.rating.toFixed(1)}
                            review={review.comment}
                        />
                        <CustomButton title="Delete" handleClick={() => handleDeleteReview(review.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EditFoodDetail;
