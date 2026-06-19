import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useTheme } from "../hooks/useTheme";
import { ColorTheme } from "../theme/Colors";
import CustomText, { CustomTextVariant } from "./CustomText";

interface BottomNavigationProps {
    state: any;
    descriptors: any;
    navigation: any;
}

interface TabConfig {
    name: string;
    icon: React.ComponentProps<typeof Ionicons>["name"];
    label: string;
}

export default function CustomBottomNavigation({
    state,
    descriptors,
    navigation,
}: BottomNavigationProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const tabConfig: TabConfig[] = [
        { name: "Home", icon: "home-outline", label: "Home" },
        { name: "Search", icon: "search-outline", label: "Search" },
        { name: "Favorites", icon: "heart-outline", label: "Favorites" },
        { name: "Profile", icon: "person-outline", label: "Profile" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;
                    const config =
                        tabConfig.find((tab) => tab.name === route.name) ??
                        {
                            name: route.name,
                            icon: "ellipse-outline" as React.ComponentProps<typeof Ionicons>["name"],
                            label: descriptors[route.key]?.options?.title ?? route.name,
                        };

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            preventDefault: () => {},
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={[
                                styles.tab,
                                isFocused ? styles.tabActive : styles.tabInactive,
                            ]}
                            activeOpacity={0.8}
                        >
                            <Ionicons
                                name={config.icon}
                                size={20}
                                color={
                                    isFocused
                                        ? colors.bottomNavActiveLabel
                                        : colors.bottomNavInactiveLabel
                                }
                            />
                            {isFocused && (
                                <CustomText
                                    variant={CustomTextVariant.SUBTEXT}
                                    style={[
                                        isFocused ? styles.labelActive : styles.labelInactive,
                                    ]}
                                >
                                    {config.label}
                                </CustomText>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

function createStyles(colors: ColorTheme) {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            paddingBottom: 16,
            paddingHorizontal: 8,
        },
        navBar: {
            flexDirection: "row",
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 32,
            paddingHorizontal: 8,
            paddingVertical: 8,
            marginHorizontal: 16,
            height: 64,
            alignItems: "center",
            justifyContent: "space-around",
        },
        tab: {
            flex: 1,
            height: 48,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 24,
            flexDirection: "row",
            gap: 6,
        },
        tabActive: {
            backgroundColor: colors.bottomNavigationActiveTint,
        },
        tabInactive: {
            backgroundColor: "transparent",
        },
        labelActive: {
            fontSize: 12,
            color: colors.bottomNavActiveLabel,
        },
        labelInactive: {
            fontSize: 12,
            color: colors.bottomNavInactiveLabel,
        },
    });
}
