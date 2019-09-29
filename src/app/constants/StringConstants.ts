export const GENRE_PLACEHOLDER = 'Select Genre';
export const SORT_BY_OPTIONS: {option: string, id: string}[] = [
  {option: 'Popularity Descending', id: 'popularity.desc'},
  {option: 'Popularity Ascending', id: 'popularity.asc'},
  {option: 'Rating Ascending', id: 'vote_average.asc'},
  {option: 'Rating Descending', id: 'vote_average.desc'},
  {option: 'Title (A-Z)', id:  'original_title.asc'},
  {option: 'Title (Z-A)', id: 'original_title.desc'}
]
export const MOVIEAPI = {
  "PopularMovies": {
      "category": "movie",
      "subcategory": "popular"
  },
  "TopRatedMovies": {
    "category": "movie",
    "subcategory": "top_rated"
  },
  "NowPlayingMovies": {
    "category": "movie",
    "subcategory": "now_playing"
  },
  "UpcomingMovies": {
    "category": "movie",
    "subcategory": "upcoming"
  },
};

