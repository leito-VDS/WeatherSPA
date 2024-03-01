import { WeatherData } from '../../constants';
import styles from "./WeatherCard.module.scss"


function WeatherCard({data} : {data: WeatherData}) {
  return (
    <div className={styles.cardWrapper}>
        <h2>{data.name}</h2>
        <div className={styles.dataList}>
          <div className={styles.info}>Check</div>
          <span>won't be visible</span>
        </div>
    </div>

  )
}

export default WeatherCard;
