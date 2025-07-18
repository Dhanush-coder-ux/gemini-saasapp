
import WorkSheetComponent from "@/components/WorkSheetComponent";
import { getSingleWorkSheet} from "@/lib/actions/worksheet.action";






interface WorkSheetSessionProps{
  params :Promise<{id : string}>
}


const WorksheetSession = async ({params}:WorkSheetSessionProps) => {
        const  { id } = await params;
        const data = await getSingleWorkSheet(id);
        const {topic,grade,worksheet} = data;


  return (
    <main>
      <article className='flex border border-black hover:bg-accent justify-between rounded-b-4xl p-6 max-md:flex-col'>
        <div className='flex items-center gap-3'>
            <div className='size[72px] flex items-center justify-center px-2 py-2 bg-gray-400  rounded-lg '>
              <img src={`/icons/book.svg`} width={35}  height={35} alt="" />
            </div>

              <div className='flex  flex-col gap-3'>
                  <div className='flex items-center gap-2'>
                    <p className='font-bold text-2xl'>
                      {topic}
                    </p>
                  </div>
                  <div className="flex">
                    Grade : <p className="subject-badge ml-2 " >{grade}</p>
                  </div>
              
              </div>
           
        </div>
         
      </article>

      {/* <CompanionComponent {...companion} companionId={id}
       userName={user.firstName} userImage={user.imageUrl} /> */}

       <WorkSheetComponent worksheet={worksheet} />

    </main>
  )
}

export default WorksheetSession
