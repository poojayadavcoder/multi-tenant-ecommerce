import React from 'react'
import { getMe } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const user = await getMe();
  if (user?.status === 'approved') {
    redirect('/dashboard/vendor/overview');
  }
    if (user?.status === 'none' && user?.role === 'customer') {
    redirect('/dashboard/customer');
  }
  
}
