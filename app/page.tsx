export const dynamic = "force-dynamic";
import CTA from "@/components/CTA"

import LearningCard from "@/components/LearningCard"
import LearningList from "@/components/LearningList"

import { getAllCompanions, getRecentSessions, getUserSessions } from "@/lib/actions/companion.action"
import { currentUser } from "@clerk/nextjs/server";



const Page = async () => {
  const companions = await getAllCompanions( {limit : 3});
  const user = await currentUser();


  
  const recentSessionsCompanions = await getUserSessions(user?.id,{limit :  10})



  return (
    <main>
      <h1 className='text-2xl'>Popular Learning</h1>
      <section className="home-section">
        

        {companions.map(( companion) => (
           <LearningCard 
           key={companion.id}
              {...companion}
         />
          

        ))}
       
       
        
      </section>

      <section className="home-section">
        <LearningList 
        title="Recently Completed the session"
        companions={recentSessionsCompanions}
       classNames="w-2/3 max-lg:w-full"
        />
        <CTA/>
      </section>
    </main>
  )
}

export default Page