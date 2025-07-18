import LearningCard from '@/components/LearningCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';
import {  getUserCompanions } from '@/lib/actions/companion.action';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';


const LearningVault =async  ({ searchParams }: SearchParams) => {

  const filters =await searchParams;
  const subject =filters.subject ? filters.subject : "";
  const topic =filters.topic ? filters.topic : "";

  
    const user = await currentUser();
    if (!user) redirect('/sign-in');

  const companions = await getUserCompanions(user.id, {page: 1,limit: 10,subject,topic,});



  
  

  return (
    <main>
        <section className='flex justify-between gap-4 max-sm:flex-col'>
          <h1>Learning Vault</h1>

              <div className='flex gap-4'>
                <SearchInput/>
                <SubjectFilter/>
              </div>
        </section>


        <section className='companions-grid'>
                      {companions.map((companion)=> (
                    <LearningCard
                        key={companion.id}
                        {...companion}   
                    />
                ))}
        </section>
    </main>
  )
}

export default LearningVault
