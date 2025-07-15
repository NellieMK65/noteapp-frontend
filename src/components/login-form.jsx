import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { BASE_URL } from "@/utils";
import toast from "react-hot-toast";

const schema = z.object({
	email: z
		.string({ required_error: "Email address is required" })
		.email({ message: "Enter a valid email address" }),
	password: z.string({ required_error: "Password is required" }),
});

/**
 * Send request to server (stringify)
 * Server validates the request and creates a session
 * Sends back the response to our app
 */

export function LoginForm({ className, ...props }) {
	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (values) => {
		await fetch(`${BASE_URL}/login`, {
			method: "POST",
			body: JSON.stringify(values),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((result) => {
				// the user is only available if the process was successfull
				if (result.user) {
					// 1. display success message
					toast.success(result.message);
					// 2. clear form
					form.reset();
					// 3. store user session
					localStorage.setItem("session", result.access_token);
					// 4. redirect user /notes
					// check for user role then navigate them to the correct page
					navigate(result.user.role === "admin" ? "/admin" : "/notes");
				} else {
					const message =
						typeof result.message === "object"
							? Object.values(result.message)[0]
							: result.message;

					toast.error(message);
				}
			});
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl text-blue-500">
						Welcome back to my application
					</CardTitle>
					{/* <CardDescription>
						Login with your Apple or Google account
					</CardDescription> */}
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="grid gap-6">
								<div className="grid gap-6">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email address</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<div className="flex items-center">
													<FormLabel>Password</FormLabel>

													<a
														href="#"
														className="ml-auto text-sm underline-offset-4 hover:underline"
													>
														Forgot your password?
													</a>
												</div>
												<FormControl>
													<Input type="password" {...field} />
												</FormControl>
												{/* This will display errors if any */}
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										disabled={form.formState.isSubmitting}
										type="submit"
										className="w-full hover:cursor-pointer"
									>
										{form.formState.isSubmitting ? (
											<>
												<Loader2Icon /> Loging in...{" "}
											</>
										) : (
											"Login"
										)}
									</Button>
								</div>
								<div className="text-center text-sm">
									Don&apos;t have an account?{" "}
									<Link to={"/signin"} className="underline underline-offset-4">
										Sign In
									</Link>
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
