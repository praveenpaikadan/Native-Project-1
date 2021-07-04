import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/home-page';
import { BodyCalendarCurrent } from '../screens/modal/body-calender-current';
import { BodyCalendar } from '../components/body-calendar';
import { MyWorkouts } from '../screens/modal/my-workouts';
import HomeStack from './home-stack';

const Tab = createBottomTabNavigator();

export default TabNav = () => {
    return(
        
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeStack} options={{tabBarButton: () => null}} />
            <Tab.Screen name='BodyCalendar' component={HomeStack.BodyCalendar} />
            <Tab.Screen name='MyWorkouts' component={MyWorkouts} />
        </Tab.Navigator>
        
    )
}

