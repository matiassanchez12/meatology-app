import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useColorScheme } from '@/lib/useColorScheme'
import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Page() {
  const { user } = useUser()
  const { signOut } = useAuth();
  const { setColorScheme, colorScheme } = useColorScheme();

  return (
    <View>
      <SignedIn>
        <View className='flex flex-row justify-end p-2 gap-2'>
          <Button variant='outline' onPress={() => signOut()} title="logout" />
          <Button variant='outline' onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')} title="darkmode" />
        </View>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <View className='flex flex-row justify-end p-2 gap-2'>
          <Button variant='outline' onPress={() => signOut()} title="logout" />
          <ThemeToggle />
        </View>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}