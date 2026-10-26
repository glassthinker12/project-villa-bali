import { useRouter } from "@tanstack/react-router";
import { LogOutIcon } from "lucide-react";
import { logoutFn } from "#/features/auth/servers";
import { Button } from "./ui/button";

export const AdminLogoutButton = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await logoutFn();
			await router.invalidate();
			router.navigate({ to: "/login" });
		} catch (err) {
			console.log({ err });
		}
	};

	return (
		<Button variant="ghost" size="sm" onClick={handleLogout}>
			<LogOutIcon />
			<span className="hidden md:inline">Logout</span>
		</Button>
	);
};
