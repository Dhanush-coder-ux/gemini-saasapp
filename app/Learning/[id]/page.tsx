import CompanionComponent from '@/components/CompanionComponent';
import { getCompanion } from '@/lib/actions/companion.action';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'


interface CompanionSessionProps{
  params :Promise<{id : string}>
}


const CompanionSession = async ( { params }:CompanionSessionProps) => {

  const  { id } = await params;
  const companion = await getCompanion(id);
  const { name, subject , topic, title,duration} =companion
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  if(!companion) redirect('/Learning');


  return (
    <main>
      <article className='flex border border-black hover:bg-accent justify-between rounded-b-4xl p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
            <div className='size[72px] flex items-center justify-center px-2 py-2 bg-gray-400  rounded-lg max-md:hidden'>
              <img src={`/icons/${subject}.svg`} width={35} height={35} alt="" />
            </div>

              <div className='flex flex-col gap-3'>
                  <div className='flex items-center gap-2'>
                    <p className='font-bold text-2xl'>
                      {name}
                    </p>
                    <div className='subject-badge max-sm:hidden'>
                        {subject}
                    </div>
                  </div>
                  <p className='text-lg'>{topic}</p>
              </div>
           
        </div>
         <div className='items-start text-2xl max-md:hidden p-5 bg-accent rounded-2xl'>
              {duration}minutes
            </div>
      </article>

      <CompanionComponent {...companion} companionId={id}
       userName={user.firstName} userImage={user.imageUrl} />
    </main>
  )
}

export default CompanionSession;
