import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import { baseImgUrl } from "../constants";

const MovieList = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  //* genre içerisindeki id'ye göre filmleri alabilmek için `/discover/movie` ye istek attık.
  useEffect(() => {
    //* API'den türe göre veriyi alabilmek için parametre belirledik.
    const params = {
      with_genres: genre.id,
    };
    //* API'ye istek at
    api
      .get("/discover/movie", { params })
      //* API'den başarılı cevap gelirse state'e aktar
      .then((res) => setMovies(res.data.results))
      //* API'dan hatalı cevap gelirse hatayı state'e aktar
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="my-10">
      <h1 className="text-3xl font-semibold mb-3">{genre.name}</h1>
      <Splide
        options={{
          pagination: false,
          autoWidth: true,
          lazyLoad: true,
          gap: "10px",
        }}
      >
        {movies.map((movie) => (
          <SplideSlide key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                className="max-w-[300px] h-full"
                src={baseImgUrl + movie.poster_path}
                alt={movie.title}
              />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default MovieList;
