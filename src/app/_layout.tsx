import { CartProvider } from '@/contexts/cart-context';
import { ThemeProvider } from '@/components/theme-provider';
import { Stack } from 'expo-router/stack';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="sushi/[id]"
            options={{
              presentation: 'modal',
              headerShown: true,
            }}
          />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
