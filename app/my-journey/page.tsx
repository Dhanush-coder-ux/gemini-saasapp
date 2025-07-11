import LearningList from "@/components/LearningList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getUserCompanions, getUserSessions } from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";



const Profile = async() => {

  const user = await currentUser();
  if (!user) redirect('/sign-in');

  const companion = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  
  return (
    <main className='min-lg:w-3/4'>
      <section className=" flex justify-between border p-3 rounded-bl-4xl bg-gray-300 gap-4 max-sm:flex-col items-center">

        <div className="flex gap-4 items-center ">
          <img 
           src={user.imageUrl}
           width={100}
           height={100}
           className="rounded-2xl" alt="" />
           
          <div className="flex flex-col">
                <h1 className="font-bold text-2xl">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-sm text-mutted-foreground">
                  {user.emailAddresses[0].emailAddress}
                </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="border border-black bg-black rounded-t-4xl p-3 gap-2 flex flex-col h-fit">
              <div className="flex gap-2">
                <img src="/icons/check.svg" width={22} height={22} alt="" />
                <p className="text-2xl text-white font-semibold" >
                  {sessionHistory.length}
                </p>
               
              </div>
               <p className="text-white">Lessons Completed</p>
          </div>
          <div className="border border-black bg-black rounded-t-4xl p-3 gap-2 flex flex-col h-fit">
              <div className="flex gap-2">
                <img src="/icons/cap.svg" width={22} height={22} alt="" />
                <p className="text-2xl text-white font-semibold" >
                  {companion.length}
                </p>
               
              </div>
               <p className="text-white">Companion Created</p>
          </div>

        </div>


      

      </section>
        <Accordion type="single" collapsible>
            <AccordionItem value="recent">
              <AccordionTrigger className="text-2xl font-bold ">Recent Sessions</AccordionTrigger>
              <AccordionContent>
               <LearningList title="Recent Sessions" companions={sessionHistory}/>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="companion">
              <AccordionTrigger className="text-2xl font-bold ">My Companions {`(${companion.length })`}</AccordionTrigger>
              <AccordionContent>
               <LearningList title="My Companions" companions={companion}/>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
      
    </main>
  )
}

export default Profile
