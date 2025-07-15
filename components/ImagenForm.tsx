'use client'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { generateWorksheetFromImage } from "@/lib/actions/image-generation.action"


const formSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required" }),
  grade: z.string().min(1, { message: "Grade level is required" }),
  image: z.any().refine((file) => file?.length > 0, "Image is required"),
})

const grades = ["1st", "2nd", "3rd", "4th", "5th"]

const ImageForm = () => {
  const [result, setResult] = useState<string | null>(null)
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
  if (isLoading) return  // ✅ Prevent double-submit while reading
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
        const base64 = result.split(',')[1] // Remove metadata
        try {
          const worksheet = await generateWorksheetFromImage(base64, values.grade, values.topic)
          setResult(worksheet)
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

    // ✅ Start reading file here
    reader.readAsDataURL(file)
  } catch (err) {
    console.error("Unexpected error during file processing:", err)
    alert("Something went wrong.")
    setIsLoading(false)
  }
}


  return (
    <div className="space-y-6">
        <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Photosynthesis or Basic Fractions" {...field} />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l w-full focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Generate Worksheet</button>
        </form>
      </Form>
      </div>

{result && (
  <div className="relative group bg-gray-100 rounded-md p-4 transition">
    <h2 className="text-lg font-semibold mb-2">Generated Worksheet:</h2>

    {/* Buttons appear on hover */}
    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={() => navigator.clipboard.writeText(result)}
        className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Copy
      </button>
      <button
        onClick={() => {
          const blob = new Blob([result], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "worksheet.txt";
          a.click();
          URL.revokeObjectURL(url);
        }}
        className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Download
      </button>
    </div>

    {/* Scrollable result content */}
    <div className="max-h-64 overflow-y-auto border rounded bg-white p-3 text-sm whitespace-pre-wrap">
      {result}
    </div>
  </div>
)}

    </div>
  )
}

export default ImageForm
