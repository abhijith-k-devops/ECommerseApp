import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import CustomText, {
	CustomTextVariant,
} from '../../../core/components/CustomText';
import { useTheme } from '../../../core/hooks/useTheme';
import { ColorTheme } from '../../../core/theme/Colors';
import { CartModel } from '../../../data/models/CartModel';

interface CartItemCardProps {
	item: CartModel;
	onRemove: (id: string | number) => void;
	onIncrease: (item: CartModel) => void;
	onDecrease: (item: CartModel) => void;
}

function CartItemCard({ item, onRemove, onIncrease, onDecrease }: CartItemCardProps) {
	const { colors } = useTheme();
	const styles = createStyles(colors);

	return (
		<View style={styles.card}>
			{item.images?.[0] ? (
				<Image
					source={{ uri: item.images[0] }}
					style={styles.productImage}
					resizeMode="cover"
				/>
			) : (
				<View style={styles.imagePlaceholder}>
					<Ionicons name="image-outline" size={28} color={colors.textLight} />
				</View>
			)}

			<View style={styles.content}>
				<TouchableOpacity
					style={styles.removeButton}
					onPress={() => onRemove(item.id)}
					hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
				>
					<Ionicons name="close" size={24} color={colors.textLight} />
				</TouchableOpacity>

				<CustomText variant={CustomTextVariant.SUBTITLE} style={styles.title}>
					{item.name}
				</CustomText>

				<CustomText variant={CustomTextVariant.SUBTEXT} style={styles.subtitle}>
					{item.description}
				</CustomText>

				<View style={styles.footer}>
					<CustomText variant={CustomTextVariant.TITLE} style={styles.price}>
						${item.price.toFixed(2)}
					</CustomText>

					<View style={styles.quantityWrap}>
						<TouchableOpacity
							style={styles.minusButton}
							onPress={() => onDecrease(item)}
							activeOpacity={0.85}
						>
							<Ionicons name="remove" size={18} color={colors.black} />
						</TouchableOpacity>

						<CustomText variant={CustomTextVariant.SUBTITLE} style={styles.quantity}>
							{item.quantity}
						</CustomText>

						<TouchableOpacity
							style={styles.plusButton}
							onPress={() => onIncrease(item)}
							activeOpacity={0.85}
						>
							<Ionicons name="add" size={18} color={colors.white} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

function createStyles(colors: ColorTheme) {
	return StyleSheet.create({
		card: {
			backgroundColor: colors.backgroundSecondary,
			borderRadius: 16,
			padding: 6,
			flexDirection: 'row',
			alignItems: 'center',
		},
		productImage: {
			width: 110,
			height: 110,
			borderRadius: 14,
			backgroundColor: colors.white,
		},
		imagePlaceholder: {
			width: 110,
			height: 110,
			borderRadius: 14,
			backgroundColor: colors.white,
			alignItems: 'center',
			justifyContent: 'center',
		},
		content: {
			flex: 1,
			marginLeft: 12,
			justifyContent: 'space-between',
			paddingVertical: 4,
		},
		removeButton: {
			position: 'absolute',
			right: 2,
			top: 2,
			zIndex: 2,
		},
		title: {
			fontSize: 16,
			color: colors.textPrimary,
			paddingRight: 30,
		},
		subtitle: {
			marginTop: 2,
			fontSize: 12,
			color: colors.textLight,
		},
		footer: {
			marginTop: 6,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 8,
		},
		price: {
			fontSize: 18,
			lineHeight: 28,
			color: colors.textPrimary,
		},
		quantityWrap: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 10,
			backgroundColor: colors.background,
			borderRadius: 20,
			paddingHorizontal: 6,
			paddingVertical: 4,
		},
		minusButton: {
			width: 24,
			height: 24,
			borderRadius: 12,
			backgroundColor: colors.white,
			borderWidth: 1,
			borderColor: colors.default,
			alignItems: 'center',
			justifyContent: 'center',
		},
		plusButton: {
			width: 24,
			height: 24,
			borderRadius: 12,
			backgroundColor: colors.secondary,
			alignItems: 'center',
			justifyContent: 'center',
		},
		quantity: {
			minWidth: 22,
			textAlign: 'center',
			fontSize: 16,
			color: colors.textPrimary,
		},
	});
}

export default CartItemCard;
