import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { ProductModel } from "../../../data/models/ProductModel";
import { useTheme } from "../../../core/hooks/useTheme";
import React, { useCallback } from "react";
import FavouriteIconComponent from "../../../core/components/FavouriteIconComponent";
import { ColorTheme } from "../../../core/theme/Colors";
import { useFavorites } from "../../viewmodels/hooks/useFavourites";
import CustomText, { CustomTextVariant } from "../../../core/components/CustomText";

interface ProductListingItemProps {
    product: ProductModel;
    onPress: (product: ProductModel) => void;
    style?: StyleProp<ViewStyle>;
}
export default function ProductListingItemComponent({ product, onPress, style }: ProductListingItemProps) {
    const { colors } = useTheme();
    const themedStyles = styles(colors);
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFavourite = isFavorite(product.id);

    const toggleFavouriteHandler = useCallback(async () => {
        await toggleFavorite(product);
    }, [product, toggleFavorite]);
    return (
        <TouchableOpacity style={[themedStyles.touchable, style]} onPress={() => onPress(product)}>
            <View style={themedStyles.container}>
                <View style={themedStyles.imageWrapper}>
                    <Image source={{ uri: product.images[0] }} style={themedStyles.image} />
                    <View style={themedStyles.topRow}>
                        <View style={themedStyles.ratingPill}>
                            <CustomText variant={CustomTextVariant.SUBTEXT} style={themedStyles.ratingText}>{product.rating} ⭐</CustomText>
                        </View>
                        <FavouriteIconComponent isFavourite={isFavourite} onToggle={toggleFavouriteHandler} />
                    </View>
                    <View style={themedStyles.bottomOverlay}>
                        <CustomText variant={CustomTextVariant.SUBTITLE} style={themedStyles.title}>{product.name}</CustomText>
                        <CustomText variant={CustomTextVariant.SUBTITLE} style={themedStyles.price}>${product.price.toFixed(2)}</CustomText>
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
            fontSize: 12,
            color: colors.white,
            marginBottom: 2,
        },
        price: {
            fontSize: 12,
            color: colors.white,
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
            overflow: "hidden",
        },
        image: {
            borderRadius: 16,
            height: 180,
            width: '100%',
        },
        imageWrapper: {
            position: "relative",
            overflow: "hidden",
        },
        topRow: {
            position: "absolute",
            width: "100%",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 8,
        },
        ratingPill: {
            backgroundColor: colors.backgroundSecondary,
            opacity: 0.8,
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 2,
            alignSelf: "flex-start",
        },
        ratingText: {
            fontSize: 10,
            color: colors.textPrimary,
        },
        bottomOverlay: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "rgba(0,0,0,0.35)",
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