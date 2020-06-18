import { useMutation } from "@apollo/react-hooks";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BackHeader from "../../components/Header/BackHeader";
import UNBLOCK_CONTACT from "../../graphql/mutation/unblockContactMutation";
import { RootState } from "../../redux/reducers";
import { getTimestamp } from "../../utils/helpers";
import styles from "./style.module.css";

const Blocked: React.FC = ({ pushErr }: any) => {
  const { blocked } = useSelector((state: RootState) => state.contacts);
  const [unblockContact] = useMutation(UNBLOCK_CONTACT);
  return (
    <>
      <BackHeader />
      <IonContent>
        <IonList className={`${styles.homeContent} has-tabs`}>
          {blocked.map((block: any) => (
            <IonItem key={block.username}>
              <IonLabel>{block.username}</IonLabel>
              <IonButton
                onClick={async () => {
                  try {
                    await unblockContact({
                      variables: {
                        username: block.username,
                        timestamp: getTimestamp(),
                      },
                    })
                  } catch (e) {
                    pushErr(e, {}, "contacts", "unblockContact")
                  }
                }}
                fill="clear"
              >
                <IonIcon color="dark" icon={close}></IonIcon>
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};

export default Blocked;
