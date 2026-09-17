import { cn } from "#/lib/utils";

export const Eyebrow = ({
	text,
	className,
}: {
	text: string;
	className?: string;
}) => (
	<p
		className={cn(
			"whitespace-nowrap font-subheading text-base text-brand-soft leading-6.5",
			className,
		)}
	>
		{text}
	</p>
);
