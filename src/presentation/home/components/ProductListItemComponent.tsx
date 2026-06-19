import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ProductModel } from "../../../data/models/ProductModel";
import { useTheme } from "../../../core/hooks/useTheme";
import React, { useCallback } from "react";
import FavouriteIconComponent from "../../../core/components/FavouriteIconComponent";
import { ColorTheme } from "../../../core/theme/Colors";
import Ionicons from "@react-native-vector-icons/ionicons";
import CustomPill from "../../../core/components/CustomPill";
import { useFavorites } from "../../viewmodels/hooks/useFavourites";
import CustomText, { CustomTextVariant } from "../../../core/components/CustomText";

interface ProductListingItemProps {
    product: ProductModel;
    onPress: (product: ProductModel) => void
}
export default function ProductListingItemComponent({ product, onPress }: ProductListingItemProps) {
    const { colors } = useTheme();
    const themedStyles = styles(colors);
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFavourite = isFavorite(product.id);

    const toggleFavouriteHandler = useCallback(async () => {
        await toggleFavorite(product);
    }, [product, toggleFavorite]);
    return (
        <TouchableOpacity style={themedStyles.touchable} onPress={() => onPress(product)}>
            <View style={themedStyles.container}>
                <View style={themedStyles.imageWrapper}>
                    <Image source={{ uri: product.images[0] }} style={themedStyles.image} />
                    <View style={themedStyles.favIconWrapper}>
                        {product.pillType && <CustomPill text={product.pillType} type={product.pillType} />}
                        <FavouriteIconComponent isFavourite={isFavourite} onToggle={toggleFavouriteHandler} />
                    </View>
                </View>
                <View style={themedStyles.detailsContainer}>
                    <CustomText variant={CustomTextVariant.SUBTITLE} style={themedStyles.title}>{product.name}</CustomText>
                    
                    <View style={themedStyles.priceContainer}>
                        <CustomText variant={CustomTextVariant.SUBTITLE} style={themedStyles.price}>${product.price.toFixed(2)}</CustomText>
                        {product.strikeThroughPrice && (
                            <View style={themedStyles.strikePriceContainer}>
                                <CustomText variant={CustomTextVariant.SUBTEXT} style={themedStyles.originalPrice}>
                                    ${product.strikeThroughPrice.toFixed(2)}
                                </CustomText>
                                <Ionicons name="information-circle-outline" size={12} color={colors.textSecondary} />
                            </View>
                        )}
                    </View>
                    
                </View>
            </View>
        </TouchableOpacity>
        
    );
}

function styles(colors: ColorTheme) {
    return StyleSheet.create({
        text: {
            fontSize: 16,
            color: colors.textPrimary,
        },
        title: {
            fontSize: 16,
            color: colors.textPrimary,
            marginBottom: 12,
        },
        price: {
            fontSize: 16,
            color: colors.success,
        },
        originalPrice: {
            fontSize: 12,
            color: colors.textSecondary,
            textDecorationLine: "line-through",
            marginLeft: 4,
            marginRight: 4,
        },
        touchable: {
            width: '48%',
        },
        container: {
            flex: 1,
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 16,
        },
        detailsContainer: {
            padding: 8,
        },
        image: {
            borderRadius: 16,
            height: 120,
            width: '100%',
            marginBottom: 4,
        },
        imageWrapper: {
            position: "relative",
            overflow: "hidden",
        },
        favIconWrapper: {
            position: "absolute",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 8,
        },
        strikePriceContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        priceContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        }
    });
}