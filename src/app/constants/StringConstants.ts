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
  "Popular_Movies": {
      "category": "movie",
      "apiParam": "popular"
  },
  "Top_Rated_Movies": {
    "category": "movie",
    "apiParam": "top_rated"
  },
  "Now_Playing_Movies": {
    "category": "movie",
    "apiParam": "now_playing"
  },
  "Upcoming_Movies": {
    "category": "movie",
    "apiParam": "upcoming"
  },
};

