import { View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState } from 'react'
import icons from '../constants/icons'

const InputField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
    return (
        
            
            <View className={` w-full h-10 px-4 bg-gray-200 border-gray-400 rounded-lg items-center flex-row ${otherStyles}`}>
                
                {title === 'Search' && (
                    <Image source={icons.search} className="w-4 h-4 mr-2" resizeMode='contain' tintColor={"#7b7b8b"}/>
                )}

                <TextInput
                    className="flex-1 text-black font-psemibold text-base self-center mb-1"

                    value={value}
                    placeholder={title}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6 " resizeMode='contain'/>
                    </TouchableOpacity>
                )}
                
            </View>

    )
}

export default InputField