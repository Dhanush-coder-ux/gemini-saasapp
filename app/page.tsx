export const dynamic = "force-dynamic";
import CTA from "@/components/CTA"
import CTAI from "@/components/CTAI";

import LearningCard from "@/components/LearningCard"
import LearningList from "@/components/LearningList"

import { getAllCompanions, getRecentSessions, getUserCompanions, getUserSessions } from "@/lib/actions/companion.action"
import { currentUser } from "@clerk/nextjs/server";



const Page = async () => {

 
  const user = await currentUser();
   const companions = await getUserCompanions(user?.id);
   const sort = companions.slice(0,3)


  
  const recentSessionsCompanions = await getUserSessions(user?.id,{limit :  10})



  return (
    <main>
      <h1 className='text-2xl'>Popular Learning</h1>
      <section className="home-section">
        

        {sort.map(( companion) => (
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
      <section className="home-section">
        <CTAI/>
        
      </section>
    </main>
  )
}

export default Page