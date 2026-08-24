import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Redirect } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logoutUser } from '../store/authSlice';

const Index = () => {
  const dispatch = useAppDispatch();
  const { token, user, isLoading } = useAppSelector((state) => state.auth);
 
  console.log("Hii")

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Redirect if not logged in
  if (!token) {
    return <Redirect href="/login" />;
  }
  else {
    if(user?.status === 'approved') {
      return <Redirect href="./dashboard" />;
    } else if(user?.status === 'pending') {
      return <Redirect href="./application-status" />;
    } else {
      return <Redirect href="./login" />;
    }
  }

  // return (
  //   <View className="flex-1 items-center justify-center bg-white px-6">
  //     <Text className="text-2xl font-bold text-gray-800 mb-2">
  //       Welcome, {user?.name || 'User'}!
  //     </Text>
  //     <Text className="text-gray-500 mb-6">
  //       You are authenticated .
  //     </Text>

  //     <TouchableOpacity
  //       className="bg-red-500 px-6 py-3 rounded-lg"
  //       onPress={() => dispatch(logoutUser())}
  //     >
  //       <Text className="text-white font-semibold">Sign Out</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
};

export default Index;