import { useState } from "react";
import "./App.css";
import CryptoJS from "crypto-js";
import TextField from "./components/TextField";
import TextLine from "./components/TextLine";

function App() {
  const [policy, setPolicy] = useState("");
  const [policyBase64, setPolicyBase64] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [signature, setSignature] = useState("");

  const calculateHMAC = () => {
    try {
      const hmac = CryptoJS.HmacSHA1(policyBase64, accessKey);
      const hmacBase64 = CryptoJS.enc.Base64.stringify(hmac);
      setSignature(hmacBase64);
    } catch (error) {
      setSignature("Error calculating HMAC-SHA1");
    }
  };

  return (
    <div className="app">
      <div className="center-box">
        <h1>Signature Generator</h1>
        <TextField
          label="Policy (JSON/Base64 Decoded)"
          value={policy}
          onChange={(e) => {
            setPolicy(e.target.value);
            setPolicyBase64(btoa(e.target.value));
          }}
        ></TextField>
        <TextField
          label="Policy (Base64 Encoded)"
          value={policyBase64}
          onChange={(e) => {
            setPolicyBase64(e.target.value);
            setPolicy(atob(e.target.value));
          }}
        />
        <TextLine
          label="Secret Access Key"
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
        ></TextLine>
        <button onClick={calculateHMAC}>Calculate Signature</button>
        <TextField
          label="HMAC-SHA1 Result (Base64 Encoded)"
          value={signature}
          readOnly={true}
          rows="1"
        />
      </div>
    </div>
  );
}

export default App;
