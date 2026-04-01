"use client";

interface AnimeDetailsInfoProps {
	anime: any;
}

export default function AnimeDetailsInfo({ anime }: AnimeDetailsInfoProps) {
	return (
		<div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700 mb-12">
			<h2 className="text-3xl font-bold text-white mb-6">About</h2>

			<p className="text-gray-300 text-base leading-relaxed mb-6">
				{anime.synopsis}
			</p>

			<div className="space-y-4">
				<div>
					<h3 className="text-white font-bold mb-2">Genres</h3>
					<div className="flex flex-wrap gap-2">
						{anime.genre.map((g: string) => (
							<span
								key={g}
								className="bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full text-sm"
							>
								{g}
							</span>
						))}
					</div>
				</div>

				<div>
					<h3 className="text-white font-bold mb-2">Studios</h3>
					<div className="flex flex-wrap gap-2">
						{anime.studios.map((studio: string) => (
							<span
								key={studio}
								className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm"
							>
								{studio}
							</span>
						))}
					</div>
				</div>

				<div>
					<h3 className="text-white font-bold mb-2">Producers</h3>
					<div className="flex flex-wrap gap-2">
						{anime.producers.slice(0, 4).map((producer: string) => (
							<span
								key={producer}
								className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm"
							>
								{producer}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
