import axios from "axios";
import { Button, Container } from "react-bootstrap";
import { mFirebase } from "../firebase";
import { httpsCallable, HttpsCallable } from "firebase/functions";
import { useAuth } from "../context/AuthContext";

const Transactions = () => {
  const { user } = useAuth();
  const addCredit = () => {
    httpsCallable(
      mFirebase,
      "initiateYoco"
    )({
      uid: user?.uid,
      amount: 100,
    })
      .then((f) => {
        console.log(f.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <Container>
      <h2>Transactions</h2>
      <p>Transaction history will be displayed here.</p>
      <Button onClick={addCredit}>Add Credits</Button>
    </Container>
  );
};

export default Transactions;
