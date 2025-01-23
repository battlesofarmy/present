"use client";

import { useState } from "react";

export default function FingerprintAuth() {
  // const [fingerprintStatus, setFingerprintStatus] = useState(null);
  const [fingerprintStatus, setFingerprintStatus] = useState<string | null>(null);


  // const startAuthentication = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/api/getChallenge"); // Full URL for backend
  //     // const response = await fetch("/api/getChallenge"); // Backend to generate a challenge
  //     const { challenge } = await response.json();

  //     const publicKeyCredentialCreationOptions = {
  //       publicKey: {
  //         challenge: Uint8Array.from(challenge, (c) => c.charCodeAt(0)),
  //         rp: { name: "Your App" },
  //         user: {
  //           id: Uint8Array.from("user-id", (c) => c.charCodeAt(0)), // Replace with the actual user ID
  //           name: "user@example.com",
  //           displayName: "User Name",
  //         },
  //         pubKeyCredParams: [{ type: "public-key", alg: -7 }],
  //         timeout: 60000,
  //         authenticatorSelection: { authenticatorAttachment: "platform" },
  //         attestation: "direct",
  //       },
  //     };

  //     const credential = await navigator.credentials.create(
  //       publicKeyCredentialCreationOptions
  //     );

  //     if (credential) {
  //       // Send credential to the backend for verification
  //       const verificationResponse = await fetch(
  //         "http://localhost:5000/api/registerFingerprint",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ credential }),
  //         }
  //       );

  //       if (verificationResponse.ok) {
  //         setFingerprintStatus("Fingerprint registered successfully!");
  //       } else {
  //         setFingerprintStatus("Fingerprint registration failed!");
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error during fingerprint registration:", err);
  //     setFingerprintStatus("Error occurred. Try again.");
  //   }
  // };



  const startAuthentication = async () => {
    try {

      if (!navigator.credentials || !navigator.credentials.create) {
        console.error("WebAuthn is not supported on this device or browser.");
        setFingerprintStatus("Your browser or device does not support WebAuthn.");
        return;
      }


      
      console.log("Starting fingerprint authentication...");
      // const response = await fetch("http://localhost:5000/api/getChallenge");
      const response = await fetch("http://192.168.0.194:5000/api/getChallenge");
      console.log("Response from /getChallenge:", response);
  
      const { challenge } = await response.json();
      console.log("Received challenge:", challenge);
  
      const publicKeyCredentialCreationOptions = {
        publicKey: {
          challenge: Uint8Array.from(challenge, (c) => c.charCodeAt(0)),
          rp: { name: "Your App" },
          user: {
            id: Uint8Array.from("user-id", (c) => c.charCodeAt(0)),
            name: "user@example.com",
            displayName: "User Name",
          },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }],
          timeout: 60000,
          authenticatorSelection: { authenticatorAttachment: "platform" },
          attestation: "direct",
        },
      };
  
      console.log("Options for navigator.credentials.create:", publicKeyCredentialCreationOptions);
  
      const credential = await navigator.credentials.create(publicKeyCredentialCreationOptions);
      console.log("Credential received:", credential);
  
      if (credential) {
        // const verificationResponse = await fetch("http://localhost:5000/api/registerFingerprint", {
        const verificationResponse = await fetch("http://192.168.0.194:5000/api/registerFingerprint", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential }),
        });
        console.log("Verification response:", verificationResponse);
  
        if (verificationResponse.ok) {
          setFingerprintStatus("Fingerprint registered successfully!");
        } else {
          console.log("Verification failed:", await verificationResponse.text());
          setFingerprintStatus("Fingerprint registration failed!");
        }
      }
    } catch (err) {
      console.error("Error during fingerprint registration:", err);
      setFingerprintStatus("Error occurred. Try again.");
    }
  };


  

  
  
  return (
    <div className="container">
      <button
        onClick={startAuthentication}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Register Fingerprint
      </button>

      {fingerprintStatus && <p>{fingerprintStatus}</p>}
    </div>
  );
}
