import { getMe } from '../../../lib/auth';
import Sidebar from '../../../components/Sidebar'

export default async function layout({children}) {
   const user = await getMe();
  return (
   <div className="flex min-h-screen bg-slate-50 text-slate-700 antialiased">
      <Sidebar user={user} />

      <main className="flex-1 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  )
}
