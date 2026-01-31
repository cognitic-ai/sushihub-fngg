import { SushiItem } from '@/data/sushi';
import * as AC from '@bacons/apple-colors';
import { Pressable, Text, View } from 'react-native';

interface SushiCardProps {
  item: SushiItem;
  onPress: () => void;
}

export default function SushiCard({ item, onPress }: SushiCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: AC.systemBackground,
        borderRadius: 16,
        borderCurve: 'continuous',
        padding: 16,
        marginBottom: 12,
        opacity: pressed ? 0.7 : 1,
        ...(!process.env.EXPO_OS || process.env.EXPO_OS === 'web'
          ? {
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }
          : {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
            }),
      })}
    >
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Text style={{ fontSize: 48 }}>{item.image}</Text>
        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: AC.label,
              }}
            >
              {item.name}
            </Text>
            {item.spicy && <Text style={{ fontSize: 16 }}>🌶️</Text>}
            {item.vegetarian && <Text style={{ fontSize: 16 }}>🌱</Text>}
          </View>
          <Text
            style={{
              fontSize: 14,
              color: AC.secondaryLabel,
            }}
            numberOfLines={2}
          >
            {item.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: AC.systemBlue,
              }}
            >
              ${item.price.toFixed(2)}
            </Text>
            <View
              style={{
                backgroundColor: AC.systemBlue,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
                borderCurve: 'continuous',
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: 'white',
                  textTransform: 'uppercase',
                }}
              >
                {item.category}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
