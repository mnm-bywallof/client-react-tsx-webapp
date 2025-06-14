import { makeAutoObservable } from "mobx";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
  UserCredential,
  getAuth,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { app, mMessaging } from "../firebase";
import { getToken } from "firebase/messaging";
import axios from "axios";

const EXTERNAL_URL = "https://wallof-backend.uc.r.appspot.com";

class ProfileStateManagement {
  user?: User = undefined;
  loaded: boolean = false;
  constructor() {
    makeAutoObservable(this);
    auth.onAuthStateChanged((auth_) => {
      this.user = auth_ || undefined;
      this.loaded = true;

      this.fetchUser();
    });
  }

  public async loginWithGoogle() {
    await signInWithPopup(auth, googleProvider);
  }

  public async logout() {
    await signOut(auth);
  }

  private async fetchUser() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");

        getToken(mMessaging)
          .then((v) => {
            console.log(
              "successfully generated a token:",
              v,
              "attempting to update user token on server"
            );
            axios
              .post(`${EXTERNAL_URL}/player/updateToken`, {
                username: this.user?.uid,
                token: v,
              })
              .then((ut) => {
                console.log("successfully updated attepted to update", ut.data);
              })
              .catch((e) => {
                console.error("failed to update token");
              });
          })
          .catch((e) => {
            console.warn(e);
          });
      }
    });
  }
}

const profileManagement = new ProfileStateManagement();

export { profileManagement };
