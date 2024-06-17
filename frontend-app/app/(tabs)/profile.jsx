import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../components/Button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useUser } from '../../components/UserContext'

const Profile = () => {
    const { user, setUser } = useUser();
  return (
    <SafeAreaView>
        <Button 
            title="Sign Out" 
            handlePress={() => {
                setUser(null)
            }}
        />

    </SafeAreaView>
  )
}

export default Profile