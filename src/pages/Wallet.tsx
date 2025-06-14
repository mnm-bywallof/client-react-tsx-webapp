import axios from "axios";
import { Button, Col, Container, Row } from "react-bootstrap";
import { mFirebase } from "../firebase";
import { httpsCallable, HttpsCallable } from "firebase/functions";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { observer } from "mobx-react";
import { profileManagement } from "../context/ProfileStateManagement";
import { CSSProperties, TextField } from "@mui/material";

const _Wallet = () => {
  const [amount, setAmount] = useState(0);
  const addCredit = () => {
    const finalAmount = amount * 100;
    httpsCallable(
      mFirebase,
      "initiateYoco"
    )({
      uid: profileManagement.user?.uid,
      amount: finalAmount,
    })
      .then((f) => {
        console.log(f.data);
        const functionData = f.data as unknown as any;
        const _response = functionData["response"];
        if (_response) {
          const redirectUrl = _response["redirectUrl"];
          window.location.href = redirectUrl;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <Container>
      <Row style={{ textAlign: "start" }} md={12} sm={12}>
        <h2>Wallet</h2>
      </Row>
      <Row>
        <Col md={12} sm={12} xs={6}>
          <div style={CardStyle}>
            <h3>Balance:</h3>
            <h4>50.00</h4>
          </div>
        </Col>
        {/* <Col md={6} sm={6} xs={6}>
          <div style={CardStyle}>
            <h3>Transactions</h3>
            <h4>50.00</h4>
          </div>
        </Col> */}
      </Row>
      <p></p>
      <TextField
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        onChange={(e) => {
          setAmount(e.target.value as unknown as number);
        }}
      />
      <Button onClick={addCredit}>Add Credits</Button>
    </Container>
  );
};

const CardStyle: CSSProperties = {
  display: "flex",
  flexFlow: "column",
  padding: "10px",
  background: "rgba(108, 253, 164, 0.87)",
  borderRadius: "10px",
  marginTop: 5,
};

const Wallet = observer(_Wallet);

export default Wallet;
