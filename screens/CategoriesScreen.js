import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import HeaderButton from '../components/HeaderButton'
import CategoryGridTile from '../components/CategoryGridTile'
import { CATEGORIES } from '../data/dummy-data'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const CategoriesScreen = props => {

    const { navigation } = props

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

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile
                title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        name: 'CategoryMeals',
                        params: {
                            name: itemData.item.title,
                            categoryId: itemData.item.id
                        }
                    })
                }} />
        )
    }

    return (
        <FlatList keyExtractor={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CategoriesScreen;