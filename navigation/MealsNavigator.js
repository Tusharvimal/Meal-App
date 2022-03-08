import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native'
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import FavoritesScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen'
import Colors from '../constants/Colors';
import { createDrawerNavigator } from '@react-navigation/drawer'
import FilterScreen from '../screens/FiltersScreen'

const Stack = createNativeStackNavigator()

const defaultStackNavStyling = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={defaultStackNavStyling}
        >
            <Stack.Screen
                name="Meal Categories"
                component={CategoriesScreen}

                options={{
                    headerTitle: 'Meal Categories'
                }}
            />
            <Stack.Screen
                name="CategoryMeals"
                component={CategoryMealsScreen}
                options={({ route }) => ({
                    headerTitle: route.params.name
                })}
            />
            <Stack.Screen
                name="MealDetail"
                component={MealDetailScreen}
                options={({ route }) => ({
                    headerTitle: route.params.name
                })} />
        </Stack.Navigator>
    )
}

const FavoriteNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={defaultStackNavStyling}
        >
            <Stack.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={{
                    headerTitle: 'Favorites!'
                }}
            />
            <Stack.Screen
                name='MealDetail'
                component={MealDetailScreen}
                options={({ route }) => ({
                    headerTitle: route.params.name,
                })}
            />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

const MealsFavTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.accentColor,
                tabBarLabelStyle: {
                    fontFamily: 'open-sans-bold'
                }
            }}
        >
            <Tab.Screen
                name="Meals"
                component={MealsNavigator}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            color = Colors.accentColor
                        }
                        return <Ionicons name='ios-restaurant' size={25} color={color} />
                    }
                }}
            />
            <Tab.Screen
                name='FavoritesScreen'
                component={FavoriteNavigator}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            color = Colors.accentColor
                        }
                        return <Ionicons name='ios-star' size={25} color={color} />
                    },
                    tabBarLabel: 'Favorites!'
                }}
            />
        </Tab.Navigator>
    )
}

const Filters = () => {
    return (
        <Stack.Navigator screenOptions={defaultStackNavStyling}>
            <Stack.Screen
                name="FiltersScreen"
                component={FilterScreen}
            />
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName='FavMeals'
                screenOptions={{
                    headerShown: false,
                    drawerActiveTintColor: Colors.accentColor,
                    drawerLabelStyle: {
                        fontFamily: 'open-sans-bold'
                    }
                }}
            >
                <Drawer.Screen
                    name='FavMeals'
                    component={MealsFavTabNavigator}
                    options={{
                        drawerLabel: 'Meals'
                    }}
                />
                <Drawer.Screen
                    name='Filters'
                    component={Filters}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator