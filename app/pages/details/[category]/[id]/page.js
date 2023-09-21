"use client";
import axios from "axios";
import { useEffect , useState } from "react";
import Loader from '@/components/Loader/loader'
import SingleDetailsPage from '@/components/SingleDetailsPage/index'

const page = (props) => {
  const { id , category } = props.params;
  // console.log(props);
  const [showDetail, setShowDetail] = useState(null);
  const GetShowDetails = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${category}/${id}?api_key=223667d1239871fc4b6eeef8d0d6def8`
        
      );
      setShowDetail(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!showDetail) GetShowDetails();
  }, []);

  return (
    <>
      {showDetail ? (
        <div>
          <SingleDetailsPage showDetail={showDetail} dets={props.params} />
        </div>
        
      ) : (
        <Loader />
      )}
    </>
  );
};

export default page;
