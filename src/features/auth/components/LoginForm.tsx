import { useRouter, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import {
	defaultTransition,
	fadeUp,
	staggerContainer,
	staggerItem,
} from "../lib/animation-variants";
import { loginFn } from "../server/auth-fns";
import { AuthCard } from "./AuthCard";

export const LoginForm = () => {
	const router = useRouter();
	const search = useSearch({
		from: "/_auth/login",
		select: (s) => ({ redirect: s.redirect }),
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const login = useServerFn(loginFn);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const result = await login({ data: formData });
			if (result && "error" in result) {
				setError(result.error);
				return;
			}
			const redirectTo = search.redirect || "/";
			await router.navigate({ to: redirectTo });
		} catch {
			setError("Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<div className="flex min-h-dvh items-center justify-center bg-cream px-4 py-16">
			<AuthCard>
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="space-y-6"
				>
					<div className="text-center">
						<motion.h1
							variants={staggerItem}
							transition={defaultTransition}
							className="font-bold font-heading text-(--color-ink) text-3xl"
						>
							Sign in to your account
						</motion.h1>
						<motion.p
							variants={staggerItem}
							transition={defaultTransition}
							className="mt-2 text-mist"
						>
							Enter your credentials to access your dashboard
						</motion.p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5">
						<motion.fieldset
							variants={staggerItem}
							transition={defaultTransition}
							disabled={isLoading}
							className="space-y-5"
						>
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block font-medium text-(--color-ink) text-sm"
								>
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									value={formData.email}
									onChange={handleChange}
									className="w-full rounded-lg border border-mist bg-white px-4 py-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
									placeholder="you@example.com"
								/>
							</div>

							<div className="space-y-2">
								<label
									htmlFor="password"
									className="block font-medium text-(--color-ink) text-sm"
								>
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									value={formData.password}
									onChange={handleChange}
									className="w-full rounded-lg border border-mist bg-white px-4 py-3 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
									placeholder="Enter password"
								/>
							</div>

							{error && (
								<motion.p
									variants={fadeUp}
									transition={defaultTransition}
									role="alert"
									className="text-center text-(--color-destructive) text-sm"
								>
									{error}
								</motion.p>
							)}

							<motion.div variants={staggerItem} transition={defaultTransition}>
								<Button
									type="submit"
									className="w-full"
									size="lg"
									disabled={isLoading}
									variant="brand"
								>
									{isLoading ? "Signing in..." : "Sign In"}
								</Button>
							</motion.div>
						</motion.fieldset>
					</form>

					{/* placeholder */}
					<motion.div
						variants={staggerItem}
						transition={defaultTransition}
						className="text-center text-mist text-sm"
					>
						<p>Demo: john@example.com / password123</p>
					</motion.div>
				</motion.div>
			</AuthCard>
		</div>
	);
};
