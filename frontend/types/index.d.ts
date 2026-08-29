export interface AnimeType {
	id: number;
	title: string;
	slug: string;
	synopsis: string;
	images: Array<string>;
	status: string;
	year: number;
	rating: number;
	genres: GenreType[];
	seasons_count: number;
	episodes_count: number;
	created_at: Date;
	updated: Date;
}

export interface GenreType {
	id: number;
	name: string;
}

export interface SeasonType {
	id: number;
	anime_id: AnimeType[];
	number: number;
	title: string;
	description: string;
	image: string;
	episodes_count: number;
	episodes: Array;
	created_at: Date;
	update_at: Date;
}

export interface EpisodeType {
	id: number;
  season_id: SeasonType[];
  number: number;
  title: string;
  description: string;
  duration_seconds: number;
  published_date: Date;
  thumbnail: string;
  sources: Array;
  created_at: Date;
  update_at: Date;
}

export interface SourceResourceType {
  id: number;
  type: string;
  episode_id: EpisodeType[];
  url: string;
  quality: string;
  lang: string;
  is_primary: boolean
  created_at: Date;
  update_at: Date;
}
