import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import MealList from '../components/MealList'
import { useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import DefaultText from '../components/DefaultText'

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals)
    const { navigation } = props;
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Favorite'
                        iconName='ios-menu'
                        onPress={() => {
                            navigation.toggleDrawer()
                        }}
                    />
                </HeaderButtons>
            ),
        })
    }, [navigation])

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <DefaultText>No favorite meals found. Start adding some!</DefaultText>
            </View>
        )
    }

    return (
        <MealList listData={favMeals} navigation={props.navigation} />
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default FavoritesScreen;