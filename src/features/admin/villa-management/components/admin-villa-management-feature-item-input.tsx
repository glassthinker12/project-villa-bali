import { X } from "lucide-react";

import { IconPicker } from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FeatureItemInputProps = {
	value: {
		icon: string;
		label: string;
	};
	onChange: (value: { icon: string; label: string }) => void;
	onRemove: () => void;
	labelError?: string;
};

export function AdminVillaManagementFeatureItemInput({
	value,
	onChange,
	onRemove,
	labelError,
}: FeatureItemInputProps) {
	return (
		<div className="space-y-1">
			<div className="flex items-center gap-2">
				<IconPicker
					value={value.icon}
					onChange={(icon) => onChange({ ...value, icon })}
				/>
				<Input
					value={value.label}
					onChange={(e) => onChange({ ...value, label: e.target.value })}
					placeholder="Feature label"
					className="flex-1"
					aria-invalid={Boolean(labelError) || undefined}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon-sm"
					onClick={onRemove}
					className="shrink-0"
				>
					<X className="size-4" />
				</Button>
			</div>
			{labelError && <FieldError errors={[{ message: labelError }]} />}
		</div>
	);
}
