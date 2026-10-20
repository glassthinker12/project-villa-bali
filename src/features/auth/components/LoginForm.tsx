import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginForm = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(data: z.infer<typeof loginSchema>) {
		console.log({ data });
	}

	return (
		<div className="flex min-h-dvh items-center justify-center bg-cream px-4 py-16">
			<Card className="w-full max-w-sm">
				<CardHeader className="text-center">
					<CardTitle>Sign in to your account</CardTitle>
					<CardDescription>
						Enter your credentials to access your dashboard
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-login-email">Email</FieldLabel>
										<Input
											{...field}
											id="form-login-email"
											aria-invalid={fieldState.invalid}
											placeholder="you@example.com"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-login-password">
											Password
										</FieldLabel>
										<Input
											{...field}
											type="password"
											id="form-login-password"
											aria-invalid={fieldState.invalid}
											placeholder="*****"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<Field orientation="horizontal">
						<Button type="submit" form="form-login" className="w-full">
							Login
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</div>
	);
};
