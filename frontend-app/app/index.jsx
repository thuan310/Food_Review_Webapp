import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import Button from '../components/Button';

export default function App() {


  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle = {{ height: '100%'}}>
        <View className = "w-full justify-center items-center h-full px-4">
          <Text className="text-4xl font-bold">Review Food</Text>
          <Text className="text-s font-pregular text-gray-600 mt-7 px-5 text-center">
            Learn words using cards, look up in the dictionary, and practice with quizzes.
          </Text>

          <Button
            title = "Continue"
            handlePress = {() => {router.replace('signIn')}}
            containerStyles="w-full mt-7"
          />
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 