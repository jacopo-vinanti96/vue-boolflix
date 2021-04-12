const app = new Vue ({
  el: '#main-app',
  data: {
    moviesQuery: [],
    tvSeriesQuery: [],
    TitleInput: '',
    moviePages: 0,
    tvPages: 0,
    languages: ['en', 'de', 'es', 'fr', 'it', 'pt'],
  },
  methods: {
    getMovies() {
      if ( this.TitleInput != '' ) {
        axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: 'afbb7def2542bc20b7d5bfd24baf9b6a',
            query: this.TitleInput,
          }
        })
        .then( (arr) => {
          this.moviesQuery = arr.data.results;
          this.moviePages = arr.data.total_pages;
          console.log(this.pages);
          this.convertVoteAvg(this.moviesQuery);
          console.log(this.moviesQuery);
        });
        axios.get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: 'afbb7def2542bc20b7d5bfd24baf9b6a',
            query: this.TitleInput,
          }
        })
        .then( (arr) => {
          this.tvSeriesQuery = arr.data.results;
          this.tvPages = arr.data.total_pages;
          console.log(this.pages);
          this.convertVoteAvg(this.tvSeriesQuery);
          console.log(this.tvSeriesQuery);
        });
      }
    },
    convertVoteAvg(thisArr) {
      thisArr.forEach( (movie) => {
        const rating = Math.floor( movie.vote_average / 2 );
        movie['rating'] = rating;
      })
    }
  }
});
