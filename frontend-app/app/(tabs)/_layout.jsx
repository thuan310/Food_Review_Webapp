import { View, Text, Image,  } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../constants/icons'


const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className = "items-center justify-center gap-1">
      <Image
        source = {icon}
        resizeMode="contain"
        tintColor={color}
        className= "w-8 h-8"
      />
      <Text
        className={`${focused ? "font-semibold" : "font-regular"} pt-1`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )

}

const TabsLayout = () => {
  return (
    
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false, 
          tabBarActiveTintColor: '#F1063E',
          tabBarInactiveTintColor: '#B0B0B0',
          tabBarStyle:{
            backgroundColor: '#ffffff',
            height: 100
          },     
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.restaurant}
                color={color}
                name="About"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />


      </Tabs>
    </>
  )
}

export default TabsLayout