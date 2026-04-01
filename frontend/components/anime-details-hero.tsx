"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, Plus, Share2 } from "lucide-react";

interface AnimeDetailsHeroProps {
	anime: any;
	isAdded: boolean;
	setIsAdded: (added: boolean) => void;
}

export default function AnimeDetailsHero({
	anime,
	isAdded,
	setIsAdded,
}: AnimeDetailsHeroProps) {
	return (
		<div className="relative h-screen min-h-[600px] overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10" />

			<img
				src={anime.image}
				alt={anime.title}
				className="absolute inset-0 w-full h-full object-cover"
			/>

			<div className="relative z-20 h-full flex items-center container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
					<div className="flex justify-center md:justify-start">
						<div className="relative group max-w-sm w-full">
							<div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
							<img
								src={anime.image}
								alt={anime.title}
								className="relative w-full rounded-lg shadow-2xl object-cover aspect-[3/4]"
							/>
							<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
								<Link href={`/watch/${anime.id}`}>
									<button className="bg-purple-600 hover:bg-purple-700 rounded-full p-4 transform transition-transform hover:scale-110">
										<Play className="w-8 h-8 text-white fill-white" />
									</button>
								</Link>
							</div>
						</div>
					</div>

					<div className="flex flex-col justify-center text-white">
						<div className="mb-4">
							<Link href="/">
								<span className="text-gray-400 hover:text-purple-400 transition-colors">
									Home
								</span>
							</Link>
							<span className="text-gray-400 mx-2">›</span>
							<span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer">
								TV
							</span>
							<span className="text-gray-400 mx-2">›</span>
							<span className="text-purple-400">{anime.title}</span>
						</div>

						<h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
							{anime.title}
						</h1>

						<div className="flex flex-wrap gap-3 mb-6">
							<div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-lg">
								<span className="text-yellow-400 font-semibold">
									{anime.rating}
								</span>
								<span className="text-gray-400 text-sm">HD</span>
							</div>
							<div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-lg text-sm">
								{anime.episodes} Episodes
							</div>
							<div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-lg text-sm">
								TV
							</div>
							<div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-lg text-sm">
								{anime.duration}
							</div>
						</div>

						<p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-xl">
							{anime.summary}
						</p>

						<div className="flex flex-wrap gap-4">
							<Link href={`/watch/${anime.id}`}>
								<button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-all transform hover:scale-105">
									<Play className="w-5 h-5 fill-current" />
									Watch Now
								</button>
							</Link>

							<button
								onClick={() => setIsAdded(!isAdded)}
								className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
							>
								<Plus className="w-5 h-5" />
								{isAdded ? "Added to List" : "Add to List"}
							</button>

							<button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
								<Share2 className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
