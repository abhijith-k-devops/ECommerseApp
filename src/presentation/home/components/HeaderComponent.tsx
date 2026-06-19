import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme } from "../../../core/hooks/useTheme";
import CustomTextInput from "../../../core/components/CustomTextInput";
import CustomText, { CustomTextVariant } from "../../../core/components/CustomText";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";

export default function HeaderComponent() {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const handleSearchFocus = () => {
        navigation.getParent()?.navigate("Search");
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer} >
                <View>
                    <View style={styles.userContainer}>
                        <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.welcomeText}>Welcome Back,</CustomText>
                        <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.title}> Abhijith</CustomText>
                    </View>
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.userGreeting}>Here's what's new today.</CustomText>
                </View>
                
                <TouchableOpacity>
                    <View style={styles.notificationIconContainer}>
                        <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.logoContainer}>
                
                
            </View>
            <CustomTextInput
                style={styles.searchInput}
                placeholder="Search"
                iconName="search-outline"
                showSoftInputOnFocus={false}
                caretHidden
                onFocus={handleSearchFocus}
            />
        </View>
    );
}

function createStyles(colors: any) {
    return StyleSheet.create({
        container: {
            flexDirection: "column",
            alignItems: "flex-start",
            paddingVertical: 16,
            backgroundColor: colors.background,
        },
        notificationIconContainer: {
            borderRadius: 25,
            width: 45,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.backgroundSecondary,
        },
        title: {
            color: colors.textPrimary,
        },
        welcomeText: {
            color: colors.textSecondary,
        },
        userContainer: {
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-start",
        },
        logoContainer: {   
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            marginTop: 16,
            width: "100%",
        },
        logo: {
            width: 120,
            height: 40,
            resizeMode: "contain",
        },
        searchInput: {
            width: "100%",
            marginTop: 8,
        },
        userGreeting: {
            fontSize: 12,
            color: colors.textSecondary,
        },
    });
}