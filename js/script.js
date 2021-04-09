const app = new Vue ({
  el: '#main-app',
  data: {
    moviesQuery: [],
    movieTitleInput: '',
  },
  methods: {
    getMovies() {
      axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'afbb7def2542bc20b7d5bfd24baf9b6a',
          query: this.movieTitleInput,
        }
      })
      .then( (arr) => {
        this.moviesQuery = arr.data.results;
        console.log(this.moviesQuery);
      });
    },
  }
});
