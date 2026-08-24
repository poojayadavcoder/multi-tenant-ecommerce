import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ImageBackground, ScrollView} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from './api';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop',
      }}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-6 py-12"
      >
        <View className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
          <BlurView intensity={100} tint="light" className="p-6">
            <Text className="text-3xl font-extrabold text-slate-900 text-center mb-1">
              Join <Text className="text-primary">Zoka</Text>
            </Text>
            <Text className="text-sm text-slate-600 text-center mb-6">
              Create a new account to start delivering
            </Text>

            <Formik
              initialValues={{
                name: '',
                email: '',
                phoneNumber: '',
                password: '',
              }}
              validationSchema={RegisterSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  await registerUser({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    phone_number: values.phoneNumber,
                  });

                  Alert.alert('Success', 'Account created successfully!', [
                    { text: 'OK', onPress: () => router.push('/login') },
                  ]);
                } catch (error: unknown) {
                  const errorMessage =
                    error instanceof Error
                      ? error.message
                      : 'Registration failed';
                  Alert.alert('Error', errorMessage);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View>

                  <Text className="text-slate-800 font-semibold mb-1">
                    Full Name
                  </Text>
                  <TextInput
                    className="bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
                    placeholder="Rajesh Kumar"
                    placeholderTextColor="#94A3B8"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  {touched.name && errors.name ? (
                    <Text className="text-red-500 text-xs mt-1 mb-2 font-medium">
                      {errors.name}
                    </Text>
                  ) : (
                    <View className="mb-4" />
                  )}

                  <Text className="text-slate-800 font-semibold mb-1">
                    Email
                  </Text>
                  <TextInput
                    className="bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
                    placeholder="rajesh@gmail.com"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {touched.email && errors.email ? (
                    <Text className="text-red-500 text-xs mt-1 mb-2 font-medium">
                      {errors.email}
                    </Text>
                  ) : (
                    <View className="mb-4" />
                  )}

                  <Text className="text-slate-800 font-semibold mb-1">
                    Phone Number
                  </Text>
                  <TextInput
                    className="bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
                    placeholder="9876543210"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    value={values.phoneNumber}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                  />
                  {touched.phoneNumber && errors.phoneNumber ? (
                    <Text className="text-red-500 text-xs mt-1 mb-2 font-medium">
                      {errors.phoneNumber}
                    </Text>
                  ) : (
                    <View className="mb-4" />
                  )}
                 
                  <Text className="text-slate-800 font-semibold mb-1">
                    Password
                  </Text>
                  <TextInput
                    className="bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800"
                    placeholder="••••••••"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  {touched.password && errors.password ? (
                    <Text className="text-red-500 text-xs mt-1 mb-4 font-medium">
                      {errors.password}
                    </Text>
                  ) : (
                    <View className="mb-6" />
                  )}

                  <TouchableOpacity
                    className="bg-primary active:bg-primary-dark rounded-xl py-3.5 items-center shadow-md mb-4"
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text className="text-white text-base font-bold">
                        Register Now
                      </Text>
                    )}
                  </TouchableOpacity>

                  <View className="flex-row justify-center mt-2">
                    <Text className="text-slate-600">
                      Already have an account?{' '}
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/login')}>
                      <Text className="text-dark font-bold">Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </BlurView>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}