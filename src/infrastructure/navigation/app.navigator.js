import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation//stack";
import { Ionicons } from "@expo/vector-icons";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import Biblioteca from "../../features/biblioteca/screens/biblioteca.screen";
import Home from "../../features/Home/screen/home.screen"
import Player from "../../features/Home/screen/video.screen"

import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreens = ({navigation})=>{
  return(
  <HomeStack.Navigator>
    <HomeStack.Screen name="Feed"component={Home} options={{headerShown:false}}/>
    <HomeStack.Screen name="Player" component={Player}options={{headerShown:false}}/>
  </HomeStack.Navigator>
  )
}

const TAB_ICON = {
  Home: "md-home",
  Cursos: "md-book",
  Biblioteca: "md-bookmark",
  Opciones: "md-settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <Tab.Navigator
          screenOptions={createScreenOptions}
          tabBarOptions={{
            activeTintColor: "orange",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreens}/>
          <Tab.Screen name="Cursos" component={RestaurantsNavigator} />
          <Tab.Screen name="Biblioteca" component={Biblioteca} />
          <Tab.Screen name="Opciones" component={SettingsNavigator}/>
        </Tab.Navigator>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
