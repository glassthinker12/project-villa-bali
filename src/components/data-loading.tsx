import { Loader2Icon } from "lucide-react";

export function DataLoading() {
	return (
		<div className="flex min-h-56 flex-col items-center justify-center gap-3 border p-6">
			<Loader2Icon className="size-8 animate-spin text-muted-foreground" />
			<p className="text-muted-foreground text-sm">Loading...</p>
		</div>
	);
}
