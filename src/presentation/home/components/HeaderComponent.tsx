import React, { useCallback } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme } from "../../../core/hooks/useTheme";
import CustomTextInput from "../../../core/components/CustomTextInput";
import CustomText, { CustomTextVariant } from "../../../core/components/CustomText";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { useCart } from "../../viewmodels/hooks/useCart";

export default function HeaderComponent() {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { cartItems } = useCart();

    const handleCartPress = useCallback(() => {
        navigation.getParent()?.navigate("Cart");
    }, [navigation]);

    const handleSearchFocus = () => {
        navigation.getParent()?.navigate("Search");
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.profileWrap}>
                    <Image
                        source={{ uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" }}
                        style={styles.avatar}
                    />
                    <View>
                        <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.title}>Abhijith Ashok</CustomText>
                        <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.userGreeting}>Hi Welcome 👋</CustomText>
                    </View>
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity onPress={handleCartPress}>
                        <View style={styles.notificationIconContainer}>
                            <Ionicons name="cart-outline" size={22} color={colors.textPrimary} />
                            {cartItems.length > 0 && <View style={styles.notificationDot} />}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchRow}>
                <CustomTextInput
                    style={styles.searchInput}
                    placeholder="Search here..."
                    iconName="search-outline"
                    showSoftInputOnFocus={false}
                    caretHidden
                    onFocus={handleSearchFocus}
                />
            </View>
        </View>
    );
}

function createStyles(colors: any) {
    return StyleSheet.create({
        container: {
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: 8,
            paddingBottom: 14,
            backgroundColor: colors.background,
        },
        topRow: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
        },
        profileWrap: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        avatar: {
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: colors.default,
        },
        actionRow: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        notificationIconContainer: {
            borderRadius: 25,
            width: 45,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.backgroundSecondary,
        },
        notificationDot: {
            position: "absolute",
            top: 12,
            right: 13,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.error,
        },
        title: {
            color: colors.textPrimary,
            fontSize: 18,
        },
        welcomeText: {
            color: colors.textSecondary,
        },
        userContainer: {
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-start",
        },
        searchRow: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        logo: {
            width: 120,
            height: 40,
            resizeMode: "contain",
        },
        searchInput: {
            flex: 1,
            minHeight: 54,
        },
        filterButton: {
            width: 54,
            height: 54,
            borderRadius: 27,
            backgroundColor: colors.backgroundSecondary,
            alignItems: "center",
            justifyContent: "center",
        },
        userGreeting: {
            fontSize: 14,
            color: colors.textSecondary,
        },
    });
}