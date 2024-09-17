"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {Card,CardContent,CardDescription,CardHeader,CardTitle,CardFooter} from '@/components/ui/card'
import { PersonStandingIcon } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField,FormItem,FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/password-input';
import { useRouter } from 'next/navigation';
const formSchema=z.object({
    email:z.string().email(),
    password:z.string()
})
export default function LoginPage(){
  const router=useRouter()
    const form =useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    });
    const handleSubmit=(data:z.infer<typeof formSchema>)=>{
        console.log("login validation passed")
        router.push("/dashboard");
    }
   
    return(
        <>
        <PersonStandingIcon size={50}/>
        <Card className='w-full max-w-sm'>
           <CardHeader>
            <CardTitle>
              Login
            </CardTitle>
            <CardDescription>
                Login to your Football account
            </CardDescription>
            </CardHeader> 
            <CardContent>
              <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-4'>
                 <FormField control={form.control} name="email" render={(field)=>(
                  <FormItem>
                    <FormLabel>
                        Email
                    </FormLabel>
                    <FormControl>
                        <Input placeholder="john@doe.com"  {...field}/>
                    </FormControl>
                    <FormDescription>
                        This is the email address you signed up to Football with
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                 )}/>
                 <FormField control={form.control} name="password" render={(field)=>(
                  <FormItem>
                    <FormLabel>
                        Password
                    </FormLabel>
                    <FormControl>
                        <PasswordInput placeholder="........"  {...field}/>
                    </FormControl>
                    <FormDescription>
                        Password
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                 )}/>
                  <Button type="submit">
                 Login
               </Button>
               </form>
              
              </Form>
            </CardContent>
            <CardFooter className='justify-between'>
                <small>Don't have an account?</small>
                <Button asChild variant="outline" size="sm">
                    <Link href="/signup">
                     Sign up
                    </Link>
                </Button>
            </CardFooter>
        </Card>
        
        </>
    )
}