import { useCart } from '@/contexts/cart-context';
import * as AC from '@bacons/apple-colors';
import * as Haptics from 'expo-haptics';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function CartRoute() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  const handleCheckout = () => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    alert('Order placed! 🍣');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: AC.systemGroupedBackground,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 80, marginBottom: 16 }}>🍱</Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: AC.label,
            marginBottom: 8,
          }}
        >
          Your cart is empty
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: AC.secondaryLabel,
            textAlign: 'center',
          }}
        >
          Add some delicious sushi to get started
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: AC.systemGroupedBackground }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
      >
        <View style={{ padding: 16, gap: 16 }}>
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: AC.label,
              }}
            >
              Your Cart
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: AC.secondaryLabel,
              }}
            >
              {items.reduce((sum, item) => sum + item.quantity, 0)} items
            </Text>
          </View>

          {items.map((cartItem) => (
            <View
              key={cartItem.sushiItem.id}
              style={{
                backgroundColor: AC.systemBackground,
                borderRadius: 16,
                borderCurve: 'continuous',
                padding: 16,
                gap: 12,
              }}
            >
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <Text style={{ fontSize: 48 }}>{cartItem.sushiItem.image}</Text>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: AC.label,
                    }}
                  >
                    {cartItem.sushiItem.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: AC.systemBlue,
                    }}
                  >
                    ${cartItem.sushiItem.price.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 8,
                  borderTopWidth: 1,
                  borderTopColor: AC.separator,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      updateQuantity(
                        cartItem.sushiItem.id,
                        cartItem.quantity - 1
                      );
                      if (process.env.EXPO_OS === 'ios') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                    }}
                    style={({ pressed }) => ({
                      backgroundColor: AC.systemBlue,
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <Text
                      style={{ fontSize: 18, color: 'white', fontWeight: '600' }}
                    >
                      −
                    </Text>
                  </Pressable>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      color: AC.label,
                      minWidth: 30,
                      textAlign: 'center',
                      fontVariant: ['tabular-nums'],
                    }}
                  >
                    {cartItem.quantity}
                  </Text>

                  <Pressable
                    onPress={() => {
                      updateQuantity(
                        cartItem.sushiItem.id,
                        cartItem.quantity + 1
                      );
                      if (process.env.EXPO_OS === 'ios') {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }
                    }}
                    style={({ pressed }) => ({
                      backgroundColor: AC.systemBlue,
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <Text
                      style={{ fontSize: 18, color: 'white', fontWeight: '600' }}
                    >
                      +
                    </Text>
                  </Pressable>
                </View>

                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: AC.label,
                      fontVariant: ['tabular-nums'],
                    }}
                  >
                    ${(cartItem.sushiItem.price * cartItem.quantity).toFixed(2)}
                  </Text>
                  <Pressable
                    onPress={() => {
                      removeItem(cartItem.sushiItem.id);
                      if (process.env.EXPO_OS === 'ios') {
                        Haptics.impactAsync(
                          Haptics.ImpactFeedbackStyle.Medium
                        );
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: AC.systemRed,
                        fontWeight: '500',
                      }}
                    >
                      Remove
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}

          <View
            style={{
              backgroundColor: AC.systemBackground,
              borderRadius: 16,
              borderCurve: 'continuous',
              padding: 20,
              gap: 12,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: AC.label,
                  fontVariant: ['tabular-nums'],
                }}
              >
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 16, color: AC.secondaryLabel }}>Tax</Text>
              <Text
                style={{
                  fontSize: 16,
                  color: AC.label,
                  fontVariant: ['tabular-nums'],
                }}
              >
                ${(totalPrice * 0.08).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: AC.separator,
                marginVertical: 4,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: '700', color: AC.label }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: AC.systemBlue,
                  fontVariant: ['tabular-nums'],
                }}
              >
                ${(totalPrice * 1.08).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View
        style={{
          padding: 20,
          paddingBottom: process.env.EXPO_OS === 'ios' ? 34 : 20,
          backgroundColor: AC.systemBackground,
          borderTopWidth: 1,
          borderTopColor: AC.separator,
        }}
      >
        <Pressable
          onPress={handleCheckout}
          style={({ pressed }) => ({
            backgroundColor: AC.systemGreen,
            padding: 16,
            borderRadius: 12,
            borderCurve: 'continuous',
            alignItems: 'center',
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: 'white',
            }}
          >
            Place Order • ${(totalPrice * 1.08).toFixed(2)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
