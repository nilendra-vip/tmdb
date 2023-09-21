import Link from 'next/link'
import style from './style.module.css'

const index = () => {
  return (
    <>
      <div className={` d-flex px-5 ${style.headerContainer}`}>
        <div className="col d-flex align-items-center px-5">
            <Link href={`/`} className='text-decoration-none px-5 d-flex align-items-center gap-3 '>
                <h1 className={style.heading}>TMDB</h1>
                <div className={style.shape}></div>
            </Link>
        </div>
      </div>
    </>
  )
}

export default index