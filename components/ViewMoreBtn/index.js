import style from './style.module.css'
const index = () => {
  return (
    <div className={`d-flex align-items-center justify-content-center ${style.showItemBox} ${style.viewMoreBtnBox}`}>
        <div className={`d-flex align-items-center justify-content-center fs-3 fw-semibold p-5 text-center  ${style.viewMoreBtn}`}>View More</div>
    </div>
  )
}

export default index