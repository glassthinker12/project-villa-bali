import { Search, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getIcon, ICON_LIST, type IconName } from "@/lib/icons";

type IconPickerProps = {
	value?: string;
	onChange?: (iconName: string) => void;
};

export function IconPicker({ value, onChange }: IconPickerProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");

	const SelectedIcon = value ? getIcon(value) : null;

	const filteredIcons = ICON_LIST.filter((item) =>
		item.label.toLowerCase().includes(search.toLowerCase()),
	);

	const handleSelect = (iconName: IconName) => {
		onChange?.(iconName);
		setOpen(false);
		setSearch("");
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				render={<Button type="button" variant="outline" size="icon" />}
				className="shrink-0"
			>
				{SelectedIcon ? (
					<SelectedIcon className="size-4" />
				) : (
					<Search className="size-4" />
				)}
			</PopoverTrigger>

			<PopoverContent className="w-80">
				<PopoverTitle>Select Icon</PopoverTitle>

				<div className="relative">
					<Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search icons..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="pr-9 pl-9"
					/>
					{search && (
						<Button
							type="button"
							variant="ghost"
							size="icon-xs"
							onClick={() => setSearch("")}
							className="absolute top-1/2 right-2 -translate-y-1/2"
						>
							<X className="size-3" />
						</Button>
					)}
				</div>

				<div className="no-scrollbar max-h-75 overflow-y-auto">
					<div className="grid grid-cols-6 gap-2">
						{filteredIcons.map((item) => {
							const Icon = item.icon;
							const isSelected = value === item.name;
							return (
								<Tooltip key={item.name}>
									<TooltipTrigger
										render={
											<Button
												type="button"
												variant={isSelected ? "secondary" : "outline"}
												size="icon"
												onClick={() => handleSelect(item.name)}
												className="h-10 w-full"
											>
												<Icon className="size-4" />
											</Button>
										}
									/>
									<TooltipContent>{item.label}</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
					{filteredIcons.length === 0 && (
						<p className="py-8 text-center text-muted-foreground text-sm">
							No icons found
						</p>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
