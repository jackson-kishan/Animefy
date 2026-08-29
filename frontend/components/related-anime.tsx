"use client";

import Link from "next/link";
import { Star, Plus } from "lucide-react";

interface RelatedAnimeItem {
	id: number;
	title: string;
	type: string;
	image: string;
	rating: number;
}

interface RelatedAnimeProps {
	related: RelatedAnimeItem[];
}

export default function RelatedAnime({ related }: RelatedAnimeProps) {
	return (
		<section className="py-12 bg-gray-800/30 border-t border-gray-700">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
					<span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500" />
					Related Anime
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{related.map((anime) => (
						<Link key={anime.id} href={`/anime/${anime.id}`}>
							<div className="group cursor-pointer bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
								<div className="relative overflow-hidden h-48">
									<img
										src={anime.image}
										alt={anime.title}
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
										<h3 className="text-white font-bold text-lg group-hover:text-purple-400 transition-colors">
											{anime.title}
										</h3>
										<p className="text-gray-400 text-sm">{anime.type}</p>
									</div>

									<div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
										<Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
										<span className="text-white text-xs font-semibold">
											{anime.rating}
										</span>
									</div>
								</div>

								<div className="p-4 flex items-center justify-between">
									<div className="text-sm">
										<span className="text-gray-400">
											{anime.type === "TV" ? "223" : "1"}
										</span>
										<span className="text-gray-600 mx-1">•</span>
										<span className="text-gray-400">{anime.type}</span>
									</div>
									<button className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg transition-colors">
										<Plus className="w-4 h-4 text-white" />
									</button>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
