import { useColorScheme } from '@/lib/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, View } from 'react-native';
import { icons } from "../lib/icons";
import { Button } from './ui/button';
import { setAndroidNavigationBar } from '../lib/android-navigation-bar';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Button
      onPress={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark';
        setColorScheme(newTheme); 
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem('theme', newTheme);
      }}
      title=''
      variant='outline'
      IconLeft={isDarkColorScheme ? (
        icons.Moon
      ) : (
        icons.Sun
      )}
    />
  );
}