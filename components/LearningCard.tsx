import Link from "next/link";

interface LearningCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const googleColors = ["text-blue-500", "text-red-500", "text-yellow-500", "text-green-500"];
const buttonColors = ["bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-green-500"];
const hoverColors = ["hover:bg-blue-600", "hover:bg-red-600", "hover:bg-yellow-600", "hover:bg-green-600"];

const LearningCard = ({ id, name, color, topic, subject, duration }: LearningCardProps) => {
  const colorIndex = parseInt(id, 36) % 4; // rotate based on ID

  return (
    <article className="companion-card" style={{ background: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <img src="/icons/bookmark.svg" width={12.5} height={15} alt="" />
        </button>
      </div>

      {/* Name with Google color */}
      <h2 className={`text-2xl font-semibold ${googleColors[colorIndex]}`}>{name}</h2>

      {/* Topic with another color (different from name) */}
      <p className={`text-sm mt-1 ${googleColors[(colorIndex + 1) % 4]}`}>{topic}</p>

      {/* Duration */}
      <div className="flex items-center gap-2 mt-2 text-gray-700">
        <img src="/icons/clock.svg" width={13.5} height={13.5} alt="" />
        <p className="text-sm">{duration} minutes</p>
      </div>

      {/* Button with Google style */}
      <Link href={`/Learning/${id}`} className="w-full mt-4 block">
        <button
          className={`text-white font-medium py-2 px-4 rounded-md w-full flex justify-center transition-colors duration-300 ${buttonColors[colorIndex]} ${hoverColors[colorIndex]}`}
        >
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default LearningCard;
// import Link from "next/link";

// interface LearningCardProps {
//     id:string;
//     name:string;
//     topic:string;
//     subject:string
//     duration:number;
//     color:string;
    
// }
// const LearningCard = ({ id, name, color,topic,subject,duration }:LearningCardProps) => {
//   return (
//     <article className="companion-card " style={{background:color}}>
//         <div className="flex justify-between items-center">
//             <div className="subject-badge">{subject}</div>
//             <button className="companion-bookmark">
//                 <img src="/icons/bookmark.svg" width={12.5} height={15} alt="" />
//             </button>
//         </div>

//         <h2 className="text-2xl font-semibold">{name}</h2>
//         <p className="text-gray-600">{topic}</p>


//         <div className="flex items-center gap-2">
//             <img src="/icons/clock.svg" width={13.5} height={13.5} alt="" />
//             <p className="text-sm">{duration} minutes</p>
//         </div>


//         <Link href={`/Learning/${id}`} className="w-full">
//                 <button className="btn-primary w-full justify-center">
//                     Launch Lesson
//                 </button>
//         </Link>

//     </article>
//   )
// }

// export default LearningCard
