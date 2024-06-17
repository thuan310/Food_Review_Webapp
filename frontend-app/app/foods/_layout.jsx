
import {  Stack, useLocalSearchParams,  } from 'expo-router'
import BackButton from '../../components/BackButton'

const FoodLayout = () => {
  const {name} = useLocalSearchParams()

  return (
      <Stack>
        <Stack.Screen 
            name="[id]" 
            options={{
            title: `${name}`,
            headerStyle:{
              backgroundColor: '#F1063E',
              height: 500
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },

            headerLeft: () => {
              return <BackButton/>
            }
          }}
        />
    
      </Stack>  

  )
}
      
export default FoodLayout
