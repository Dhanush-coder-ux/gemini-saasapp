"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { subjects } from "@/constants"
import { Textarea } from "./ui/textarea"
import { createCompanion } from "@/lib/actions/companion.action"
import { redirect } from "next/navigation"



const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is required" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  voice: z.string().min(1, { message: "Voice is required" }),
  style: z.string().min(1, { message: "Style is required" }),
  duration: z.coerce.number().min(1, { message: "Duration must be at least 1" }),
})



const CompanionForm = () => {

    


const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
        name:'',
        subject:"",
        topic:"",
        voice:"",
        style:"",
        duration:15
    },
})

const onSubmit = async(values: z.infer<typeof formSchema>) =>{
    const Companion = await createCompanion(values);

    if(Companion){
      redirect(`/Learning/${Companion.id}`)
    }else{
      console.log('Failed create companion');
      redirect('/');
      
    }
    

}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the Companion name" className="input" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}
                         value={field.value}   
                         defaultValue={field.value}
                >
                    <SelectTrigger className="input capitalize">
                        <SelectValue placeholder="Select the Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjects.map((subject)=>(
                            <SelectItem 
                            value={subject}
                            key={subject}
                            className="capitalize"
                            >{subject}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>

              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What should The Companion Help With ?</FormLabel>
              <FormControl>
                <Textarea placeholder="Ex. Derivations & Matrices" className="input" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}
                         value={field.value}   
                         defaultValue={field.value}
                >
                    <SelectTrigger className="input">
                        <SelectValue placeholder="Select the Voice" />
                    </SelectTrigger>
                    <SelectContent>
                       
                            <SelectItem value="male" >
                                Male
                           </SelectItem>
                            <SelectItem value="female">
                                Female
                           </SelectItem>
                       
                    </SelectContent>
                    </Select>

              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}
                         value={field.value}   
                         defaultValue={field.value}
                >
                    <SelectTrigger className="input">
                        <SelectValue placeholder="Select the Style" />
                    </SelectTrigger>
                    <SelectContent>
                       
                            <SelectItem value="formal" >
                                Formal
                           </SelectItem>
                            <SelectItem value="casual">
                                Casual
                           </SelectItem>
                       
                    </SelectContent>
                    </Select>

              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated session duration in minutes</FormLabel>
              <FormControl>
                <Input placeholder="15" type="number"  className="input" {...field} />
              </FormControl>
            
              <FormMessage />
            </FormItem>
          )}
        />
   
        <Button type="submit" className="w-full cursor-pointer ">Build Your Companion</Button>
      </form>
    </Form>
  )
}

export default CompanionForm


