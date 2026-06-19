import React from "react";
import { Platform, StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { typography } from "../theme/typography";
import { ColorTheme } from "../theme/Colors";

export enum CustomTextVariant {
    TITLE = "title",
    SUBTITLE = "subtitle",
    TEXT = "text",
    SUBTEXT = "subtext",
}

interface CustomTextProps extends TextProps {
    style?: StyleProp<TextStyle>;
    variant?: CustomTextVariant;
}

export default function CustomText({
    style,
    children,
    variant = CustomTextVariant.TEXT,
    allowFontScaling,
    ...rest
}: CustomTextProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const resolvedStyle = resolveTextStyle([styles.base, styles[variant], style]);



    return (
        <Text
            allowFontScaling={allowFontScaling ?? false}
            style={resolvedStyle}
            {...rest}
        >
            {children}
        </Text>
    );
}

function resolveTextStyle(style: StyleProp<TextStyle>): TextStyle {
    const flattened = (StyleSheet.flatten(style) ?? {}) as TextStyle;
    const baseSize = typeof flattened.fontSize === "number" ? flattened.fontSize : 16;
    const iosScale = 0.9;
    const fontSize = Platform.OS === "ios" ? Math.round(baseSize * iosScale) : baseSize;
    const lineHeight =
        typeof flattened.lineHeight === "number"
            ? Platform.OS === "ios"
                ? Math.round(flattened.lineHeight * iosScale)
                : flattened.lineHeight
            : undefined;

    return {
        ...flattened,
        fontSize,
        lineHeight,
        paddingVertical: 0,
        includeFontPadding: false,
    };
}

function createStyles(colors: ColorTheme) {
    return StyleSheet.create({
        base: {
            color: colors.textPrimary,
            fontFamily: typography.primary,
        },
        [CustomTextVariant.TITLE]: {
            fontSize: 24,
            fontFamily: typography.bold,
            color: colors.textPrimary,
        },
        [CustomTextVariant.SUBTITLE]: {
            fontSize: 18,
            fontFamily: typography.semiBold,
            color: colors.textPrimary,
        },
        [CustomTextVariant.TEXT]: {
            fontSize: 16,
            fontFamily: typography.primary,
            color: colors.textPrimary,
        },
        [CustomTextVariant.SUBTEXT]: {
            fontSize: 14,
            fontFamily: typography.light,
            color: colors.textSecondary,
        },
    });
}