"use client";

interface MoreSeasonsProps {
	anime: any;
}

export default function MoreSeasons({ anime }: MoreSeasonsProps) {
	if (!anime.seasons || anime.seasons.length <= 1) {
		return null;
	}

	return (
		<section className="mb-12">
			<h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
				<span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500" />
				More Seasons
			</h2>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{anime.seasons.map((season: any) => (
					<div
						key={season.id}
						className="group cursor-pointer relative overflow-hidden rounded-lg bg-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
					>
						<img
							src={season.image}
							alt={season.title}
							className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
							<h3 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors">
								{season.title}
							</h3>
							<p className="text-gray-400 text-xs">
								{season.episodes} Episodes
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
