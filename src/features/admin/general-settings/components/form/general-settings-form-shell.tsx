import { AlertCircleIcon } from "lucide-react";
import type React from "react";

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

type GeneralSettingsFormShellProps = {
	formId: string;
	title: string;
	description: string;
	hasChanges: boolean;
	isSaving: boolean;
	saveError: string | null;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onCancel: () => void;
	children: React.ReactNode;
};

export function GeneralSettingsFormShell({
	formId,
	title,
	description,
	hasChanges,
	isSaving,
	saveError,
	onSubmit,
	onCancel,
	children,
}: GeneralSettingsFormShellProps) {
	return (
		<Card className="max-w-2xl">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{saveError && (
					<Alert variant="destructive">
						<AlertCircleIcon />
						<AlertTitle>{saveError}</AlertTitle>
					</Alert>
				)}
				<form id={formId} onSubmit={onSubmit} noValidate>
					{children}
				</form>
			</CardContent>
			<CardFooter className="justify-end gap-2">
				<Button
					type="button"
					variant="outline"
					disabled={!hasChanges || isSaving}
					onClick={onCancel}
				>
					Cancel
				</Button>
				<Button type="submit" form={formId} disabled={!hasChanges || isSaving}>
					{isSaving ? "Saving..." : "Save Changes"}
				</Button>
			</CardFooter>
		</Card>
	);
}
