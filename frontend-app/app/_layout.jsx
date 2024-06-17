import { StyleSheet, Text, View } from 'react-native'
import { Splash, SplashScreen, Stack, router,  } from 'expo-router'
import { UserProvider, useUser } from '../components/UserContext'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootLayout = () => {
  return (
    <UserProvider>
      <InnerLayout />
    </UserProvider>
  );
};

const InnerLayout = () => {
  const { user, setUser } = useUser();

  useEffect( () => {

    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue) {
          setUser(JSON.parse(jsonValue));
        }
      } catch (e) {
        // Handle error reading value
      }
    };

    fetchData();

  }, []);

  useEffect(() => {

    if (user) {
      router.replace('(tabs)/home');
    }
    else {
      router.replace('/');
    }
  }, [user]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="foods" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;