import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchCurrentUser, saveAuthData, User } from '../../store/authSlice';
import { loginUser } from './api';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user)

  // Helper function to handle status-based redirection
  const handleStatusNavigation = (userData: User | null) => {
    if (!userData) return;

    // Check vendorStatus or status (depending on your backend key)
    const status = userData.status || (userData as any).status;
     console.log(status)
    if (status === 'approved') {
      router.replace('./dashboard'); // Route to Driver Dashboard
    } else if (status === 'pending') {
      router.replace('/application-status'); // Route to Pending Screen
    } else {
      // If 'none' or not filled yet
      router.replace('/apply-delivery');
    }
  };
  

  // 1. Auto-redirect if user is ALREADY logged in on screen load
  useEffect(() => {
    if (user) {
      handleStatusNavigation(user);
    }
  }, [user]);

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1000&auto=format&fit=crop',
      }}
      className="flex-1 justify-center px-6"
      resizeMode="cover"
    >
      <View className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
        <BlurView intensity={100} tint="light" className="p-6">
          <Text className="text-3xl font-extrabold text-slate-900 text-center mb-1">
            Zoka <Text className="text-primary">Delivery</Text>
          </Text>
          <Text className="text-sm text-slate-600 text-center mb-6">
            Sign in to access your partner dashboard
          </Text>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const data = await loginUser({
                  email: values.email,
                  password: values.password,
                });

                if (data.accessToken && data.user) {
                  // Save user details into Redux
                 const fullUser = await fetchCurrentUser(data.accessToken);
      const userToStore = fullUser ?? data.user;

      await dispatch(
        saveAuthData({
          token: data.accessToken,
          user: userToStore,
        })
      ).unwrap();

                  // 2. Dynamic Redirect after successful login
                 handleStatusNavigation(userToStore);
                }
              } catch (error: unknown) {
                const errorMessage =
                  error instanceof Error
                    ? error.message
                    : 'Invalid login details';
                Alert.alert('Login Failed', errorMessage);
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
                {/* Email Field */}
                <Text className="text-slate-800 font-semibold mb-1">
                  Email Address
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

                {/* Password Field */}
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

                {/* Submit Button */}
                <TouchableOpacity
                  className="bg-dark active:bg-dark-hover rounded-xl py-3.5 items-center shadow-md mb-4"
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text className="text-white text-base font-bold">
                      Sign In
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Register Link */}
                <View className="flex-row justify-center mt-2">
                  <Text className="text-slate-600">
                    Don't have an account?{' '}
                  </Text>
                  <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text className="text-primary font-bold">Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </BlurView>
      </View>
    </ImageBackground>
  );
}