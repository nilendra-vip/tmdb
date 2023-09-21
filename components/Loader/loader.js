import Link from 'next/link'
import style from './loader.module.css'


const loader = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className={` bg-primary text-white d-flex flex-column gap-3 align-items-center justify-content-center fs-1 ${style.loadingContainer}`}>
        <div className="spinner-border" style={{ width: '10rem', height: '10rem' }} role="status"></div>
        {/* <h1>Loading...</h1> */}
        <button onClick={goBack} className={`btn btn-light text-primary py2 px-3 fs-4 ${style.goBackBtn}`}>Go Back</button>
    </div>
  )
}

export default loader