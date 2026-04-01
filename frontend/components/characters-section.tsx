"use client";

interface Character {
	id: number;
	name: string;
	role: string;
	voiceActor: string;
	voiceLanguage: string;
	image: string;
}

interface CharactersSectionProps {
	characters: Character[];
}

export default function CharactersSection({
	characters,
}: CharactersSectionProps) {
	return (
		<section className="mb-12">
			<h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
				<span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500" />
				Characters & Voice Actors
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{characters.map((character) => (
					<div
						key={character.id}
						className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-colors duration-300 flex gap-4"
					>
						<img
							src={character.image}
							alt={character.name}
							className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
						/>
						<div className="flex-1">
							<h3 className="text-white font-bold text-lg">{character.name}</h3>
							<p className="text-gray-400 text-sm mb-3">{character.role}</p>

							<div className="border-t border-gray-700 pt-3">
								<p className="text-gray-400 text-xs mb-1">Voice Actor</p>
								<p className="text-white text-sm font-semibold">
									{character.voiceActor}
								</p>
								<p className="text-gray-400 text-xs">
									{character.voiceLanguage}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
