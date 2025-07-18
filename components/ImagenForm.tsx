'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { generateWorksheetFromImage } from "@/lib/actions/image-generation.action"
import { createWorkSheet } from "@/lib/actions/worksheet.action"

const formSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  grade: z.string().min(1, { message: "Grade level is required" }),
  image: z.any().refine((file) => file?.length > 0, "Image is required"),
})

const grades = ["1st", "2nd", "3rd", "4th", "5th"]

const ImageForm = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      grade: "",
      image: null,
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isLoading) return
    
    setIsLoading(true)
    
    try {
      const file = values.image?.[0]
      if (!file) {
        console.error("No file provided.")
        setIsLoading(false)
        return
      }

      const reader = new FileReader()

      reader.onloadend = async () => {
        const result = reader.result
        if (typeof result === "string") {
          const base64 = result.split(',')[1]
          try {
            const worksheet = await generateWorksheetFromImage(base64, values.grade, values.topic)
            const { id } = await createWorkSheet({
              topic: values.topic,
              grade: values.grade,
              worksheet,
            });

            if (id) {
              router.push(`/imagecompanion/${id}`)
            } else {
              alert("Failed to create worksheet.")
            }
          } catch (err) {
            console.error("Error generating worksheet:", err)
            alert("Worksheet generation failed. Please try again later.")
          }
        } else {
          console.error("Failed to read file")
          alert("Could not read the image file. Please try another.")
        }
        setIsLoading(false)
      }

      reader.onerror = () => {
        console.error("File reading error")
        alert("Error reading the image file.")
        setIsLoading(false)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      console.error("Unexpected error:", err)
      alert("Something went wrong.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="e.g., Photosynthesis or Basic Fractions" 
                    {...field} 
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Level</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {grades.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Textbook Image</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => field.onChange(e.target.files)}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l w-full focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Worksheet"
            )}
          </button>
        </form>
      </Form>
    </div>
  )
}

export default ImageForm