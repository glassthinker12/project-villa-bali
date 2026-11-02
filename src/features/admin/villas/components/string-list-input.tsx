import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";

interface StringListInputProps {
	id: string;
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
	ariaInvalid?: boolean;
}

export const StringListInput = ({
	id,
	value,
	onChange,
	placeholder,
	ariaInvalid,
}: StringListInputProps) => {
	const [draft, setDraft] = useState("");

	const addItem = () => {
		const next = draft.trim();

		if (!next || value.includes(next)) {
			setDraft("");
			return;
		}

		onChange([...value, next]);
		setDraft("");
	};

	const removeItem = (item: string) => {
		onChange(value.filter((current) => current !== item));
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<Input
					id={id}
					value={draft}
					aria-invalid={ariaInvalid}
					placeholder={placeholder}
					autoComplete="off"
					onChange={(event) => setDraft(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							addItem();
						}
					}}
				/>
				<Button
					type="button"
					variant="outline"
					size="icon"
					onClick={addItem}
					disabled={!draft.trim()}
					aria-label="Add item"
				>
					<Plus className="size-4" />
				</Button>
			</div>

			{value.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{value.map((item) => (
						<span
							key={item}
							className="inline-flex items-center gap-1.5 rounded-full border bg-muted px-3 py-1 text-xs"
						>
							{item}
							<button
								type="button"
								onClick={() => removeItem(item)}
								aria-label={`Remove ${item}`}
								className="text-muted-foreground transition-colors hover:text-foreground"
							>
								<X className="size-3" />
							</button>
						</span>
					))}
				</div>
			)}
		</div>
	);
};
