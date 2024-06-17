'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components';
import config from '@/constants/apiconfig';
import { useUser } from './UserContext';
import StarRatingReview from "@/components/StarRatingReview";

const CommentSection = ({ foodId }) => {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        userId: user.id,
        username: user.username,
        rating: rating,
        comment: comment,
    };

    try {
      const response = await fetch(`${config.apiBaseUrl}/reviews/${foodId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const responseData = await response.json(); 
        setError(responseData.message); 
        return;
      }

      setSuccess(true);

    } catch (error) {
      setError('An error occurred while submitting the comment.');
    }
  };

  return (
    <div className="mt-8 bg-kem rounded-xl px-5 py-5 mb-5">
      <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 mb-2">
            Rating
          </label>
          <StarRatingReview handleRating={handleRatingChange} size={'50'} />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-red-400"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">Comment submitted successfully.</p>
        )}
        <CustomButton type="submit" title="Submit" handleClick={handleSubmit}/>
      </form>
    </div>
  );
};

export default CommentSection;
