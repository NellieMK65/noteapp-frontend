import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
	full_name: z
		.string({ required_error: "Full name is required" })
		.nonempty({ message: "Full name is required" }),
	email: z
		.string({ required_error: "Email address is required" })
		.email({ message: "Enter a valid email address" }),
	password: z.string().optional(), //come back to this later on
});

export function SignInForm({ className, ...props }) {
	const form = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (values) => {
		// make a fetch request to the backed
		// const myHeaders = new Headers();
		// myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify(values);

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: raw,
		};

		await fetch("http://127.0.0.1:5555/signin", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				// 1. display success message
				// 2. clear form
				// 3. store user session
				// 4. redirect user home/dashboard
			})
			.catch((error) => console.log("error", error));
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome to Noteapp</CardTitle>
					<CardDescription>Create Account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} noValidate>
							<div className="grid gap-6">
								<div className="grid gap-6">
									{/* <div className="grid gap-3">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											placeholder="m@example.com"
											required
										/>
									</div> */}
									<FormField
										control={form.control}
										name="full_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Full Name</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												{/* This will display errors if any */}
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												{/* This will display errors if any */}
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="grid gap-3">
										<div className="flex items-center">
											<Label htmlFor="password">Password</Label>
											<a
												href="#"
												className="ml-auto text-sm underline-offset-4 hover:underline"
											>
												Forgot your password?
											</a>
										</div>
										<Input id="password" type="password" />
									</div>
									<Button
										disabled={form.formState.isSubmitting}
										type="submit"
										className="w-full hover:cursor-pointer"
									>
										{form.formState.isSubmitting ? (
											<>
												<Loader2Icon /> Signin...{" "}
											</>
										) : (
											"SignIn"
										)}
									</Button>
								</div>
								<div className="text-center text-sm">
									Don&apos;t have an account?{" "}
									<a href="#" className="underline underline-offset-4">
										Login
									</a>
								</div>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
