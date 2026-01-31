import { useCart } from "@/contexts/cart-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs as WebTabs } from "expo-router/tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform, Text, useWindowDimensions, View } from "react-native";

export default function TabsLayout() {
  if (process.env.EXPO_OS === "web") {
    return <WebTabsLayout />;
  } else {
    return <NativeTabsLayout />;
  }
}

function CartBadge() {
  const { totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: -6,
        right: -10,
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
      }}
    >
      <Text style={{ color: 'white', fontSize: 12, fontWeight: '700', fontVariant: ['tabular-nums'] }}>
        {totalItems > 99 ? '99+' : totalItems}
      </Text>
    </View>
  );
}

function WebTabsLayout() {
  const { width } = useWindowDimensions();
  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <WebTabs
      screenOptions={{
        headerShown: false,
        ...(isMd
          ? {
              tabBarPosition: "left",
              tabBarVariant: "material",
              tabBarLabelPosition: isLg ? undefined : "below-icon",
            }
          : {
              tabBarPosition: "bottom",
            }),
      }}
    >
      <WebTabs.Screen
        name="index"
        options={{
          title: "Menu",
          tabBarIcon: (props) => <MaterialIcons {...props} name="restaurant-menu" />,
        }}
      />
      <WebTabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: (props) => (
            <View>
              <MaterialIcons {...props} name="shopping-cart" />
              <CartBadge />
            </View>
          ),
        }}
      />
    </WebTabs>
  );
}

function NativeTabsLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Menu</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "list.bullet", selected: "list.bullet" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="restaurant-menu" />,
            },
          })}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="cart">
        <NativeTabs.Trigger.Label>Cart</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          {...Platform.select({
            ios: { sf: { default: "cart", selected: "cart.fill" } },
            default: {
              src: <NativeTabs.Trigger.VectorIcon family={MaterialIcons} name="shopping-cart" />,
            },
          })}
        />
        <NativeTabs.Trigger.Badge>
          <CartBadge />
        </NativeTabs.Trigger.Badge>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
