import React from 'react'
import { getMe } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const user = await getMe();
  if (user?.vendorStatus === 'approved') {
    redirect('/dashboard/vendor/overview');
  }
    if (user?.vendorStatus === 'none' && user?.role === 'customer') {
    redirect('/dashboard/customer');
  }
  
}
