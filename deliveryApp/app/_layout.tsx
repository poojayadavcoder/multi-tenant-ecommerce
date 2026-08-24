import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Slot } from 'expo-router';
import { store, useAppDispatch } from '../store/store';
import { loadStoredAuth } from '../store/authSlice';
import './global.css'
function AppInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check local storage for auth on app mount
    dispatch(loadStoredAuth());
  }, [dispatch]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}