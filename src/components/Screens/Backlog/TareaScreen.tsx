import { SprintList } from "../../ui/SprintList/SprintList";
import { TareasList } from "../../ui/TareasList/TareasList";
import styles from "./TareaSreen.module.css";

export const TareaScreen = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SprintList />
        </div>
        <div className={styles.content}>
          <TareasList />
        </div>
      </div>
    </div>
  );
};
