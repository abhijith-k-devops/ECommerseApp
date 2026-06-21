import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackParamList } from "../types/AppNavigationType";
import ProductListScreen from "../../presentation/home/ProductListingScreen";
import ProductDetailsScreen from "../../presentation/details/ProductDetailsScreen";
import SearchScreen from "../../presentation/search/SearchScreen";
import FavoritesScreen from "../../presentation/favorites/FavoritesScreen";
import CustomBottomNavigation from "../components/CustomBottomNavigation";
import { useTheme } from "../hooks/useTheme";
import CartScreen from "../../presentation/cart/CartScreen";


const RootStack = createNativeStackNavigator<MainStackParamList>();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="ProductListing" component={ProductListScreen} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}

function TabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props: any) => <CustomBottomNavigation {...props} />}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeStackNavigator}
                options={{ title: "Home" }}
            />
            <Tab.Screen 
                name="Search" 
                component={SearchScreen}
                options={{ title: "Search" }}
            />
            <Tab.Screen 
                name="Favorites" 
                component={FavoritesScreen}
                options={{ title: "Favorites" }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigation() {
    const { colors } = useTheme();

    return (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
            <RootStack.Group>
                <RootStack.Screen 
                    name="Tabs" 
                    component={TabsNavigator}
                    options={{ headerShown: false }}
                />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: "card" }}>
                <RootStack.Screen
                    name="ProductDetails"
                    component={ProductDetailsScreen}
                    options={({ route }) => ({
                        headerShown: true,
                        headerBackButtonDisplayMode: "minimal",
                        title: route.params.product.name,
                        headerStyle: {
                            backgroundColor: colors.background,
                        },
                        headerTintColor: colors.textPrimary,
                        headerTitleStyle: {
                            color: colors.textPrimary,
                            fontWeight: "600",
                        },
                    })}
                />
            </RootStack.Group>
            <RootStack.Group screenOptions={{ presentation: "card" }}>
                <RootStack.Screen
                    name="Cart"
                    component={CartScreen}
                    options={{
                        headerShown: true,
                        headerBackButtonDisplayMode: "minimal",
                        title: "Cart",
                        headerStyle: {
                            backgroundColor: colors.background,
                        },
                        headerTintColor: colors.textPrimary,
                        headerTitleStyle: {
                            color: colors.textPrimary,
                            fontWeight: "600",
                        },
                    }}
                />
            </RootStack.Group>
        </RootStack.Navigator>
    );
}