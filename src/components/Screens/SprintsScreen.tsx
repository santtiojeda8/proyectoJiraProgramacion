import { SprintList } from "../ui/SprintList/SprintList";
import { Sprints } from "../ui/Sprints/Sprints";
import styles from './SprintsScreen.module.css'


export const SprintsScreen = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SprintList />
        </div>
        <div className={styles.content}>
            <Sprints />
        </div>
      </div>
    </div>
  );
};
