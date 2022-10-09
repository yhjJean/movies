// step 1
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&
api_key=0f7aabc1d174c8c71bff700478c64c8d&page=1`;

const img_path = `https://image.tmdb.org/t/p/w1280`;

const search_url = `https://api.themoviedb.org/3/search/movie?
api_key=0f7aabc1d174c8c71bff700478c64c8d&query="`;

// step 4
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

// step 3
// getting initial movies
getMovies(api_url);

// step 2
async function getMovies(url) {
    // fetch returns a promise
    const res = await fetch(url);
    // converting to get the actual data
    const data = await res.json();
    // console.log(data.results);
    // step 6
    showMovies(data.results);
}

// step 7

// movies parameter is the place holder of (data.results)
function showMovies(movies){
    main.innerHTML='';
    // we use forEach to loop
    movies.forEach((movie)=>{
        // use destructuring to get access to different property
        const {title, poster_path, vote_average, overview} = movie;

        const movieElement = document.createElement('div');

        movieElement.classList.add('movie');

        movieElement.innerHTML=`
        <img src="${img_path+poster_path}" alt="${title}">
      
         <div class="movie-info">
             <h3>${title}</h3>
             <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
            <h3>overview</h3>
            ${overview}
        </div>
        `;
        main.appendChild(movieElement);

    })
}

// function to handle the rating colors
function getClassByRate(vote) {
    if(vote >= 8) {
        return "green"
    }else if(vote >= 5){
        return "orange"
    }else{
        return "red";
    }
}

// step 5
// search handler function
// e is the event object

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    // the value of the search input
    const searchTerm = search.value;
    // check if the search exist and not undefined
    if(searchTerm && searchTerm !== ''){
        // the search term is what is going to be add to the query
        getMovies(search_url + searchTerm);
    
        search.value=''
    }else {
        // if the value if search is undefined
        window.location.reload();
    }
})