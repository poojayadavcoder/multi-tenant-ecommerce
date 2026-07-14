import VendorPendingScreen from '../../components/VendorPendingScreen';
import { getMe } from '../../lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '../../components/Sidebar';

// Fix 3: Capitalized component name to "Layout"
export default async function Layout({ children }) { // Fix 1: Accept the children prop
  const user = await getMe();
  if (!user) {
    redirect('/auth/login');
  }
  if (user?.vendorStatus === 'pending') {
    return <VendorPendingScreen />;
  }
  
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-700 antialiased">
      <Sidebar user={user} />

      <main className="flex-1 overflow-y-auto max-h-screen">
        {children}
      </main>
    </div>
  );
}