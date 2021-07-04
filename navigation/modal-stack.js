import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/home-page';

const Stack = createStackNavigator();

export default HomeStack = () => {
    return(
         <Stack.Navigator headerMode={false}>
                <Stack.Screen name='Home' component={HomePage} />
                <Stack.Screen name='Home' component={HomePage} />
        </Stack.Navigator>
        
    )
}
