import { Minus, Plus, Scan } from "lucide-react";
import {
	type ReactNode,
	type PointerEvent as ReactPointerEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type PreviewSize = {
	width: number;
	height: number;
};

type PreviewPoint = {
	x: number;
	y: number;
};

type PreviewView = {
	zoom: number;
	pan: PreviewPoint;
};

type DragState = {
	pointerId: number;
	startX: number;
	startY: number;
	originPan: PreviewPoint;
};

export type ComponentPreviewCanvasProps = {
	children: ReactNode;
	/** Lebar artboard dalam pixel. Default 1280. */
	contentWidth?: number;
	/** Class tambahan untuk wrapper, misalnya untuk mengatur tinggi. */
	className?: string;
	/** Jarak antara artboard dan tepi kanvas saat fit. Default 48. */
	fitPadding?: number;
	/** Batas zoom paling kecil. Default 0.1. */
	minZoom?: number;
	/** Batas zoom paling besar. Default 3. */
	maxZoom?: number;
	/** Besar zoom per klik tombol +/-. Default 0.1. */
	zoomStep?: number;
	/** Zoom maksimal saat fit. Default 1 (fit tidak memperbesar konten). */
	fitMaxZoom?: number;
	/** Tampilkan background kotak-kotak. Default true. */
	showGrid?: boolean;
	/** Ukuran kotak grid dalam pixel. Default 24. */
	gridSize?: number;
	/** Izinkan interaksi di dalam konten preview. Default false. */
	interactive?: boolean;
};

const MIN_VISIBLE_CONTENT = 64;

function clampValue(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

function clampPan(
	pan: PreviewPoint,
	zoom: number,
	viewport: PreviewSize,
	content: PreviewSize,
): PreviewPoint {
	const scaledWidth = content.width * zoom;
	const scaledHeight = content.height * zoom;

	return {
		x: clampValue(
			pan.x,
			MIN_VISIBLE_CONTENT - scaledWidth,
			viewport.width - MIN_VISIBLE_CONTENT,
		),
		y: clampValue(
			pan.y,
			MIN_VISIBLE_CONTENT - scaledHeight,
			viewport.height - MIN_VISIBLE_CONTENT,
		),
	};
}

export function ComponentPreviewCanvas({
	children,
	contentWidth = 1280,
	className,
	fitPadding = 48,
	minZoom = 0.1,
	maxZoom = 3,
	zoomStep = 0.1,
	fitMaxZoom = 1,
	showGrid = true,
	gridSize = 24,
	interactive = false,
}: ComponentPreviewCanvasProps) {
	const viewportRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const dragRef = useRef<DragState | null>(null);
	const panFrameRef = useRef(0);
	const pendingPanRef = useRef<PreviewPoint | null>(null);
	const isFitModeRef = useRef(true);

	const [view, setView] = useState<PreviewView>({
		zoom: 1,
		pan: { x: 0, y: 0 },
	});
	const [isPanning, setIsPanning] = useState(false);
	const [isReady, setIsReady] = useState(false);

	const fitToViewport = useCallback(() => {
		const viewport = viewportRef.current;
		const content = contentRef.current;
		if (!viewport || !content) return;

		const viewportWidth = viewport.clientWidth;
		const viewportHeight = viewport.clientHeight;
		const contentWidthValue = content.offsetWidth;
		const contentHeightValue = content.offsetHeight;

		if (
			!viewportWidth ||
			!viewportHeight ||
			!contentWidthValue ||
			!contentHeightValue
		) {
			return;
		}

		const availableWidth = Math.max(viewportWidth - fitPadding * 2, 1);
		const availableHeight = Math.max(viewportHeight - fitPadding * 2, 1);

		const nextZoom = clampValue(
			Math.min(
				availableWidth / contentWidthValue,
				availableHeight / contentHeightValue,
				fitMaxZoom,
			),
			minZoom,
			maxZoom,
		);

		setView({
			zoom: nextZoom,
			pan: {
				x: (viewportWidth - contentWidthValue * nextZoom) / 2,
				y: (viewportHeight - contentHeightValue * nextZoom) / 2,
			},
		});
		isFitModeRef.current = true;
		setIsReady(true);
	}, [fitMaxZoom, fitPadding, maxZoom, minZoom]);

	const zoomBy = useCallback(
		(delta: number) => {
			const viewport = viewportRef.current;
			const content = contentRef.current;
			if (!viewport || !content) return;

			const viewportSize: PreviewSize = {
				width: viewport.clientWidth,
				height: viewport.clientHeight,
			};
			const contentSize: PreviewSize = {
				width: content.offsetWidth,
				height: content.offsetHeight,
			};

			setView((current) => {
				const nextZoom = clampValue(current.zoom + delta, minZoom, maxZoom);
				if (nextZoom === current.zoom) return current;

				const ratio = nextZoom / current.zoom;
				const anchorX = viewportSize.width / 2;
				const anchorY = viewportSize.height / 2;

				return {
					zoom: nextZoom,
					pan: clampPan(
						{
							x: anchorX - (anchorX - current.pan.x) * ratio,
							y: anchorY - (anchorY - current.pan.y) * ratio,
						},
						nextZoom,
						viewportSize,
						contentSize,
					),
				};
			});

			isFitModeRef.current = false;
		},
		[maxZoom, minZoom],
	);

	const flushPan = useCallback(() => {
		panFrameRef.current = 0;

		const pendingPan = pendingPanRef.current;
		pendingPanRef.current = null;
		if (!pendingPan) return;

		const viewport = viewportRef.current;
		const content = contentRef.current;
		if (!viewport || !content) return;

		const viewportSize: PreviewSize = {
			width: viewport.clientWidth,
			height: viewport.clientHeight,
		};
		const contentSize: PreviewSize = {
			width: content.offsetWidth,
			height: content.offsetHeight,
		};

		setView((current) => ({
			...current,
			pan: clampPan(pendingPan, current.zoom, viewportSize, contentSize),
		}));
	}, []);

	const schedulePan = useCallback(
		(pan: PreviewPoint) => {
			pendingPanRef.current = pan;
			if (panFrameRef.current) return;

			panFrameRef.current = requestAnimationFrame(flushPan);
		},
		[flushPan],
	);

	useEffect(() => {
		const viewport = viewportRef.current;
		const content = contentRef.current;
		if (!viewport || !content) return;

		let frame = 0;

		const handleResize = () => {
			if (!isFitModeRef.current) return;

			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => fitToViewport());
		};

		const observer = new ResizeObserver(handleResize);
		observer.observe(viewport);
		observer.observe(content);

		fitToViewport();

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, [fitToViewport]);

	useEffect(() => {
		return () => {
			if (panFrameRef.current) cancelAnimationFrame(panFrameRef.current);
		};
	}, []);

	const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;

		dragRef.current = null;
		setIsPanning(false);

		if (panFrameRef.current) {
			cancelAnimationFrame(panFrameRef.current);
			panFrameRef.current = 0;
		}
		flushPan();

		const viewport = viewportRef.current;
		if (viewport?.hasPointerCapture(event.pointerId)) {
			viewport.releasePointerCapture(event.pointerId);
		}
	};

	const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (!event.isPrimary) return;
		if (event.pointerType === "mouse" && event.button !== 0) return;

		dragRef.current = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			originPan: view.pan,
		};

		event.currentTarget.setPointerCapture(event.pointerId);
		setIsPanning(true);
	};

	const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;

		schedulePan({
			x: drag.originPan.x + event.clientX - drag.startX,
			y: drag.originPan.y + event.clientY - drag.startY,
		});
	};

	const zoomPercent = Math.round(view.zoom * 100);

	return (
		<div
			className={cn(
				"relative h-150 w-full overflow-hidden bg-muted/40 ring-1 ring-border",
				className,
			)}
		>
			{showGrid && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-0 opacity-60"
					style={{
						backgroundImage:
							"linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
						backgroundSize: `${gridSize}px ${gridSize}px`,
					}}
				/>
			)}

			<div
				ref={viewportRef}
				role="region"
				aria-label="Component preview canvas"
				className={cn(
					"absolute inset-0 touch-none select-none overflow-hidden",
					isPanning ? "cursor-grabbing" : "cursor-grab",
				)}
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onPointerUp={endDrag}
				onPointerCancel={endDrag}
				onLostPointerCapture={endDrag}
			>
				<div
					ref={contentRef}
					className={cn(
						"absolute top-0 left-0 origin-top-left transition-opacity duration-200 will-change-transform",
						isReady ? "opacity-100" : "opacity-0",
						!interactive && "pointer-events-none",
					)}
					style={{
						width: contentWidth,
						transform: `translate3d(${view.pan.x}px, ${view.pan.y}px, 0) scale(${view.zoom})`,
					}}
				>
					<div className="bg-background shadow-xl ring-1 ring-border">
						{children}
					</div>
				</div>
			</div>

			<TooltipProvider>
				<div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 border bg-popover/90 p-1 shadow-lg backdrop-blur">
					<Tooltip>
						<TooltipTrigger
							render={
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									aria-label="Zoom out"
									disabled={view.zoom <= minZoom}
									onClick={() => zoomBy(-zoomStep)}
								>
									<Minus />
								</Button>
							}
						/>
						<TooltipContent>Zoom out</TooltipContent>
					</Tooltip>

					<span
						aria-live="polite"
						className="min-w-10 text-center font-semibold text-[11px] tabular-nums tracking-wider"
					>
						{zoomPercent}%
					</span>

					<Tooltip>
						<TooltipTrigger
							render={
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									aria-label="Zoom in"
									disabled={view.zoom >= maxZoom}
									onClick={() => zoomBy(zoomStep)}
								>
									<Plus />
								</Button>
							}
						/>
						<TooltipContent>Zoom in</TooltipContent>
					</Tooltip>

					<span aria-hidden="true" className="mx-0.5 h-5 w-px bg-border" />

					<Tooltip>
						<TooltipTrigger
							render={
								<Button
									type="button"
									variant="ghost"
									size="icon-sm"
									aria-label="Fit to view"
									onClick={fitToViewport}
								>
									<Scan />
								</Button>
							}
						/>
						<TooltipContent>Fit to view</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		</div>
	);
}
