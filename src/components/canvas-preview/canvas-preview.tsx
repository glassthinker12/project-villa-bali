import { Maximize2, Minus, Plus } from "lucide-react";
import {
	type MouseEvent,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";

export type CanvasPreviewProps = {
	children: ReactNode;
	/** Original design width used for scaling (px). */
	designWidth?: number;
	/** Original design height used for centering (px). If not provided, measured from content. */
	designHeight?: number;
	/** Canvas container height. */
	height?: number | string;
	/** Minimum scale factor. */
	minScale?: number;
	/** Maximum scale factor. */
	maxScale?: number;
	/** Scale step for zoom buttons. */
	scaleStep?: number;
	/** Auto fit to container on mount and resize. */
	fitOnMount?: boolean;
	/** Enable mouse drag to pan when zoomed. */
	enablePan?: boolean;
	/** Show zoom controls. */
	enableZoomControls?: boolean;
	/** Pointer events for inner content. */
	pointerEvents?: "none" | "auto";
	/** Show zoom percentage. */
	showPercentage?: boolean;
	/** Extra class for container. */
	className?: string;
	/** Extra class for controls bar. */
	controlsClassName?: string;
	/** Extra class for inner canvas. */
	innerClassName?: string;
};

const DEFAULT_DESIGN_WIDTH = 1440;
const DEFAULT_HEIGHT = 420;
const DEFAULT_MIN_SCALE = 0.25;
const DEFAULT_MAX_SCALE = 2;
const DEFAULT_SCALE_STEP = 0.1;
const DEFAULT_FIT_PADDING = 16;

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

export const CanvasPreview = ({
	children,
	designWidth = DEFAULT_DESIGN_WIDTH,
	designHeight,
	height = DEFAULT_HEIGHT,
	minScale = DEFAULT_MIN_SCALE,
	maxScale = DEFAULT_MAX_SCALE,
	scaleStep = DEFAULT_SCALE_STEP,
	fitOnMount = true,
	enablePan = true,
	enableZoomControls = true,
	pointerEvents = "none",
	showPercentage = true,
	className,
	controlsClassName,
	innerClassName,
}: CanvasPreviewProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);

	const [scale, setScale] = useState(1);
	const [translateX, setTranslateX] = useState(0);
	const [translateY, setTranslateY] = useState(0);
	const [fitScale, setFitScale] = useState(1);
	const [isDragging, setIsDragging] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const dragStartRef = useRef({ x: 0, y: 0, translateX: 0, translateY: 0 });

	const calculateFitScale = useCallback(() => {
		const container = containerRef.current;
		if (!container) return 1;

		const containerWidth = container.clientWidth;
		if (containerWidth <= 0) return 1;

		const availableWidth = Math.max(0, containerWidth - DEFAULT_FIT_PADDING);
		const nextFitScale = availableWidth / designWidth;
		const clampedFitScale = clamp(nextFitScale, minScale, maxScale);

		setFitScale(clampedFitScale);
		return clampedFitScale;
	}, [designWidth, maxScale, minScale]);

	const fitToView = useCallback(() => {
		const container = containerRef.current;
		const inner = innerRef.current;
		if (!container) return;

		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;
		if (containerWidth <= 0 || containerHeight <= 0) return;

		const availableWidth = Math.max(0, containerWidth - DEFAULT_FIT_PADDING);
		const scaleW = availableWidth / designWidth;

		const effectiveHeight =
			designHeight ?? contentHeight ?? inner?.scrollHeight ?? 0;
		const scaleH =
			effectiveHeight > 0 ? containerHeight / effectiveHeight : scaleW;

		const nextFitScale = clamp(Math.min(scaleW, scaleH), minScale, maxScale);

		setFitScale(nextFitScale);
		setScale(nextFitScale);

		const scaledWidth = designWidth * nextFitScale;
		const scaledHeight =
			effectiveHeight > 0 ? effectiveHeight * nextFitScale : 0;

		setTranslateX(Math.max(0, (containerWidth - scaledWidth) / 2));
		setTranslateY(
			scaledHeight > 0 ? Math.max(0, (containerHeight - scaledHeight) / 2) : 0,
		);
	}, [
		calculateFitScale,
		contentHeight,
		designHeight,
		designWidth,
		maxScale,
		minScale,
	]);

	const zoomIn = useCallback(() => {
		setScale((current) => clamp(current + scaleStep, minScale, maxScale));
	}, [maxScale, minScale, scaleStep]);

	const zoomOut = useCallback(() => {
		setScale((current) => clamp(current - scaleStep, minScale, maxScale));
	}, [maxScale, minScale, scaleStep]);

	const handleMouseDown = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			if (!enablePan) return;
			if (event.button !== 0) return;

			setIsDragging(true);
			dragStartRef.current = {
				x: event.clientX,
				y: event.clientY,
				translateX,
				translateY,
			};
			event.preventDefault();
		},
		[enablePan, translateX, translateY],
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent<HTMLDivElement>) => {
			if (!isDragging) return;

			const deltaX = event.clientX - dragStartRef.current.x;
			const deltaY = event.clientY - dragStartRef.current.y;

			setTranslateX(dragStartRef.current.translateX + deltaX);
			setTranslateY(dragStartRef.current.translateY + deltaY);
		},
		[isDragging],
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	useEffect(() => {
		const inner = innerRef.current;
		if (!inner) return;

		const measure = () => {
			setContentHeight(inner.scrollHeight);
		};

		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(inner);
		return () => observer.disconnect();
	}, [children]);

	useEffect(() => {
		if (!fitOnMount) return;

		const frame = requestAnimationFrame(() => {
			fitToView();
		});

		return () => cancelAnimationFrame(frame);
	}, [fitOnMount, fitToView, contentHeight]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new ResizeObserver(() => {
			if (!fitOnMount) return;
			fitToView();
		});

		observer.observe(container);
		return () => observer.disconnect();
	}, [fitOnMount, fitToView]);

	useEffect(() => {
		const handleWindowMouseUp = () => setIsDragging(false);
		window.addEventListener("mouseup", handleWindowMouseUp);
		return () => window.removeEventListener("mouseup", handleWindowMouseUp);
	}, []);

	const percentage = Math.round(scale * 100);

	return (
		<div
			ref={containerRef}
			className={cn(
				"relative w-full min-w-0 max-w-full overflow-hidden border border-border/60 shadow-sm [contain:layout_paint_inline-size]",
				"bg-[#f8f9fa] bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.08)_1px,transparent_0)] bg-[size:16px_16px]",
				"dark:bg-[#0f0f0f] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)]",
				className,
			)}
			style={{ height }}
		>
			{enableZoomControls && (
				<div
					className={cn(
						"absolute left-2 top-2 z-20 flex items-center gap-1 rounded-md border bg-background/90 px-1 py-0.5 shadow-sm backdrop-blur",
						controlsClassName,
					)}
				>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="size-7"
						onClick={zoomOut}
						disabled={scale <= minScale}
						aria-label="Zoom out"
					>
						<Minus className="size-4" />
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="h-7 px-2 text-xs"
						onClick={fitToView}
						aria-label="Fit to view"
					>
						<Maximize2 className="mr-1 size-3.5" />
						Fit
					</Button>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="size-7"
						onClick={zoomIn}
						disabled={scale >= maxScale}
						aria-label="Zoom in"
					>
						<Plus className="size-4" />
					</Button>
					{showPercentage && (
						<span className="ml-1 text-xs text-muted-foreground">
							{percentage}%
						</span>
					)}
				</div>
			)}
			<div
				className="relative h-full w-full"
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				style={{
					cursor:
						enablePan && isDragging
							? "grabbing"
							: enablePan
								? "grab"
								: "default",
					userSelect: "none",
					touchAction: "none",
				}}
			>
				<div
					ref={innerRef}
					style={{
						width: `${designWidth}px`,
						transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
						transformOrigin: "top left",
						pointerEvents,
						willChange: "transform",
						contain: "layout paint inline-size",
					}}
					className={cn(
						"select-none border border-border/40 bg-background shadow-sm",
						pointerEvents === "none" && "pointer-events-none",
						innerClassName,
					)}
				>
					{children}
				</div>
			</div>
		</div>
	);
};
