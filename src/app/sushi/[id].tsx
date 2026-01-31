import { useCart } from '@/contexts/cart-context';
import { sushiMenu } from '@/data/sushi';
import * as AC from '@bacons/apple-colors';
import * as Haptics from 'expo-haptics';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function SushiDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = sushiMenu.find((s) => s.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: AC.label }}>Item not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(item);
    }
    if (process.env.EXPO_OS === 'ios') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: AC.systemGroupedBackground }}>
      <Stack.Screen
        options={{
          title: item.name,
          presentation: 'modal',
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
      >
        <View style={{ padding: 20, gap: 24 }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: AC.systemBackground,
              padding: 32,
              borderRadius: 24,
              borderCurve: 'continuous',
            }}
          >
            <Text style={{ fontSize: 120 }}>{item.image}</Text>
          </View>

          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '700',
                  color: AC.label,
                  flex: 1,
                }}
              >
                {item.name}
              </Text>
              {item.spicy && <Text style={{ fontSize: 24 }}>🌶️</Text>}
              {item.vegetarian && <Text style={{ fontSize: 24 }}>🌱</Text>}
            </View>

            <Text
              style={{
                fontSize: 32,
                fontWeight: '700',
                color: AC.systemBlue,
              }}
            >
              ${item.price.toFixed(2)}
            </Text>

            <View
              style={{
                backgroundColor: AC.systemBlue,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                borderCurve: 'continuous',
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: 'white',
                  textTransform: 'uppercase',
                }}
              >
                {item.category}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: AC.systemBackground,
              padding: 16,
              borderRadius: 16,
              borderCurve: 'continuous',
              gap: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: AC.label,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: AC.secondaryLabel,
                lineHeight: 24,
              }}
            >
              {item.description}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: AC.systemBackground,
              padding: 16,
              borderRadius: 16,
              borderCurve: 'continuous',
              gap: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: AC.label,
              }}
            >
              Ingredients
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {item.ingredients.map((ingredient, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: AC.secondarySystemBackground,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                    borderCurve: 'continuous',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: AC.label,
                    }}
                  >
                    {ingredient}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              backgroundColor: AC.systemBackground,
              padding: 16,
              borderRadius: 16,
              borderCurve: 'continuous',
              gap: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: AC.label,
              }}
            >
              Quantity
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <Pressable
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                    if (process.env.EXPO_OS === 'ios') {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                  }
                }}
                style={({ pressed }) => ({
                  backgroundColor: AC.systemBlue,
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: pressed || quantity === 1 ? 0.5 : 1,
                })}
              >
                <Text style={{ fontSize: 24, color: 'white', fontWeight: '600' }}>
                  −
                </Text>
              </Pressable>

              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: AC.label,
                  minWidth: 40,
                  textAlign: 'center',
                  fontVariant: ['tabular-nums'],
                }}
              >
                {quantity}
              </Text>

              <Pressable
                onPress={() => {
                  setQuantity(quantity + 1);
                  if (process.env.EXPO_OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                style={({ pressed }) => ({
                  backgroundColor: AC.systemBlue,
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Text style={{ fontSize: 24, color: 'white', fontWeight: '600' }}>
                  +
                </Text>
              </Pressable>
            </View>
          </View>
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
          onPress={handleAddToCart}
          style={({ pressed }) => ({
            backgroundColor: AC.systemBlue,
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
            Add to Cart • ${(item.price * quantity).toFixed(2)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
