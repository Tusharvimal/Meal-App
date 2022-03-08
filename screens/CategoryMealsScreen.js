import React from 'react'
import { useSelector } from 'react-redux'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'
import { View, StyleSheet } from 'react-native'


const CategoryMealsScreen = props => {
    const catId = props.route.params.categoryId

    const availableMeals = useSelector(state => state.meals.filteredMeals)

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0)

    if (displayedMeals.length === 0) {
        return (
            <View style={styles.content}>
                <DefaultText>No meals found, maybe check your filters? </DefaultText>
            </View>
        )
    }

    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default CategoryMealsScreen;