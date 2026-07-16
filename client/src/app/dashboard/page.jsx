import React from 'react'
import { getMe } from '../../lib/auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const user = await getMe();
  if (user?.vendorStatus === 'approved') {
    redirect('/dashboard/overview');
  }

  return (
    <div>page Home </div>
  )
}
