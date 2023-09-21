import Link from "next/link";
import style from "./style.module.css";
import ViewMoreBtn from '@/components/ViewMoreBtn/index'
const index = (props) => {
  // console.log(props);
  const { listItems , category } = props;
  return (
    <div className={`col  d-flex gap-4 ${style.showBox}`}>
      
      {listItems.map((item, index) => {
          // console.log(item);
        return (
          <div key={item.id} className={` ${style.showItemBox}`}>
            <div className={`bg-secondary-subtle rounded-4 ${style.showImageBox}`}>
              <Link href={`./pages/details/${category}/${item.id}`}>
                <img
                  className={style.showImage}
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                  alt=""
                />
              </Link>
              <div className={`bg-dark rounded-circle text-light d-flex align-items-center justify-content-center pe-2 ${style.showScoreRate}`}>
                <small style={{maxWidth:'3ch',paddingLeft:"5px", overflow:'hidden'}}>{item.vote_average || item.popularity }</small>
              </div>
            </div>
            <div className={`col  d-flex flex-column justify-content-end ${style.showDets}`}>
              <p className={`h5 lh-1 ${style.showTitle}`}>
                {item.title || item.original_name}
              </p>
              <p className={`h5 lh-1 mt-2 ${style.showReleaseDate}`}>
                {item.release_date || item.first_air_date}
              </p>
            </div>
          </div>
        );
      })}

      <ViewMoreBtn />
      
    </div>
  );
};

export default index;
