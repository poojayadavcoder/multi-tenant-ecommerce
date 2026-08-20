import React from 'react'
import { getMe } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const user = await getMe();
  console.log(user)
  if (user?.status === 'approved' && user.role === "vendor") {
    redirect('/dashboard/vendor/overview');
  }
    if (user?.status === 'none' && user?.role === 'customer') {
    redirect('/dashboard/customer');
  }
  
}
