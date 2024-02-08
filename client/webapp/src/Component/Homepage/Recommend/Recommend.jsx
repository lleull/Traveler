import styles from "./Recommend.module.css";
import datas from "./../../../Dummyy/Dummy";
const Recommend = () => {
  return (
    <div className={styles.follow}>
      <span className={styles.span}>Most Traveled</span>
      {datas.map((data) => (
        <div key={data.id} className={styles.wrap}>
          <img src={data.image} className={styles.img} />
          <div className={styles.descs}>
            <h3 className={styles.name}>{data.name}</h3>
            <span className={styles.desc}>{data.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommend;
