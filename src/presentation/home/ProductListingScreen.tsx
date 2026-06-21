
import { StyleSheet, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useProduct } from "../viewmodels/hooks/useProduct";
import { ProductContextProvider } from "../viewmodels/context/ProductContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductListingItemComponent from "./components/ProductListItemComponent";
import HeaderComponent from "./components/HeaderComponent";
import { useTheme } from "../../core/hooks/useTheme";
import OfferBannerComponent from "./components/OfferBannerComponent";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../core/types/AppNavigationType";
import { useCallback } from "react";
import { ProductModel } from "../../data/models/ProductModel";
import CustomText, { CustomTextVariant } from "../../core/components/CustomText";

function ProductListingContent() {
    const { products, loading, error } = useProduct();
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const handleProductPress = useCallback((product: ProductModel) => {
        navigation.getParent()?.navigate("ProductDetails", { product });
    }, [navigation]);

    const categories = [
        { name: "All", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80" },
        { name: "Men", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
        { name: "Women", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80" },
    ];

    return (
        <View style={styles.container}>
            <HeaderComponent />
            <OfferBannerComponent />
            <View style={styles.sectionHeaderRow}>
                <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.title}>Categories</CustomText>
                <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.linkText}>See All</CustomText>
            </View>
            <View style={styles.categoriesRow}>
                {categories.map((category, index) => {
                    const selected = index === 0;
                    return (
                        <TouchableOpacity
                            key={category.name}
                            style={selected ? styles.categoryPillActive : styles.categoryPill}
                            activeOpacity={0.85}
                        >
                            <Image source={{ uri: category.image }} style={styles.categoryAvatar} />
                            <CustomText variant={CustomTextVariant.SUBTITLE} style={selected ? styles.categoryTextActive : styles.categoryText}>
                                {category.name}
                            </CustomText>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.sectionHeaderRow}>
                <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.title}>Recomended</CustomText>
                <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.linkText}>See All</CustomText>
            </View>
            {loading && <CustomText variant={CustomTextVariant.TEXT} style={styles.text}>Loading...</CustomText>}
            {!loading && error && <CustomText variant={CustomTextVariant.TEXT} style={styles.error}>{error}</CustomText>}
            {!loading && !error && (
                <FlatList 
                    data={products}
                    numColumns={2}
                    style={styles.list}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={styles.columnWrapper}
                    renderItem={({ item }) => (
                        <ProductListingItemComponent product={item} 
                            onPress={ handleProductPress }
                        />)}
                ></FlatList>
            )}
        </View>
    );
}

export default function ProductListingScreen() {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <ProductContextProvider>
                <ProductListingContent />
            </ProductContextProvider>
        </SafeAreaView>
    );
}

function createStyles(colors: any){
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: colors.background,
        },
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: colors.background,
        },
        title: {
            fontSize: 18,
            color: colors.textPrimary,
            marginBottom: 8,
            marginTop: 16,
        },
        sectionHeaderRow: {
            marginTop: 8,
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        linkText: {
            fontSize: 15,
            color: colors.textPrimary,
        },
        categoriesRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 8,
        },
        categoryPill: {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 22,
            backgroundColor: colors.backgroundSecondary,
            paddingHorizontal: 8,
            paddingVertical: 8,
            gap: 8,
        },
        categoryPillActive: {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 22,
            backgroundColor: colors.secondary,
            paddingHorizontal: 8,
            paddingVertical: 8,
            gap: 8,
        },
        categoryAvatar: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: colors.default,
        },
        categoryText: {
            color: colors.textPrimary,
            fontSize: 14,
            marginRight: 8,
        },
        categoryTextActive: {
            color: colors.white,
            fontSize: 14,
            marginRight: 8,
        },
        text: {
            fontSize: 16,
            color: colors.textPrimary,
        },
        error: {
            fontSize: 16,
            color: colors.error,
        },
        list: {
            width: '100%',
        },
        listContent: {
            paddingBottom: 16,
        },
        columnWrapper: {
            justifyContent: 'flex-start',
            marginBottom: 12,
            gap: 12,
        },
    });
}