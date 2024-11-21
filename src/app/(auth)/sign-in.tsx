import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { TextInput, View } from 'react-native'
import { Button } from "../../components/ui/button";
import { Text } from "../../components/ui/text";

import React from 'react'
import { Input } from '@/components/ui/input';
import { OAuth } from '@/components/o-auth';
import { Controller, Form, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import FormField from '@/components/form-field';

export type FormData = {
  email: string;
  password: string;
};

const UserSchema = z
  .object({
    email: z.number(),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
  })

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(UserSchema)
  });

  const onSignInPress = async (data: FormData) => {
    console.log(data)
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View className='px-6 mt-4 flex gap-4'>
      <Form control={form.control}>
        <form onSubmit={form.handleSubmit(onSignInPress)} className="space-y-8">
          <View className='flex flex-col gap-4 py-4'>
            <FormField
              placeholder="Email..."
              name="email"
              label="Email"
              control={form.control}
            />
            <FormField
              placeholder="Password..."
              name="password"
              label="Contraseña"
              control={form.control}
              type='password'
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your name"
                  type='text'
                />
              )}
            />
            <>
              err
              {JSON.stringify(form.formState.errors)}

            </>
          </View>

          <Button variant='secondary' title="ingresar" />

          <OAuth />

          <View className='flex flex-row items-center'>
            <Text>
              Don't have an account?
            </Text>

            <Link href="/sign-up">
              <Button variant='link' title="sign up" />
            </Link>
          </View>
        </form>
      </Form>
    </View>
  )
}