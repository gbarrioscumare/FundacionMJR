import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";
import Biblioteca from "../../features/biblioteca/screens/biblioteca.screen";

import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
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
          <Tab.Screen name="Cursos" component={RestaurantsNavigator} />
          <Tab.Screen name="Biblioteca" component={Biblioteca} />
          <Tab.Screen name="Opciones" component={SettingsNavigator} />
        </Tab.Navigator>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
