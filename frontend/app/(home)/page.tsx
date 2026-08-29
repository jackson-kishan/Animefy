"use server";

import BannerSlider from "@/components/banner-slider";
import AnimeGrid from "@/components/anime-grid";
import { getAnimes } from "@/lib/api";
import Link from "next/link";

export default async function HomePage() {
	let data = await getAnimes();

	// console.log(data);

	return (
		<div className="min-h-screen bg-gray-900">
			<BannerSlider />
			<AnimeGrid animeList={data.data} />

			{/* {data.data.map((anime: { slug: string }) => (
				<Link href={`/${anime.slug}`}>Naruto</Link>
			))} */}
		</div>
	);
}
