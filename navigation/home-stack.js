import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../screens/home-page';
import { BodyCalendarCurrent } from '../screens/modal/body-calender-current';

const Stack = createStackNavigator();

export default HomeStack = () => {
    return(
         <Stack.Navigator headerMode={false}>
                <Stack.Screen name='Home' component={HomePage} />
                <Stack.Screen name='BodyCalendar' component={BodyCalendarCurrent} />
        </Stack.Navigator>
        
    )
}
