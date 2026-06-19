import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '../../core/hooks/useTheme';
import { ColorTheme } from '../../core/theme/Colors';
import ProductListingItemComponent from '../home/components/ProductListItemComponent';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../core/types/AppNavigationType';
import { useFavorites } from '../viewmodels/hooks/useFavourites';
import CustomText, { CustomTextVariant } from '../../core/components/CustomText';

export default function FavoritesScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { favorites, isLoading } = useFavorites();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handleProductPress = (product: any) => {
    navigation.getParent()?.navigate('ProductDetails', { product });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <CustomText variant={CustomTextVariant.TITLE} style={styles.title}>Favorites</CustomText>
        {isLoading && <CustomText variant={CustomTextVariant.TEXT} style={styles.loadingText}>Loading...</CustomText>}
        {!isLoading && favorites.length === 0 && (
          <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.emptyText}>No favorites added yet</CustomText>
        )}
        {!isLoading && favorites.length > 0 && (
          <FlatList
            data={favorites}
            numColumns={2}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
              <ProductListingItemComponent
                product={item}
                onPress={handleProductPress}
              />
            )}
            scrollEnabled={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ColorTheme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      width: '100%',
      padding: 16,
      backgroundColor: colors.background,
    },
    list: {
      width: '100%',
    },
    listContent: {
      paddingBottom: 16,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'left',
    },
    loadingText: {
      fontSize: 16,
      color: colors.textPrimary,
      textAlign: 'center',
      marginTop: 20,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
    columnWrapper: {
      justifyContent: 'flex-start',
      marginBottom: 12,
      gap: 12,
      color: colors.textPrimary,
    },
  });
}
