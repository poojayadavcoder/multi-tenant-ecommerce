import React, { useState } from "react";
import {View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/store/store";
import { logoutUser } from '../../store/authSlice';

export default function ApplicationStatusScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [checking, setChecking] = useState(false);

  const checkStatus = async () => {
    setChecking(true);
    try {
      // Example call to check status
      // const res = await getDeliveryPartnerStatus();
      // if (res.status === 'APPROVED') { router.replace('/dashboard'); }
      
      Alert.alert(
        "Status Checked",
        "Your application is still under review. Please check back later!"
      );
    } catch (error) {
      Alert.alert("Error", "Could not fetch status.");
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.replace("/login");
  };

  return (
    <View className="flex-1 bg-slate-50 justify-center items-center px-6">
      <View className="bg-white p-8 rounded-3xl shadow-lg w-full items-center border border-slate-100">
        {/* Status Icon */}
        <View className="w-20 h-20 bg-amber-100 rounded-full justify-center items-center mb-4">
          <Text className="text-4xl">⏳</Text>
        </View>

        {/* Title & Badge */}
        <Text className="text-2xl font-bold text-slate-800 text-center mb-2">
          Application Under Review
        </Text>
        <View className="bg-amber-100 px-3 py-1 rounded-full mb-4">
          <Text className="text-amber-800 font-bold text-xs uppercase tracking-wider">
            Status: Pending Approval
          </Text>
        </View>

        {/* Description */}
        <Text className="text-slate-600 text-center mb-6 leading-5">
          Thank you for applying to become a Zoka Delivery Partner! Our team is
          currently verifying your vehicle and driving license details.
        </Text>

        {/* Refresh Status Button */}
        <TouchableOpacity
          className="bg-primary w-full py-3.5 rounded-xl items-center mb-3"
          onPress={checkStatus}
          disabled={checking}
        >
          {checking ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text className="text-white font-bold text-base">
              Check Status Now
            </Text>
          )}
        </TouchableOpacity>

        {/* Logout Option */}
        <TouchableOpacity onPress={handleLogout} className="py-2">
          <Text className="text-slate-500 font-semibold text-sm">
            Log Out & Check Later
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}