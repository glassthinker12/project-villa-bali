import type React from "react";

type DataErrorProps = {
	error: string;
	children?: React.ReactNode;
};

export function DataError({ error, children }: DataErrorProps) {
	return (
		<div className="flex min-h-56 flex-col items-center justify-center gap-3 border p-6">
			<p className="text-destructive text-sm">{error}</p>
			{children}
		</div>
	);
}
