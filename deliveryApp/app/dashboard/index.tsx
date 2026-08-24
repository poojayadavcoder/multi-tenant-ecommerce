import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Switch, SafeAreaView, StatusBar,} from 'react-native';
import { Redirect } from 'expo-router';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { logoutUser } from '@/store/authSlice';

const Index = () => {
  const dispatch = useAppDispatch();
  const { token, user, isLoading } = useAppSelector((state) => state.auth);
  const [isOnline, setIsOnline] = useState<boolean>(user?.isAvailable ?? true);

  const activeDeliveries = [
    {
      id: 'ORD-9823',
      storeName: 'Zoka Fresh Supermarket',
      pickupAddress: 'Sector 14, Main Market, Jaipur',
      customerName: 'Aman Sharma',
      deliveryAddress: 'Flat 402, Sunshine Apartments, Malviya Nagar',
      status: 'READY_FOR_PICKUP',
      payout: '₹65',
      distance: '3.2 km',
    },
  ];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  // Redirect if not logged in
  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-100">
      <StatusBar barStyle="dark-content" />

      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        
        {/* 1. HEADER SECTION */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-2xl font-extrabold text-slate-900">
              Hello, {user?.name || 'Partner'} 👋
            </Text>
            <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
              {user?.vehicleType || 'Bike'} • {user?.vehicleNumber || 'RJ-XX-XXXX'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => dispatch(logoutUser())}
            className="bg-red-50 px-3 py-2 rounded-xl border border-red-100"
          >
            <Text className="text-xs font-bold text-red-600">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* 2. DUTY TOGGLE CARD */}
        <View
          className={`p-4 rounded-2xl mb-6 flex-row items-center justify-between shadow-sm border ${
            isOnline
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-slate-200 border-slate-300'
          }`}
        >
          <View className="flex-row items-center space-x-3">
            <View
              className={`w-3.5 h-3.5 rounded-full ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-400'
              }`}
            />
            <View>
              <Text className="text-base font-bold text-slate-900">
                {isOnline ? ' You are Online' : ' You are Offline'}
              </Text>
              <Text className="text-xs text-slate-500">
                {isOnline
                  ? 'Ready to receive nearby orders'
                  : 'Turn on to start earning'}
              </Text>
            </View>
          </View>

          <Switch
            value={isOnline}
            onValueChange={(value) => setIsOnline(value)}
            trackColor={{ false: '#CBD5E1', true: '#10B981' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* 3. TODAY'S METRICS SUMMARY */}
        <Text className="text-base font-bold text-slate-900 mb-3">Today's Summary</Text>
        <View className="flex-row space-x-3 mb-6">
          
          {/* Earnings Card */}
          <View className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <Text className="text-xs font-semibold text-slate-400">Total Earnings</Text>
            <Text className="text-2xl font-black text-slate-900 mt-1">₹850.00</Text>
            <Text className="text-[10px] text-emerald-600 font-bold mt-1">↑ +12% vs yesterday</Text>
          </View>

          {/* Orders Delivered Card */}
          <View className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <Text className="text-xs font-semibold text-slate-400">Completed</Text>
            <Text className="text-2xl font-black text-slate-900 mt-1">12 Orders</Text>
            <Text className="text-[10px] text-slate-500 font-medium mt-1">Avg 18 mins/order</Text>
          </View>
        </View>

        {/* 4. ACTIVE ORDERS SECTION */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-base font-bold text-slate-900">Active Deliveries</Text>
          <Text className="text-xs font-bold text-primary">
            {activeDeliveries.length} Pending
          </Text>
        </View>

        {isOnline && activeDeliveries.length > 0 ? (
          activeDeliveries.map((order) => (
            <View
              key={order.id}
              className="bg-white p-4 rounded-2xl border border-slate-200/80 mb-4 shadow-sm"
            >
              {/* Order Header */}
              <View className="flex-row justify-between items-center pb-3 mb-3 border-b border-slate-100">
                <View className="flex-row items-center space-x-2">
                  <Text className="text-xs font-bold text-slate-400">#{order.id}</Text>
                  <View className="bg-amber-100 px-2 py-0.5 rounded-md">
                    <Text className="text-[10px] font-bold text-amber-700">
                      {order.status.replace(/_/g, ' ')}
                    </Text>
                  </View>
                </View>
                <Text className="text-base font-extrabold text-emerald-600">
                  {order.payout}
                </Text>
              </View>

              {/* Pickup & Drop Details */}
              <View className="space-y-3 mb-4">
                <View>
                  <Text className="text-[11px] font-bold text-slate-400 uppercase">
                    Pickup Store
                  </Text>
                  <Text className="text-sm font-bold text-slate-800">
                    {order.storeName}
                  </Text>
                  <Text className="text-xs text-slate-500">{order.pickupAddress}</Text>
                </View>

                <View className="h-[1px] bg-slate-100" />

                <View>
                  <Text className="text-[11px] font-bold text-slate-400 uppercase">
                    Deliver To
                  </Text>
                  <Text className="text-sm font-bold text-slate-800">
                    {order.customerName}
                  </Text>
                  <Text className="text-xs text-slate-500">
                    {order.deliveryAddress}
                  </Text>
                </View>
              </View>

              {/* Action Button */}
              <TouchableOpacity className="bg-primary rounded-xl py-3 items-center">
                <Text className="text-white font-bold text-sm">Accept & Navigation</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View className="bg-white p-6 rounded-2xl border border-slate-100 items-center justify-center my-2">
            <Text className="text-slate-400 font-medium text-sm text-center">
              {isOnline
                ? 'Searching for nearby orders...'
                : 'You are currently offline. Turn on your duty switch to start receiving orders.'}
            </Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;