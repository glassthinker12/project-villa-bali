import type React from "react";

type DataEmptyProps = {
	children?: React.ReactNode;
};

export function DataEmpty({ children }: DataEmptyProps) {
	return (
		<div className="flex min-h-56 flex-col items-center justify-center gap-3 border p-6">
			<p className="text-sm">Data empty</p>
			{children}
		</div>
	);
}
