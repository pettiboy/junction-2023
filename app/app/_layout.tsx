import { Stack } from 'expo-router';

export default function Layout() {
    return <Stack screenOptions={{ animation: "slide_from_bottom", headerBackButtonMenuEnabled: true }} />;
}
