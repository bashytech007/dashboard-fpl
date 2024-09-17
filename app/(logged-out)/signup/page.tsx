"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { PasswordInput } from "@/components/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from 'next/navigation';
const accountTypeSchema=z.object({
  accountType: z.enum(["personal", "company"]),
  companyName: z.string().optional(),
  numOfEmployees: z.coerce.number().optional(),
  acceptTerms:z.boolean({
    required_error:"You must accept the terms and condition"
  }).refine((checked) => checked, {
    message: "You must accept the terms and conditions"
  })
}).superRefine((data,ctx)=>{
  if (data.accountType === "company" && !data.companyName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["companyName"],
      message: "Company name is required",
    });
  }
  if (
    data.accountType === "company" &&
    (!data.numOfEmployees || data.numOfEmployees < 1)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["numOfEmployees"],
      message: "Number of Employees is required",
    });
  }
})
const passwordSchema=z.object({
  password:z.string().min(8,"Password must contain at least 8 characters").refine((password)=>{
    // must contain at least 1 special character and 1 uppercase character
    return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
  },"Password  must contain at least 1 special character and 1 uppercase letter"),
  passwordConfirm:z.string()
}).superRefine((data, ctx) => {
  if(data.password !== data.passwordConfirm){
    ctx.addIssue({
      code:z.ZodIssueCode.custom,
      path:["passwordConfirm"],
      message:"Passwords do not match",
    })
  }
 
});
const baseSchema = z
  .object({
    email: z.string().email(),
    
    dob: z.date().refine((date) => {
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eighteenYearsAgo;
    }, "You must be at least 18 years old"),
    
  })

  const formSchema=baseSchema.and(passwordSchema).and(accountTypeSchema)
export default function SignupPage() {
  const router=useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
      passwordConfirm:"",
      companyName:"",
      
    },
  });
  const handleSubmit = (data:z.infer<typeof formSchema>) => {
    console.log("login validation passed",data);
    router.push("/dashboard")
  };
  const accountType = form.watch("accountType");

  const dobFromDate = new Date();
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);
  return (
    <>
      <PersonStandingIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>
            Signup for a new Football me Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@doe.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an accounty type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={(field) => (
                      <FormItem>
                        <FormLabel>Company name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numOfEmployees"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Employees</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Employees"
                            min={0}
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2 ">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="normal-case flex justify-between pr-1"
                          >
                            {!!field.value ? format(field.value,"PPP"):
                            
                            <span>PICK A DATE </span>
                            }
                            <CalendarIcon />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-background shadow-lg" align="center">
                        <Calendar
                          mode="single"
                          defaultMonth={field.value}
                          selected={field.value}
                          onSelect={field.onChange}
                          fixedWeeks
                          weekStartsOn={1}
                          fromDate={dobFromDate}
                          toDate={new Date()}
                          captionLayout="dropdown-buttons"
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="........" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="........"  {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                    </FormControl>
                    <FormLabel>I Accept The Terms and Condition</FormLabel>
                    </div>
                    <FormDescription>
                      By signing up you agree to ouy <Link href="/terms" className="text-primary hover:underline">terms and Condition</Link>
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Sign Up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button> 
        </CardFooter>
      </Card>
    </>
  );
}
