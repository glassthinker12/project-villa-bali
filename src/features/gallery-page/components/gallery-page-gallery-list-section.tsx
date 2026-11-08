"use client";

import {
	AnimatePresence,
	motion,
	useReducedMotion,
	type Variants,
} from "motion/react";
import { useMemo, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	GALLERY_CATEGORIES,
	type GalleryCategory,
} from "@/features/admin/galleries/utils/schemas";

import type { GalleryPageGalleryListSection as GalleryPageGalleryListSectionType } from "../types";

type GalleryPageGalleryListSectionProps = {
	data: GalleryPageGalleryListSectionType;
};

const GALLERY_ITEM_PATTERN = [
	"md:col-span-3",
	"md:col-span-6",
	"md:col-span-3",
	"md:col-span-6",
	"md:col-span-6",
];

export function GalleryPageGalleryListSection({
	data,
}: GalleryPageGalleryListSectionProps) {
	const [activeCategory, setActiveCategory] =
		useState<GalleryCategory>("Villas");
	const shouldReduceMotion = useReducedMotion();

	const filteredGalleries = useMemo(
		() => data.galleries.filter((item) => item.category === activeCategory),
		[data.galleries, activeCategory],
	);

	const containerVariants: Variants = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: shouldReduceMotion ? 0 : 0.05,
				staggerChildren: shouldReduceMotion ? 0 : 0.06,
			},
		},
		exit: {
			opacity: 0,
			transition: { duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" },
		},
	};

	const itemVariants: Variants = {
		hidden: shouldReduceMotion
			? { opacity: 0 }
			: { opacity: 0, scale: 0.97, y: 24 },
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? 0 : 0.5,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	return (
		<section className="relative flex w-full flex-col items-center bg-linear-to-b from-cream via-[#fafafa] to-[#f9f3ec] px-4 py-16 md:px-16 md:py-24">
			<div className="flex w-full max-w-6xl flex-col gap-8 md:gap-12">
				<Tabs
					value={activeCategory}
					onValueChange={(value) => setActiveCategory(value as GalleryCategory)}
					className="flex items-center justify-center"
				>
					<TabsList
						variant="line"
						className="mx-auto flex w-full max-w-full flex-wrap justify-center border-brand/50 border-b p-0"
					>
						{GALLERY_CATEGORIES.map((category) => (
							<TabsTrigger
								key={category}
								value={category}
								className="after:hidden hover:text-brand data-active:text-brand"
							>
								{category === activeCategory && (
									<motion.span
										layoutId="gallery-tab-indicator"
										className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand"
										transition={{
											type: "spring",
											stiffness: 500,
											damping: 40,
										}}
									/>
								)}
								<span className="relative z-10">{category}</span>
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>

				{filteredGalleries.length === 0 ? (
					<p className="border border-foreground/20 border-dashed py-20 text-center text-foreground/60">
						No galleries in this category yet.
					</p>
				) : (
					<AnimatePresence mode="wait" initial={false}>
						<motion.div
							key={activeCategory}
							variants={containerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.1 }}
							exit="exit"
							className="grid grid-cols-1 gap-4 md:grid-cols-12"
						>
							{filteredGalleries.map((item, index) => (
								<motion.div
									key={item.id}
									variants={itemVariants}
									className={`${GALLERY_ITEM_PATTERN[index % 5]} h-85.75 overflow-hidden rounded-lg md:h-78`}
								>
									<img
										src={item.imageUrl}
										alt={item.title}
										loading={index === 0 ? "eager" : "lazy"}
										decoding="async"
										draggable={false}
										className="h-full w-full object-cover"
									/>
								</motion.div>
							))}
						</motion.div>
					</AnimatePresence>
				)}
			</div>
		</section>
	);
}
