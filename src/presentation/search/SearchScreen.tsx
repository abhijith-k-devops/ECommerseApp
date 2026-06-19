import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../core/hooks/useTheme";
import { ColorTheme } from "../../core/theme/Colors";
import CustomText, { CustomTextVariant } from "../../core/components/CustomText";
import CustomTextInput from "../../core/components/CustomTextInput";
import { ProductContextProvider } from "../viewmodels/context/ProductContext";
import { useProduct } from "../viewmodels/hooks/useProduct";
import ProductListingItemComponent from "../home/components/ProductListItemComponent";
import { ProductModel } from "../../data/models/ProductModel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../core/types/AppNavigationType";

function SearchContent() {
    const { colors } = useTheme();
    const { products, loading, error } = useProduct();
    const styles = createStyles(colors);
    const [query, setQuery] = useState("");
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

    const filteredProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            return products;
        }

        return products.filter((product) => {
            const name = product.name.toLowerCase();
            const description = product.description.toLowerCase();
            return name.includes(normalizedQuery) || description.includes(normalizedQuery);
        });
    }, [products, query]);

    const handleProductPress = (product: ProductModel) => {
        navigation.getParent()?.navigate("ProductDetails", { product });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <View style={styles.container}>
                <CustomText variant={CustomTextVariant.TITLE} style={styles.title}>Search</CustomText>
                <CustomTextInput
                    placeholder="Search products"
                    iconName="search-outline"
                    value={query}
                    onChangeText={setQuery}
                    style={styles.searchInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                />

                {loading && (
                    <CustomText variant={CustomTextVariant.TEXT} style={styles.feedbackText}>
                        Loading products...
                    </CustomText>
                )}

                {!loading && error && (
                    <CustomText variant={CustomTextVariant.TEXT} style={styles.errorText}>
                        {error}
                    </CustomText>
                )}

                {!loading && !error && filteredProducts.length === 0 && (
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.feedbackText}>
                        No products found for "{query.trim()}"
                    </CustomText>
                )}

                {!loading && !error && filteredProducts.length > 0 && (
                    <FlatList
                        data={filteredProducts}
                        numColumns={2}
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        keyExtractor={(item) => item.id.toString()}
                        columnWrapperStyle={styles.columnWrapper}
                        renderItem={({ item }) => (
                            <ProductListingItemComponent
                                product={item}
                                onPress={handleProductPress}
                            />
                        )}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

export default function SearchScreen() {
    return (
        <ProductContextProvider>
            <SearchContent />
        </ProductContextProvider>
    );
}

function createStyles(colors: ColorTheme) {
    return StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: colors.background,
        },
        container: {
            flex: 1,
            backgroundColor: colors.background,
            padding: 16,
        },
        title: {
            fontSize: 24,
            color: colors.textPrimary,
            marginBottom: 12,
        },
        searchInput: {
            width: "100%",
            marginBottom: 12,
        },
        feedbackText: {
            fontSize: 14,
            color: colors.textSecondary,
            marginTop: 8,
        },
        errorText: {
            fontSize: 14,
            color: colors.error,
            marginTop: 8,
        },
        list: {
            width: "100%",
        },
        listContent: {
            paddingBottom: 16,
        },
        columnWrapper: {
            justifyContent: "flex-start",
            marginBottom: 12,
            gap: 12,
        },
    });
}
