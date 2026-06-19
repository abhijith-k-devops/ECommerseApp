import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../hooks/useTheme";
import CustomText, { CustomTextVariant } from "./CustomText";

export enum ButtonType {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    OUTLINE = "outline",
}

interface CustomButtonProps {
    text: string;
    onPress: () => void;
    type?: ButtonType;
    style?: any;
    textStyle?: any;
}


export default function CustomButton({ text, onPress, type = ButtonType.PRIMARY, style, textStyle }: CustomButtonProps) {
    const { colors } = useTheme();
    const themedStyles = styles(colors, type);

    return (
        <TouchableOpacity onPress={onPress} style={[themedStyles.button, style]}>
            <CustomText variant={CustomTextVariant.SUBTITLE} style={[themedStyles.buttonText, textStyle]}>{text}</CustomText>
        </TouchableOpacity>
    );
}

function styles(colors: any, type: ButtonType) {
    return StyleSheet.create({
        button: {
            backgroundColor: type === ButtonType.PRIMARY ? colors.primary : type === ButtonType.SECONDARY ? colors.secondary : "transparent",
            paddingVertical: 12,
            paddingHorizontal: 45,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: type === ButtonType.OUTLINE ? 1.5 : 0,
            borderColor: type === ButtonType.OUTLINE ? colors.primary : "transparent",
        },
        buttonText: {
            color: type === ButtonType.OUTLINE ? colors.primary : colors.white,
        },
    });
}