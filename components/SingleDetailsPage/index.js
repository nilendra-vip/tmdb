import style from "./style.module.css";

function convertMinutesToHoursAndMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
}

//function for converting Minutes into Hours and minutes
const index = (props) => {
  console.log(props);
  const { showDetail, dets } = props;

  const runtime = showDetail.runtime || showDetail.episode_run_time;
  const { hours, minutes } = convertMinutesToHoursAndMinutes(runtime);

  return (
    <div className={style.itemBoxContainer}>
      <div className={`d-flex align-items-center text-center  ${style.itemBoxTop}`}>
        <h1 className="w-100 text-light">
          {dets.category === "tv" ? "TV Show" : "Movie"} Details
        </h1>
      </div>
      <div className={style.itemBoxBottom}>
        <div className={`d-flex align-items-center justify-content-center overflow-hidden ${style.itemHomeDets}`}>
          <div className={`d-flex ${style.homeDetsBox}`}>
            <div className={`rounded-4  ${style.homeDetsPhotoBox}`}>
              <img
                src={
                  showDetail.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${showDetail.poster_path}`
                    : `https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png`
                }
                alt=""
              />
            </div>
            <div className={`d-flex flex-column gap-2 justify-content-center text-light px-5 ${style.homeDetsInfo}`}>
              <div className={style.title}>
                <h1 className={`lh-1 d-flex gap-3 align-items-center ${style.showTitle}`}>
                  <span>
                    {showDetail.title || showDetail.original_name
                      ? showDetail.title || showDetail.original_name
                      : "No title"}
                  </span>
                  <span>
                    (
                    {showDetail.release_date
                      ? `${new Date(showDetail.release_date).getFullYear()}`
                      : `${new Date(showDetail.first_air_date).getFullYear()}`}
                    )
                  </span>
                </h1>
                <ul className={`ps-1 d-flex gap-3 align-items-center justify-content-start ${style.releaseDate}`} style={{ listStyleType: "none" }}>
                  <li className="fw-semibold border fs-6 border px-2">
                    {showDetail.status ? showDetail.status : "No status"}
                  </li>
                  <li className="border px-2">
                    <span>Release Date : </span>
                    {showDetail.release_date || showDetail.first_air_date
                      ? showDetail.release_date || showDetail.first_air_date
                      : ""}
                  </li>
                  {/* <li>{showDetail.genres.map(genre => genre.name)}</li> */}
                  <li className={`d-flex gap-3 border px-2 ${style.genresBox}`}>
                    <span>Genre : </span>
                    {showDetail.genres.map((genre) => {
                      return <span key={genre.id}>{genre.name}</span>;
                    })}
                  </li>
                  <li className="border px-2">
                    <span>Duration : </span>
                    {`${hours}hr ${minutes}m`}
                  </li>
                </ul>
              </div>
              <div className={` d-flex gap-4 py-1  ${style.scoreRateBox}`}>
                {showDetail.vote_average ? (
                  <div className={`d-flex align-items-center gap-1 ${style.scoreBox}`}>
                    <div className={`bg-dark rounded-circle border border-success border-3 d-flex align-items-center justify-content-center pt-1 ${style.userScore}`}>
                      <h1 className="lh-1">{showDetail.vote_average}</h1>
                    </div>
                    <h4 className="">User Score</h4>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className={style.tagline}>
                <h4 className="fw-normal opacity-75   " style={{ fontStyle: "italic" }}>
                  {showDetail.tagline ? showDetail.tagline : ""}
                </h4>
              </div>
              <div className={style.overviewBox}>
                {showDetail.overview ? (
                  <div className="">
                    <h4>Overview</h4>
                    <h5>{showDetail.overview}</h5>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className={style.backdropPhotoOverlay}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${showDetail.backdrop_path})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default index;
