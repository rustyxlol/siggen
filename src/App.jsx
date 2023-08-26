import React, { useState } from 'react';
import './App.css';
import CryptoJS from 'crypto-js';

function App() {
  const [policy, setPolicy] = useState('');
  const [policy_base64, setPolicy_base64] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [signature, setSignature] = useState('');

  const calculateHMAC = () => {
    try {
      // const policyBase64 = btoa(policy);
      const hmac = CryptoJS.HmacSHA1(policy_base64, accessKey);
      const hmacBase64 = CryptoJS.enc.Base64.stringify(hmac); // Calculate HMAC and encode to base64
      setSignature(hmacBase64);

    } catch (error) {
      setSignature('Error calculating HMAC-SHA1');
    }
  };

  return (
    <div className="app">
      <div className="center-box">
        <h1>Signature Generator</h1>
        <label htmlFor="policy">Policy (JSON Object):</label>
        <textarea
          id="policy"
          rows="5"
          cols="40"
          value={policy}
          onChange={(e) => {
            setPolicy(e.target.value);
            setPolicy_base64(btoa(e.target.value))
          }}
        />
        <label htmlFor="policy_base64">Policy(b64enc)</label>
        <textarea
          id="policy_base64"
          rows="6"
          cols="40"
          value={policy_base64}
          onChange={(e) => {
            setPolicy_base64(e.target.value)
          }}
        />
        <label htmlFor="accessKey">Secret Access Key:</label>
        <input
          type="text"
          id="accessKey"
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
        />
        <button onClick={calculateHMAC}>Calculate Signature</button>
        <label htmlFor="signature">HMAC-SHA1 Result(b64enc)</label>
        <textarea
          id="signature"
          rows="1"
          cols="40"
          value={signature}
          readOnly
        />
      </div>
    </div>
  );
}

export default App;
