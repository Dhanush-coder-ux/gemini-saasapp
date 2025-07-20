"use client"

import Link from "next/link"
import { useState } from "react"
import { deleteCompanion } from "@/lib/actions/companion.action"
import { useRouter } from "next/navigation"

interface LearningCardProps {
  id: string
  name: string
  topic: string
  subject: string
  duration: number
  color: string
}

const googleColors = ["text-blue-500", "text-red-500", "text-yellow-500", "text-green-500"]
const buttonColors = ["bg-blue-500", "bg-red-500", "bg-yellow-500", "bg-green-500"]
const hoverColors = ["hover:bg-blue-600", "hover:bg-red-600", "hover:bg-yellow-600", "hover:bg-green-600"]

const LearningCard = ({ id, name, color, topic, subject, duration }: LearningCardProps) => {
  const router = useRouter()
  const [deleted, setDeleted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const colorIndex = parseInt(id, 36) % 4

  const handleDelete = async () => {
    setLoading(true)
    const res = await deleteCompanion(id)
    if (res?.success) {
      setDeleted(true)
      setShowConfirm(false)
      setTimeout(() => router.refresh(), 1000)
    }
    setLoading(false)
  }

  if (deleted) return null

  return (
    <article className="companion-card relative" style={{ background: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <img src="/icons/bookmark.svg" width={12.5} height={15} alt="" />
        </button>
      </div>

      <h2 className={`text-2xl font-semibold ${googleColors[colorIndex]}`}>{name}</h2>
      <p className={`text-sm mt-1 ${googleColors[(colorIndex + 1) % 4]}`}>{topic}</p>

      <div className="flex items-center gap-2 mt-2 text-gray-700">
        <img src="/icons/clock.svg" width={13.5} height={13.5} alt="" />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/Learning/${id}`} className="w-full mt-4 block">
        <button
          className={`text-white font-medium py-2 px-4 rounded-md w-full flex justify-center transition-colors duration-300 ${buttonColors[colorIndex]} ${hoverColors[colorIndex]}`}
        >
          Launch Lesson
        </button>
      </Link>

      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Delete
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete <strong>{name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                {loading ? "Deleting..." : "Yes, delete"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}

export default LearningCard
