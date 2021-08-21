import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';


//icons
import { MaterialIcons } from '@expo/vector-icons';

//components
import MasterControl from './screens/MasterControl/index';
import Themes from './screens/Themes';
import Settings from './screens/Settings';

//styles
import { background, neutral } from './styles/colors/theme';
import AppLoading from './screens/AppLoading';


const Tab = createBottomTabNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
  });

  const customTabOptions = ({ route }: any) => ({
    tabBarIcon: ({ color, size }: any) => {
      let iconName;

      if (route.name === 'MasterControl') {
        iconName = 'tune';
      } else if (route.name === 'Themes') {
        iconName = 'palette';
      } else if (route.name === 'Settings') {
        iconName = 'settings'
      } else {
        iconName = 'american-football-sharp'
      }

      //@ts-ignore
      return <MaterialIcons name={iconName} size={size} color={color} />;
    },
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={customTabOptions}
            tabBarOptions={{
              activeTintColor: neutral[100],
              inactiveTintColor: neutral[700],
              style: {
                ...background.neutral[900],
                borderTopWidth: 1,
                borderTopColor: neutral[800],
                height: 60,
              },
              labelStyle: {
                marginBottom: 7,
                fontFamily: 'Raleway-Regular',
              }
            }}
          >
            <Tab.Screen name="MasterControl" component={MasterControl} />
            <Tab.Screen name="Themes" component={Themes} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>

    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
