'use client'
import Link from "next/link"


interface WorkSheetCardProps {
  id: string
  topic: string
  grade: string
 }


const WorkSheetCard = ({ id,  topic, grade }: WorkSheetCardProps) => {
  return (
       <article className="flex flex-col rounded-lg  shadow-xl bg-white px-4 py-4 gap-4 w-full min-lg:max-w-[410px] justify-between relative">
   

      <p className={`text-2xl font-bold text-black`}>{topic}</p>

      <div className="flex items-center gap-2 mt-2  text-sm font-bold text-gray-700">
       
         
      {grade}
 
      </div>

      <Link href={`/imagecompanion/${id}`} className="w-full mt-4 block">
        <button
        className="text-white bg-gradient-to-br w-full from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Continue  
        </button>
      </Link>

      <button
        type="button"
        
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Delete
      </button>



   
    </article>
  )
}

export default WorkSheetCard
