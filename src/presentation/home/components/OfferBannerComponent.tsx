import { Image, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../core/hooks/useTheme";
import CustomButton, { ButtonType } from "../../../core/components/CustomButton";
import CustomText, { CustomTextVariant } from "../../../core/components/CustomText";

export default function OfferBannerComponent() {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const offerImage = require("../../../../assets/images/sony-headset.png");

    return (
        <View style={styles.container}>

            <View style={styles.offerDetailsContainer}>                
                <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.text}>Special Offer</CustomText>
                <View style={styles.percentageTextContainer}>
                    <CustomText variant={CustomTextVariant.TITLE} style={styles.title}>Up to </CustomText>
                    <CustomText variant={CustomTextVariant.TITLE} style={styles.percentageText}>50% Off</CustomText>
                </View>
                <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.subtext}>On selected headphones and accessories</CustomText>
                <CustomButton 
                    text="Shop Now" 
                    type={ButtonType.PRIMARY} 
                    style={styles.buttonStyle} 
                    textStyle={styles.buttonTextStyle} 
                    onPress={()=>{}}/>
                
            </View>

            <View style={styles.imageContainer}>
                <Image source={offerImage} style={styles.image}/>
            </View>
            
        </View>
    );

}

function createStyles(colors: any) {
    return StyleSheet.create({
        container: {
            height: Platform.OS === "ios" ? 160 : 180,
            width: "100%",
            flexDirection: "row",
            borderRadius: 16,
            backgroundColor: colors.offer1Background,
            overflow: "hidden",
        },
        offerTypeContainer: {
            marginHorizontal: 16,
            marginTop: 16,
        },
        offerDetailsContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 12,
        },
        imageContainer: {
             width: "45%",             // right panel width
            height: "100%",
            justifyContent: "center",
            alignItems: "flex-end",
        },
        image: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",      // zoom + fill
            borderTopLeftRadius: 80,  // optional curved left edge
            borderBottomLeftRadius: 80,
        },
        title: {
            color: colors.text,
        },
        text: {
            fontSize: 14,
            color: colors.textSecondary,
            paddingHorizontal: 16,
            marginTop: 8,
            marginBottom: 4,
        },
        subtext: {
            fontSize: 10,
            color: colors.textLight,
            paddingHorizontal: 16,
            marginTop: 4,
        },
        percentageText: {
            color: colors.primary,
            marginLeft: 4,
        },
        percentageTextContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingHorizontal: 16,
        },
        buttonTextStyle: {
            fontSize: 12,
            color: colors.white,
        },
        buttonStyle: {
            marginTop: 8,
            paddingHorizontal: 8,
            marginHorizontal: 16,
            width: 100,
        },
    });
}