import React from "react";
import Header from "../../components/Organisms/Header";
import MovieList from "../../components/Organisms/movieList/MovieList";
import CarouselMovie from "../../components/Organisms/CarouselMovie";
import Cinemas from "../../components/Organisms/cinemas/Cinemas";
import Footer from "../../components/Organisms/footer/Footer";

const Home = () => {
  return (
    <div className="container">
      <Header />
      <CarouselMovie />
      <MovieList />
      <Cinemas />
      <Footer />
    </div>
  );
};

export default Home;
