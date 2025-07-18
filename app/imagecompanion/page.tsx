import SearchInput from '@/components/SearchInput'
import SubjectFilter from '@/components/SubjectFilter'
import WorkSheetCard from '@/components/WorkSheetCard'

import { getUserWorkSheet } from '@/lib/actions/worksheet.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


const WorkSheetVault = async () => {
  const user = await currentUser();

  if(!user) redirect('/sign-in')


  const WorkSheets = await getUserWorkSheet(user.id);
  return (
    <main>
        <section className='flex justify-between gap-4 max-sm:flex-col'>
          <h1>WorkSheet Vault</h1>

              <div className='flex gap-4'>
                <SearchInput/>
                <SubjectFilter/>
              </div>
        </section>


        <section className='companions-grid'>
            {Array.isArray(WorkSheets) && WorkSheets.map((ws) => (
          <WorkSheetCard
            key={ws.id}
            id={ws.id}
            topic={ws.topic}
            grade={ws.grade}
           
          />
        ))}
              
        </section>
    </main>
  )
}

export default WorkSheetVault
