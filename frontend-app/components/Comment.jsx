import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useUser } from './UserContext';
import config from '../constants/apiconfig';
import Button from './Button';
import { Pressable } from 'react-native';

const StarRating = ({ rating, onRatingChange }) => {
    return (
        <View className="flex flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
                <Pressable key={star} onPress={() => onRatingChange(star)}>
                    <Text className ={star <= rating ? " text-2xl text-yellow-500 mx-1": "text-2xl text-gray-500 mx-1"}>★</Text>
                </Pressable>
            ))}
        </View>
    );
};

const Comment = ({ foodId }) => {
    const { user } = useUser();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async (e) => {
       
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
            Alert.alert("Success", "Comment submitted successfully.");
            setComment('');
            setRating(0);

        } catch (error) {
        setError('An error occurred while submitting the comment.');
        Alert.alert("Error", error.message || 'An error occurred while submitting the comment.');
        }
    };

    return (
        <View >
            <Text className="text-2xl font-bold ">Leave a Comment</Text>
            <View >
                <View className="py-2">
                    <Text className="text-lg" >Rating</Text>
                    <StarRating rating={rating} onRatingChange={handleRatingChange} />
                </View>
                <View className ="pb-5" >
                    <Text className ="text-lg">Comment</Text>
                    <TextInput
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                        multiline
                        numberOfLines={4}
                        placeholder="Write your comment here"
                        required
                        className="rounded-md bg-kem  p-2 w-full mt-2"
                    />
                </View>

                {error && <Text className="text-red-500" >{error}</Text>}
                {success && <Text className="text-green-500" >Comment submitted successfully.</Text>}
                <Button  handlePress={handleSubmit} title="Submit"/>

            </View>
        </View>
    );
};

export default Comment;