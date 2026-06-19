
import React, { useMemo, useState } from "react";
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, useWindowDimensions } from "react-native";
import { useTheme } from "../../../core/hooks/useTheme";
import { ColorTheme } from "../../../core/theme/Colors";

const CAROUSEL_SIDE_PADDING = 8;

interface ProductImageCarouselProps {
    images: string[];
}

function ProductImageCarousel({ images }: ProductImageCarouselProps) {
    const { colors } = useTheme();
    const { width: screenWidth } = useWindowDimensions();
    const styles = useMemo(() => createStyles(colors, screenWidth), [colors, screenWidth]);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselImages = images.filter(Boolean);

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!carouselImages.length) {
            return;
        }

        const offsetX = event.nativeEvent.contentOffset.x;
        const nextIndex = Math.round(offsetX / screenWidth);
        setActiveIndex(nextIndex);
    };

    if (!carouselImages.length) {
        return (
            <View style={styles.slide}>
                <View style={styles.imagePlaceholder} />
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={carouselImages}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `${item}-${index}`}
                onMomentumScrollEnd={handleScrollEnd}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={{ uri: item }} style={styles.image} />
                    </View>
                )}
            />

            <View style={styles.dotContainer}>
                {carouselImages.map((image, index) => (
                    <View
                        key={`${image}-dot-${index}`}
                        style={[
                            styles.dot,
                            index === activeIndex ? styles.activeDot : undefined,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

function createStyles(colors: ColorTheme, screenWidth: number) {
    return StyleSheet.create({
        slide: {
            width: screenWidth,
            paddingHorizontal: CAROUSEL_SIDE_PADDING,
            paddingVertical: CAROUSEL_SIDE_PADDING,
        },
        image: {
            height: 280,
            borderRadius: 16,
            resizeMode: "cover",
            width: "100%",
        },
        imagePlaceholder: {
            height: 280,
            borderRadius: 16,
            backgroundColor: colors.default,
            width: "100%",
        },
        dotContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
        },
        dot: {
            width: 8,
            height: 8,
            borderRadius: 999,
            backgroundColor: colors.textLight,
            opacity: 0.4,
        },
        activeDot: {
            width: 24,
            backgroundColor: colors.primary,
            opacity: 1,
        },
    });
}

export default ProductImageCarousel;