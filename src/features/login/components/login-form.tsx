import { TriangleAlertIcon } from "lucide-react";
import { Controller } from "react-hook-form";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useLoginForm } from "../hooks/use-login-form";

export const LoginForm = () => {
	const { form, isLoading, error, handleSubmit } = useLoginForm();

	return (
		<div className="flex flex-col items-center gap-6">
			<Card className="min-w-lg">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>
						Enter your credentials to access your dashboard
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="form-login" onSubmit={form.handleSubmit(handleSubmit)}>
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
											placeholder="admin@example.com"
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
