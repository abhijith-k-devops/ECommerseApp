import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../viewmodels/hooks/useCart';
import { ColorTheme } from '../../core/theme/Colors';
import { useTheme } from '../../core/hooks/useTheme';
import CustomText, {
  CustomTextVariant,
} from '../../core/components/CustomText';
import { CartModel } from '../../data/models/CartModel';
import CartItemCard from './components/CartItemCard';
import CustomButton, { ButtonType } from '../../core/components/CustomButton';

function CartScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { cartItems, removeFromCart, updateQuantity, isLoading } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleDecrease = (item: CartModel) => {
    const next = Math.max(1, item.quantity - 1);
    updateQuantity(item.id, next);
  };

  const handleIncrease = (item: CartModel) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountRate = useMemo(() => {
    if (appliedPromo === 'SAVE10') return 0.1;
    if (appliedPromo === 'SAVE20') return 0.2;
    return 0;
  }, [appliedPromo]);

  const discountAmount = useMemo(() => subtotal * discountRate, [subtotal, discountRate]);
  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (subtotal >= 300 || appliedPromo === 'FREESHIP') return 0;
    return 12;
  }, [subtotal, appliedPromo]);
  const total = useMemo(() => subtotal - discountAmount + deliveryFee, [subtotal, discountAmount, deliveryFee]);

  const handleApplyPromo = () => {
    const normalizedCode = promoCode.trim().toUpperCase();
    if (!normalizedCode) {
      setPromoError('Please enter a promo code');
      setAppliedPromo('');
      return;
    }

    const validCodes = ['SAVE10', 'SAVE20', 'FREESHIP'];
    if (!validCodes.includes(normalizedCode)) {
      setPromoError('Invalid code. Try SAVE10, SAVE20 or FREESHIP');
      setAppliedPromo('');
      return;
    }

    setAppliedPromo(normalizedCode);
    setPromoError('');
  };

  return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
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
            ListFooterComponent={
              <View style={styles.footerSection}>
                <View style={styles.promoCard}>
                  <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.sectionTitle}>
                    Promo code
                  </CustomText>
                  <View style={styles.promoInputRow}>
                    <TextInput
                      value={promoCode}
                      onChangeText={(text) => {
                        setPromoCode(text);
                        if (promoError) setPromoError('');
                      }}
                      placeholder="Enter code"
                      placeholderTextColor={colors.textLight}
                      autoCapitalize="characters"
                      style={styles.promoInput}
                    />
                    <TouchableOpacity style={styles.applyButton} onPress={handleApplyPromo}>
                      <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.applyButtonText}>
                        Apply
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                  {!!promoError && (
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.promoErrorText}>
                      {promoError}
                    </CustomText>
                  )}
                  {!!appliedPromo && !promoError && (
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.promoSuccessText}>
                      {appliedPromo} applied successfully
                    </CustomText>
                  )}
                </View>

                <View style={styles.summaryCard}>
                  <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.sectionTitle}>
                    Price summary
                  </CustomText>
                  <View style={styles.summaryRow}>
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.summaryLabel}>Subtotal</CustomText>
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.summaryValue}>${subtotal.toFixed(2)}</CustomText>
                  </View>
                  <View style={styles.summaryRow}>
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.summaryLabel}>Discount</CustomText>
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.discountValue}>-${discountAmount.toFixed(2)}</CustomText>
                  </View>
                  <View style={styles.summaryRow}>
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.summaryLabel}>Delivery</CustomText>
                    <CustomText variant={CustomTextVariant.SUBTEXT} style={styles.summaryValue}>
                      {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                    </CustomText>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.summaryRow}>
                    <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.totalLabel}>Total</CustomText>
                    <CustomText variant={CustomTextVariant.SUBTITLE} style={styles.totalValue}>${total.toFixed(2)}</CustomText>
                  </View>
                </View>

                <CustomButton
                  text="Proceed to Checkout"
                  type={ButtonType.SECONDARY}
                  onPress={() => {}}
                  style={styles.checkoutButton}
                  textStyle={styles.checkoutButtonText}
                />
              </View>
            }
            scrollEnabled={true}
          />
        )}
      </View>
      </SafeAreaView>
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
    footerSection: {
      marginTop: 12,
      gap: 12,
      paddingBottom: 8,
    },
    promoCard: {
      borderRadius: 16,
      backgroundColor: colors.backgroundSecondary,
      padding: 14,
    },
    sectionTitle: {
      fontSize: 16,
      marginBottom: 10,
      color: colors.textPrimary,
    },
    promoInputRow: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    promoInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.default,
      borderRadius: 12,
      backgroundColor: colors.background,
      color: colors.textPrimary,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
    },
    applyButton: {
      borderRadius: 12,
      backgroundColor: colors.primary,
      paddingHorizontal: 14,
      paddingVertical: 11,
      alignItems: 'center',
      justifyContent: 'center',
    },
    applyButtonText: {
      color: colors.white,
      fontSize: 13,
    },
    promoErrorText: {
      color: colors.error,
      marginTop: 8,
      fontSize: 12,
    },
    promoSuccessText: {
      color: colors.success,
      marginTop: 8,
      fontSize: 12,
    },
    summaryCard: {
      borderRadius: 16,
      backgroundColor: colors.backgroundSecondary,
      padding: 14,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 6,
    },
    summaryLabel: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    summaryValue: {
      color: colors.textPrimary,
      fontSize: 14,
    },
    discountValue: {
      color: colors.success,
      fontSize: 14,
    },
    divider: {
      height: 1,
      backgroundColor: colors.default,
      marginTop: 10,
      marginBottom: 4,
    },
    totalLabel: {
      color: colors.textPrimary,
      fontSize: 16,
    },
    totalValue: {
      color: colors.textPrimary,
      fontSize: 18,
    },
    checkoutButton: {
      height: 54,
      borderRadius: 27,
      backgroundColor: colors.secondary,
    },
    checkoutButtonText: {
      color: colors.white,
      fontSize: 16,
    },
  });
}

export default CartScreen;
