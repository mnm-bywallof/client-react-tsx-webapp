import { post } from "axios";
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

admin.initializeApp();

const rtDatabase = admin.database();

const YOCO_TOKEN_ID = "tok_aM3ynHybXyvZOKUKNEfN04iENJ";
const YOCO_BEARER_TOKEN = "sk_test_2e818a475m961QW542942e08a813";

let EXTERNAL_URL = "https://wallof-backend.uc.r.appspot.com";

export const initiateYoco = functions.https.onCall(async (context) => {
  const data = context.data;
  const uid = data.uid;
  const cost = data.amount;
  functions.logger.info("Params -> ", JSON.stringify(data));
  var amount = `${cost}`.replace(".", "");

  const d = {
    input: data,
  } as any;

  const url = "https://payments.yoco.com/api/checkouts";

  const headers = {
    Authorization: "Bearer " + YOCO_BEARER_TOKEN,
    "Content-type": "application/json",
  };

  const jsonBody = JSON.stringify({
    amount: parseInt(amount),
    currency: "ZAR",
    successUrl: `https://us-central1-wallof-client.cloudfunctions.net/yocoPaymentRedirect?tokenId=${YOCO_TOKEN_ID}&uid=${uid}&amount=${amount}`,
  });

  await post(url, jsonBody, { headers })
    .then(async (response) => {
      functions.logger.info("RESPONSE BODY -> ", response);
      d["response"] = response.data;
      await rtDatabase.ref(`/realtime-payment/${uid}`).push({
        complete: false,
        data: {},
        error: false,
      });
    })
    .catch(async (error) => {
      functions.logger.error("Failed to execute request due to -> ", error);
      d["error"] = "Failed to execute request due to -> " + error;
      await rtDatabase.ref(`/realtime-payment/${uid}`).push({
        complete: false,
        data: {},
        error: true,
      });
    });

  return d;
});

export const onNewAccount = functions.identity.beforeUserCreated((event) => {
  let user = event.auth;
  if (user) functions.logger.info(user);

  post(`${EXTERNAL_URL}/addUser`, {
    nickname: event.data?.displayName || "empty",
    username: event.data?.uid || "empty",
    phonenumber: event.data?.phoneNumber || "empty",
    token: event.auth?.token || "empty",
  })
    .then((d) => {
      functions.logger.warn(d.data);
    })
    .catch((e) => {
      functions.logger.error(e);
    });
});

export const yocoPaymentRedirect = functions.https.onRequest(
  async (request, response) => {
    const tokenId = `tok_4q3ONupe3mLb0JInMLSbVcpv`;
    const uid = request.query.uid;
    const amount = request.query.amount;

    functions.logger.log(request);

    await post(`https://wallof-backend.uc.r.appspot.com/player/credit/add`, {
      uid: uid,
      amount: amount,
      paymentId: tokenId,
    })
      .then(async (x) => {
        await rtDatabase.ref(`/realtime-payment/${uid}`).set({
          complete: false,
          data: x.data,
          error: true,
        });

        functions.logger.log("YOCO PAYMENT STATUS", true);
        functions.logger.info("Results from Server", x.data);
      })
      .catch((e) => {
        response.json({
          error: e,
          step: "url-execution",
        });
        functions.logger.error("YOCO PAYMENT STATUS", false);
      });
  }
);

export const initiateYocoV2 = functions.database.onValueCreated(
  "/realtime-payment/{uid}",
  async (event) => {
    const _data = event.data.val();
    const uid = event.params.uid;
    const cost = _data.amount;
    functions.logger.info("Params -> ", JSON.stringify(_data));
    var amount = `${cost}`.replace(".", "");

    const d = {
      input: _data,
    } as any;

    const url = "https://payments.yoco.com/api/checkouts";

    const headers = {
      Authorization: "Bearer " + YOCO_BEARER_TOKEN,
      "Content-type": "application/json",
    };

    const jsonBody = JSON.stringify({
      amount: parseInt(amount),
      currency: "ZAR",
      successUrl: `https://us-central1-wallof-client.cloudfunctions.net/yocoPaymentRedirect?tokenId=${YOCO_TOKEN_ID}&uid=${uid}&amount=${amount}`,
    });

    await post(url, jsonBody, { headers })
      .then(async (response) => {
        functions.logger.info("RESPONSE BODY -> ", response);
        d["response"] = response.data;

        await rtDatabase.ref(`/realtime-payment/${uid}`).push({
          data: {
            success: true,
            response: d,
          },
        });
      })
      .catch(async (error) => {
        functions.logger.error("Failed to execute request due to -> ", error);
        d["error"] = "Failed to execute request due to -> " + error;

        await rtDatabase.ref(`/realtime-payment/${uid}`).set({
          data: {
            success: false,
            response: d,
          },
        });
      });

    functions.logger.warn(d);
  }
);
