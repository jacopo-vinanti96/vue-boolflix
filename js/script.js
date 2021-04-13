// Documentazione API TMDB:
// https://developers.themoviedb.org/3/search/search-companies

const app = new Vue ({
  el: '#app',
  data: {
    baseURL: 'https://api.themoviedb.org/3/search/',
    lang: 'it-IT',
    apiKey: 'afbb7def2542bc20b7d5bfd24baf9b6a',
    moviesQuery: [],
    tvSeriesQuery: [],
    TitleInput: '',
    moviePages: 0,
    tvPages: 0,
    flags: ['en', 'de', 'es', 'fr', 'it', 'pt'],
  },
  methods: {
    getMovies() {
      if ( this.TitleInput != '' ) {
        axios.get( this.baseURL + 'movie', {
          params: {
            api_key: this.apiKey,
            language: this.lang,
            query: this.TitleInput,
          }
        })
        .then( (arr) => {
          this.moviesQuery = arr.data.results;
          this.moviePages = arr.data.total_pages;
          console.log(this.moviePages);
          this.convertVoteAvg(this.moviesQuery);
          console.log(this.moviesQuery[0].overview.length);
        });
        axios.get( this.baseURL + 'tv', {
          params: {
            api_key: this.apiKey,
            language: this.lang,
            query: this.TitleInput,
          }
        })
        .then( (arr) => {
          this.tvSeriesQuery = arr.data.results;
          this.tvPages = arr.data.total_pages;
          console.log(this.tvPages);
          this.convertVoteAvg(this.tvSeriesQuery);
          console.log(this.tvSeriesQuery);
        });
      }
    },
    convertVoteAvg(thisArr) {
      thisArr.forEach( (movie) => {
        const rating = Math.round( movie.vote_average / 2 );
        movie['rating'] = rating;
      })
    }
  }
});
