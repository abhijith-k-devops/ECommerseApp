
import { StyleSheet, View, FlatList } from "react-native";
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

    return (
        <View style={styles.container}>
            <HeaderComponent />
            <OfferBannerComponent />
            <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.title}>Product Listing</CustomText>
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
            marginBottom: 12,
            marginTop: 16,
        },
        text: {
            fontSize: 16,
            color: colors.text,
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