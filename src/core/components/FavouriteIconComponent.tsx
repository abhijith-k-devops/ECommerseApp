import Ionicons from "@react-native-vector-icons/ionicons";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

export enum FavouriteIconType {
    DETAIL = "detail",
    LIST_ITEM = "list_item",
}

interface FavouriteIconComponentProps {
    isFavourite: boolean;
    onToggle: () => void;
    type?: FavouriteIconType;
}
export default function FavouriteIconComponent({ isFavourite, onToggle, type = FavouriteIconType.LIST_ITEM }
    : FavouriteIconComponentProps) {
        const { colors } = useTheme();

        const themedStyles = createStyles(colors, type);
        
        return (
            <View style={themedStyles.iconContainer}>
                <TouchableOpacity onPress={onToggle}>
                    
                        <Ionicons
                            name={isFavourite ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavourite ? colors.error : (type === FavouriteIconType.DETAIL ? colors.menuButton : colors.favIconInactive)}
                        />
                
                </TouchableOpacity>
            </View>
        );
}

function createStyles(colors: any, type: FavouriteIconType) {
    return {
        icon: {
            color: colors.error,
        },
        iconContainer: {
            padding: 8,
            borderRadius: 20,
            backgroundColor: type === FavouriteIconType.DETAIL ? colors.background : colors.white,
        },
    };
}