import CTA from "@/components/CTA"
import LearningCard from "@/components/LearningCard"
import LearningList from "@/components/LearningList"
import { recentSessions } from "@/constants"

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl'>Popular Learning</h1>
      <section className="home-section">
        <LearningCard 
        id="123"
        name="AI Agentic"
        topic="AI ML"
        subject="ai"
        duration={45}
        color="white"
         />
        <LearningCard 
        id="126"
        name="AI Agentic "
        topic="AI ML"
        subject="ai"
        duration={45}
        color="white"
         />
        <LearningCard 
        id="125"
        name="AI Agentic"
        topic="AI ML"
        subject="ai"
        duration={45}
        color="white"
         />
        
      </section>

      <section className="home-section">
        <LearningList 
        title="Recently Completed the session"
        companions={recentSessions}
       classNames="w-2/3 max-lg:w-full"
        />
        <CTA/>
      </section>
    </main>
  )
}

export default Page