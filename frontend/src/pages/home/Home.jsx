import Hero from "../../components/hero/Hero";
import MovieSection from "../../components/movie/MovieSection/MovieSection";

function Home() {
     return (
          <div>
               <Hero/>
         <div className="container">
           <MovieSection title="Trending" endpoint="/tmdb/trending" />

           <MovieSection title="Popular Movies" endpoint="/tmdb/popular" />

           <MovieSection title="Top Rated Movies" endpoint="/tmdb/movies" />

           <MovieSection title="TV Shows" endpoint="/tmdb/tv" />

           <MovieSection title="Popular People" endpoint="/tmdb/people" />
         </div>
       </div>
     );
}

export default Home;
