import SushiCard from '@/components/sushi-card';
import { useCart } from '@/contexts/cart-context';
import { sushiMenu } from '@/data/sushi';
import * as AC from '@bacons/apple-colors';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function IndexRoute() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addItem } = useCart();

  const categories = ['all', 'nigiri', 'roll', 'sashimi', 'special'];

  const filteredMenu =
    selectedCategory === 'all'
      ? sushiMenu
      : sushiMenu.filter((item) => item.category === selectedCategory);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: AC.systemGroupedBackground,
      }}
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
            Sushi Menu
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: AC.secondaryLabel,
            }}
          >
            Fresh sushi prepared daily
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -16, paddingHorizontal: 16 }}
          contentContainerStyle={{ gap: 8 }}
        >
          {categories.map((cat) => (
            <View
              key={cat}
              style={{
                backgroundColor:
                  selectedCategory === cat ? AC.systemBlue : AC.systemBackground,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                borderCurve: 'continuous',
              }}
              onTouchEnd={() => setSelectedCategory(cat)}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: selectedCategory === cat ? 'white' : AC.label,
                  textTransform: 'capitalize',
                }}
              >
                {cat}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View>
          {filteredMenu.map((item) => (
            <Link key={item.id} href={`/sushi/${item.id}`} asChild>
              <SushiCard item={item} onPress={() => {}} />
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
