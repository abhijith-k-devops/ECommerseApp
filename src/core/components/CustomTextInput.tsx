import React from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { ColorTheme } from "../theme/Colors";
import { useTheme } from "../hooks/useTheme";

interface CustomTextInputProps extends TextInputProps {
    iconName?: React.ComponentProps<typeof Ionicons>["name"];
}
function CustomTextInput({ iconName = "search-outline", style, ...textInputProps }: CustomTextInputProps) {
    const {colors} = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.iconContainer}>
                <Ionicons name={iconName} size={20} color={colors.textPrimary} />
            </View>
            <TextInput
                placeholderTextColor={colors.textSecondary}
                style={styles.input}
                {...textInputProps}
            />
        </View>
    );
}

function createStyles(colors: ColorTheme) {
    return StyleSheet.create({
        container: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 28,
            minHeight: 56,
            paddingHorizontal: 8,
            paddingVertical: 6,
            flexDirection: "row",
            alignItems: "center",
        },
        iconContainer: {
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: colors.searchIconBackground,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: colors.textPrimary,
            paddingVertical: 0,
        }
    });
}

export default CustomTextInput;