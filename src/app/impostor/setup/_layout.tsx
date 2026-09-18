import { Stack } from 'expo-router';

export default function SetupLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#0A0E1A' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="players" />
      <Stack.Screen name="impostors" />
      <Stack.Screen name="difficulty" />
      <Stack.Screen name="categories" />
      <Stack.Screen name="voting-mode" />
      <Stack.Screen name="advantages" />
      <Stack.Screen name="advantage-detail" />
      <Stack.Screen name="rules" />
      <Stack.Screen name="rule-detail" />
    </Stack>
  );
}
