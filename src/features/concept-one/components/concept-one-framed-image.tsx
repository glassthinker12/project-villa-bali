import { cn } from "#/lib/utils";

export const FramedImage = ({
	src,
	alt,
	className,
	frameClassName,
}: {
	src: string;
	alt: string;
	className?: string;
	frameClassName?: string;
}) => (
	<div
		className={cn(
			"relative mx-auto aspect-343/440 w-full overflow-hidden",
			className,
		)}
	>
		<div className="absolute inset-[0_1.8%_1.64%_0]">
			<img
				alt={alt}
				src={src}
				loading="lazy"
				decoding="async"
				className="size-full object-cover"
			/>
		</div>
		<div
			className={cn(
				"absolute inset-[1.64%_0_0_1.8%] border-[1.5px] border-taupe",
				frameClassName,
			)}
		/>
	</div>
);
