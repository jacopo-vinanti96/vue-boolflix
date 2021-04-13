// Documentazione API TMDB:
// https://developers.themoviedb.org/3/search/search-companies

const app = new Vue ({
  el: '#app',
  data: {
    baseURL: 'https://api.themoviedb.org/3/search/',
    paramsAxios: {
      params: {
        language: 'it-IT',
        api_key: 'afbb7def2542bc20b7d5bfd24baf9b6a',
        query: '',
        page: 1,
      }
    },
    moviesQuery: [],
    tvSeriesQuery: [],
    TitleInput: '',
    moviePages: 0,
    tvPages: 0,
    flags: ['en', 'de', 'es', 'fr', 'it', 'pt'],
  },
  methods: {
    apiGet(type, page) {
      this.paramsAxios.params.page = page;
      this.paramsAxios.params.query = this.TitleInput;
      return axios.get( this.baseURL + type, this.paramsAxios );
    },
    search() {
      if ( this.TitleInput != '' ) {
        this.getMovies();
        this.getSeries();
      }
    },
    getMovies(page = 1) {
      this.apiGet('movie', page)
      .then( (arr) => {
        this.moviesQuery = arr.data.results;
        this.moviePages = arr.data.total_pages;
        this.convertVoteAvg(this.moviesQuery);
      });
    },
    getSeries(page = 1) {
      this.apiGet('tv', page)
      .then( (arr) => {
        this.tvSeriesQuery = arr.data.results;
        this.tvPages = arr.data.total_pages;
        this.convertVoteAvg(this.tvSeriesQuery);
      });
    },
    convertVoteAvg(thisArr) {
      thisArr.forEach( (movie) => {
        const rating = Math.round( movie.vote_average / 2 );
        movie['rating'] = rating;
      })
    }
  }
});
