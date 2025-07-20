'use client'

import { deleteUserWorkSheet } from "@/lib/actions/worksheet.action"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface WorkSheetCardProps {
  id: string
  topic: string
  grade: string
}

const WorkSheetCard = ({ id, topic, grade }: WorkSheetCardProps) => {
  const router = useRouter()
  const [deleted, setDeleted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const res = await deleteUserWorkSheet(id)
    if (res) {
      setDeleted(true)
      setShowConfirm(false)
      setTimeout(() => router.refresh(), 2000)
    } else {
      setError("Failed to delete.")
    }
    setLoading(false)
  }

  if (deleted) return null

  return (
    <article className="flex flex-col rounded-lg shadow-xl bg-white px-4 py-4 gap-4 w-full min-lg:max-w-[410px] justify-between relative">
      <p className="text-2xl font-bold text-black">{topic}</p>

      <div className="flex items-center gap-2 mt-2 text-sm font-bold text-gray-700">
        {grade}
      </div>

      <Link
        href={`/imagecompanion/${id}`}
        className="text-white text-center bg-gradient-to-br w-full from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Continue
      </Link>

      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Delete
      </button>

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}

      {showConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete <strong>{topic}</strong>?
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

export default WorkSheetCard
