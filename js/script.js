const app = new Vue ({
  el: '#main-app',
  data: {
    moviesQuery: [],
    movieTitleInput: '',
    pages: 0,
  },
  methods: {
    getMovies() {
      if ( this.movieTitleInput != '' ) {
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'afbb7def2542bc20b7d5bfd24baf9b6a',
            query: this.movieTitleInput,
          }
        })
        .then( (arr) => {
          arr.data.results[0]['first'] = true;
          this.moviesQuery = arr.data.results;
          this.pages = arr.data.total_pages;
          console.log(this.pages);
          this.convertVoteAvg();
          console.log(this.moviesQuery);
        });
      }
    },
    convertVoteAvg() {
      this.moviesQuery.forEach( (movie) => {
        const rating = Math.floor( movie.vote_average / 2 );
        movie['rating'] = rating;
      })
    }
  }
});
