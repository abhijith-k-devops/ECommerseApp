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
                <CustomText variant={CustomTextVariant.TITLE} style={styles.title}>New Offer</CustomText>
                <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.subtext}>Discount 50% For The First</CustomText>
                <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.subtext}>Order Transaction</CustomText>
                <CustomButton 
                    text="Buy now" 
                    type={ButtonType.OUTLINE} 
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
            height: Platform.OS === "ios" ? 150 : 160,
            width: "100%",
            flexDirection: "row",
            borderRadius: 18,
            backgroundColor: colors.offer1Background,
            overflow: "hidden",
        },
        offerTypeContainer: {
            marginHorizontal: 16,
            marginTop: 16,
        },
        offerDetailsContainer: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingLeft: 18,
            paddingTop: 14,
        },
        imageContainer: {
            width: "44%",
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "flex-end",
        },
        image: {
            width: "100%",
            height: "100%",
            resizeMode: "cover",
        },
        title: {
            color: colors.white,
            fontSize: 24,
            lineHeight: 30,
            marginBottom: 2,
        },
        subtext: {
            fontSize: 12,
            color: colors.white,
            opacity: 0.95,
            lineHeight: 18,
        },
        buttonTextStyle: {
            fontSize: 14,
            color: colors.secondary,
        },
        buttonStyle: {
            marginTop: 14,
            borderColor: colors.white,
            backgroundColor: colors.white,
        },
    });
}