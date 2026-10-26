import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { TriangleAlertIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertTitle } from "#/components/ui/alert";
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
import { loginFn } from "../servers";

export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginForm = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "admin@example.com",
			password: "admin123",
		},
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const router = useRouter();

	async function onSubmit(data: z.infer<typeof loginSchema>) {
		setIsLoading(true);

		try {
			await loginFn({
				data: { email: data.email, password: data.password },
			});
			await router.invalidate();
			navigate({ to: "/admin" });
		} catch (err) {
			if (err instanceof Error) setError(err.message);
		} finally {
			setIsLoading(false);
		}
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

					{error && (
						<div className="mt-6">
							<Alert variant="destructive">
								<TriangleAlertIcon />
								<AlertTitle>{error}</AlertTitle>
							</Alert>
						</div>
					)}
				</CardContent>
				<CardFooter>
					<Field orientation="horizontal">
						<Button
							type="submit"
							form="form-login"
							disabled={isLoading}
							className="w-full"
						>
							{!isLoading ? "Login" : "Loading..."}
						</Button>
					</Field>
				</CardFooter>
			</Card>
		</div>
	);
};
