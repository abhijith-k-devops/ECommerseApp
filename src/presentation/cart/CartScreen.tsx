import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../viewmodels/hooks/useCart';
import { ColorTheme } from '../../core/theme/Colors';
import { useTheme } from '../../core/hooks/useTheme';
import CustomText, {
  CustomTextVariant,
} from '../../core/components/CustomText';
import { CartModel } from '../../data/models/CartModel';
import CartItemCard from './components/CartItemCard';

function CartScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { cartItems, removeFromCart, updateQuantity, isLoading } = useCart();

  const handleDecrease = (item: CartModel) => {
    const next = Math.max(1, item.quantity - 1);
    updateQuantity(item.id, next);
  };

  const handleIncrease = (item: CartModel) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
      <View style={styles.container}>
        {isLoading && (
          <CustomText
            variant={CustomTextVariant.TEXT}
            style={styles.loadingText}
          >
            Loading...
          </CustomText>
        )}
        {!isLoading && cartItems.length === 0 && (
          <CustomText
            variant={CustomTextVariant.SUBTEXT}
            style={styles.emptyText}
          >
            No items in the cart
          </CustomText>
        )}
        {!isLoading && cartItems.length > 0 && (
          <FlatList
            data={cartItems}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItemCard
                item={item}
                onRemove={removeFromCart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            scrollEnabled={true}
          />
        )}
      </View>
  );
}

function createStyles(colors: ColorTheme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      width: '100%',
      padding: 16,
      backgroundColor: colors.background,
    },
    list: {
      width: '100%',
    },
    listContent: {
      paddingBottom: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'left',
    },
    loadingText: {
      fontSize: 16,
      color: colors.textPrimary,
      textAlign: 'center',
      marginTop: 20,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 20,
    },
    itemSeparator: {
      height: 12,
    },
  });
}

export default CartScreen;
