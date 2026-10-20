import { createFileRoute, useHydrated } from "@tanstack/react-router";
import { LoginForm } from "#/features/auth/components/LoginForm";

export const Route = createFileRoute("/_auth/login")({
	validateSearch: (search: Record<string, unknown>): { redirect?: string } => {
		return {
			redirect:
				typeof search.redirect === "string" ? search.redirect : undefined,
		};
	},
	component: LoginPage,
});

function LoginPage() {
	const hydrated = useHydrated();

	if (!hydrated) {
		return <div />;
	}

	return <LoginForm />;
}
