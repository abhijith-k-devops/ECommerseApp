import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@react-native-vector-icons/ionicons";
import {
    Image,
    Pressable,
    ScrollView,
    Share,
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../core/types/AppNavigationType";
import { ColorTheme } from "../../core/theme/Colors";
import { useTheme } from "../../core/hooks/useTheme";
import FavouriteIconComponent, { FavouriteIconType } from "../../core/components/FavouriteIconComponent";
import CustomButton, { ButtonType } from "../../core/components/CustomButton";
import CustomText, { CustomTextVariant } from "../../core/components/CustomText";
import { useCart } from "../viewmodels/hooks/useCart";
import { CartModel } from "../../data/models/CartModel";
import { useFavorites } from "../viewmodels/hooks/useFavourites";

const BUYER_BADGES = ["A", "J", "M", "K"];

export default function ProductDetailsScreen() {
    const route = useRoute<RouteProp<MainStackParamList, "ProductDetails">>();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList, "ProductDetails">>();
    const { product } = route.params;
    const { colors } = useTheme();
    const { width: screenWidth } = useWindowDimensions();
    const styles = useMemo(() => createStyles(colors, screenWidth), [colors, screenWidth]);
    const { isFavorite, toggleFavorite} = useFavorites();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const productImages = useMemo(() => product.images.filter(Boolean), [product.images]);
    const selectedImage = productImages[selectedImageIndex] ?? productImages[0];
    const totalPrice = useMemo(() => product.price * quantity, [product.price, quantity]);
    const { addToCart } = useCart();

    const handleShare = useCallback(async () => {
        await Share.share({
            message: `${product.name}\n$${product.price.toFixed(2)}\n${product.description}`,
        });
    }, [product.description, product.name, product.price]);

    const toggleFavourite = useCallback(() => {
        toggleFavorite(product);
    }, [toggleFavorite, product]);

    const increaseQuantity = useCallback(() => {
        setQuantity((prev) => prev + 1);
    }, []);

    const decreaseQuantity = useCallback(() => {
        setQuantity((prev) => Math.max(1, prev - 1));
    }, []);

    const handleAddToCart = useCallback(async () => {
        const cartItem: CartModel = {
            ...product,
            quantity,
        };
        await addToCart(cartItem);
    }, [addToCart, product, quantity]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={styles.headerActions}>
                    <FavouriteIconComponent isFavourite={isFavorite(product.id)} onToggle={toggleFavourite} type={FavouriteIconType.DETAIL} />
                    <TouchableOpacity style={styles.headerIconButton} onPress={handleShare}>
                        <Ionicons name="share-social-outline" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [colors.textPrimary, handleShare, isFavorite, navigation, styles.headerActions, styles.headerIconButton, toggleFavorite, product]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.heroImageContainer}>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.heroImage} />
                    ) : (
                        <View style={styles.heroImagePlaceholder} />
                    )}
                </View>

                <View style={styles.thumbnailRow}>
                    {productImages.map((image, index) => {
                        const selected = index === selectedImageIndex;
                        return (
                            <Pressable
                                key={`${image}-${index}`}
                                onPress={() => setSelectedImageIndex(index)}
                                style={[
                                    styles.thumbnailCard,
                                    selected ? styles.thumbnailCardActive : undefined,
                                ]}
                            >
                                <Image source={{ uri: image }} style={styles.thumbnailImage} />
                            </Pressable>
                        );
                    })}
                </View>

                <View style={styles.detailsCard}>
                    <View style={styles.priceHeaderRow}>
                        <View style={styles.priceTitleBlock}>
                            <CustomText variant={CustomTextVariant.TITLE} style={styles.productTitle}>{product.name}</CustomText>
                            <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.productSubtitle}>Premium fit and all-day comfort</CustomText>
                        </View>
                        <View style={styles.priceBlock}>
                            {typeof product.strikeThroughPrice === "number" && (
                                <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.strikePrice}>${product.strikeThroughPrice.toFixed(2)}</CustomText>
                            )}
                            <CustomText variant={CustomTextVariant.TITLE} style={styles.price}>${product.price.toFixed(2)}</CustomText>
                        </View>
                    </View>

                    <View style={styles.socialQuantityRow}>
                        <View style={styles.avatarGroup}>
                            {BUYER_BADGES.map((badge, index) => (
                                <View
                                    key={`${badge}-${index}`}
                                    style={[
                                        styles.avatar,
                                        index > 0 ? styles.avatarOverlap : undefined,
                                        index % 2 === 0 ? styles.avatarWarm : styles.avatarCool,
                                    ]}
                                >
                                    <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.avatarText}>{badge}</CustomText>
                                </View>
                            ))}
                        </View>

                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.qtyButtonMuted} onPress={decreaseQuantity}>
                                <Ionicons name="remove" size={16} color={colors.textPrimary} />
                            </TouchableOpacity>
                            <CustomText variant={CustomTextVariant.TITLE} style={styles.quantityText}>{quantity}</CustomText>
                            <TouchableOpacity style={styles.qtyButtonPrimary} onPress={increaseQuantity}>
                                <Ionicons name="add" size={16} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <CustomText variant={CustomTextVariant.TITLE} style={styles.sectionTitle}>Description</CustomText>
                    <CustomText variant={CustomTextVariant.TEXT} style={styles.description}>{product.description}</CustomText>
                </View>
            </ScrollView>

            <View style={styles.floatingBottomSection}>
                <View style={styles.totalContainer}>
                    <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.totalLabel}>Total ({quantity} item{quantity > 1 ? "s" : ""})</CustomText>
                    <CustomText variant={CustomTextVariant.TITLE} style={styles.totalValue}>${totalPrice.toFixed(2)}</CustomText>
                </View>
                <View style={styles.bottomActionRow}>
                    <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
                        <Ionicons name="bag-handle-outline" size={24} color={colors.menuButton} />
                    </TouchableOpacity>
                    <CustomButton text="Buy Now" onPress={() => {}} type={ButtonType.PRIMARY} style={styles.buyButton} />
                </View>
            </View>
        </View>
    );
}

function createStyles(colors: ColorTheme, screenWidth: number) {
    const horizontalPadding = 16;
    const heroWidth = Math.max(screenWidth - horizontalPadding * 2, 0);

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        contentContainer: {
            paddingHorizontal: horizontalPadding,
            paddingBottom: 200,
        },
        headerActions: {
            flexDirection: "row",
            alignItems: "center",
        },
        headerIconButton: {
            marginLeft: 10,
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
        },
        heroImageContainer: {
            marginTop: 12,
            width: heroWidth,
            height: 300,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: colors.backgroundSecondary,
        },
        heroImage: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
        heroImagePlaceholder: {
            width: "100%",
            height: "100%",
            backgroundColor: colors.default,
        },
        thumbnailRow: {
            flexDirection: "row",
            marginTop: 14,
            gap: 10,
        },
        thumbnailCard: {
            width: 74,
            height: 74,
            borderRadius: 18,
            backgroundColor: colors.backgroundSecondary,
            padding: 4,
            borderWidth: 1,
            borderColor: "transparent",
        },
        thumbnailCardActive: {
            borderColor: colors.primary,
        },
        thumbnailImage: {
            width: "100%",
            height: "100%",
            borderRadius: 14,
            resizeMode: "cover",
        },
        detailsCard: {
            marginTop: 18,
            backgroundColor: colors.background,
            borderRadius: 28,
            padding: 18,
        },
        priceHeaderRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
        },
        priceTitleBlock: {
            flex: 1,
            marginRight: 12,
        },
        productTitle: {
            fontSize: 30,
            color: colors.textPrimary,
        },
        productSubtitle: {
            marginTop: 4,
            fontSize: 16,
            color: colors.textSecondary,
        },
        priceBlock: {
            alignItems: "flex-end",
        },
        strikePrice: {
            textDecorationLine: "line-through",
            color: colors.textLight,
            fontSize: 16,
        },
        price: {
            marginTop: 2,
            fontSize: 40,
            color: colors.textPrimary,
        },
        socialQuantityRow: {
            marginTop: 14,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        avatarGroup: {
            flexDirection: "row",
            alignItems: "center",
        },
        avatar: {
            width: 34,
            height: 34,
            borderRadius: 17,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: colors.white,
        },
        avatarOverlap: {
            marginLeft: -10,
        },
        avatarWarm: {
            backgroundColor: colors.secondary,
        },
        avatarCool: {
            backgroundColor: colors.primary,
        },
        avatarText: {
            fontSize: 12,
            color: colors.textPrimary,
        },
        quantityContainer: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        qtyButtonMuted: {
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.default,
        },
        qtyButtonPrimary: {
            width: 36,
            height: 36,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.secondary,
        },
        quantityText: {
            fontSize: 28,
            color: colors.textPrimary,
            minWidth: 28,
            textAlign: "center",
        },
        sectionTitle: {
            marginTop: 20,
            fontSize: 32,
            color: colors.textPrimary,
        },
        description: {
            marginTop: 6,
            fontSize: 17,
            lineHeight: 24,
            color: colors.textSecondary,
        },
        floatingBottomSection: {
            position: "absolute",
            left: 1,
            right: 1,
            bottom: 1,
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 22,
            paddingHorizontal: 14,
            paddingVertical: 20,
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.14,
            shadowRadius: 18,
            elevation: 8,
        },
        totalContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            paddingHorizontal: 2,
        },
        totalLabel: {
            fontSize: 15,
            color: colors.textSecondary,
        },
        totalValue: {
            fontSize: 24,
            color: colors.textPrimary,
        },
        bottomActionRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        },
        cartButton: {
            width: 54,
            height: 54,
            borderRadius: 27,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
        },
        buyButton: {
            flex: 1,
            height: 54,
            borderRadius: 27,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.secondary,
        },
        buyButtonText: {
            color: colors.white,
            fontSize: 20,
        },
    });
}