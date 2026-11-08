import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AdminVillaManagementFeatureItemInput } from "./admin-villa-management-feature-item-input";

type FeatureItemErrors = Array<{ label?: { message?: string } } | undefined>;

type FeatureListManagerProps = {
	value: Array<{ icon: string; label: string }>;
	onChange: (value: Array<{ icon: string; label: string }>) => void;
	title: string;
	errors?: FeatureItemErrors;
};

export function AdminVillaManagementFeatureListManager({
	value,
	onChange,
	title,
	errors,
}: FeatureListManagerProps) {
	const handleAdd = () => {
		onChange([...value, { icon: "", label: "" }]);
	};

	const handleRemove = (index: number) => {
		onChange(value.filter((_, i) => i !== index));
	};

	const handleChange = (
		index: number,
		item: { icon: string; label: string },
	) => {
		const newValue = [...value];
		newValue[index] = item;
		onChange(newValue);
	};

	return (
		<div className="space-y-3">
			<h4 className="font-medium text-sm">{title}</h4>
			<div className="space-y-2">
				{value.map((item, index) => (
					<AdminVillaManagementFeatureItemInput
						key={index}
						value={item}
						onChange={(newItem) => handleChange(index, newItem)}
						onRemove={() => handleRemove(index)}
						labelError={errors?.[index]?.label?.message}
					/>
				))}
				{value.length === 0 && (
					<p className="text-muted-foreground text-sm">No items added yet</p>
				)}
			</div>
			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={handleAdd}
				className="w-full"
			>
				<Plus className="size-4" />
				Add {title}
			</Button>
		</div>
	);
}
