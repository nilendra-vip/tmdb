"use client";
import MoviesList from "@/components/MoviesList";
import TVShowList from "@/components/TVShowList";
import TrendingList from '@/components/TrendingList'
import SearchList from '@/components/SearchList'
const page = () => {
  
  return (
    <div>
      <SearchList />
      <TrendingList />
      <MoviesList />
      <TVShowList />
    </div>
  );
};

export default page;
