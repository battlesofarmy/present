"use client";
import axios from "axios";

export default function Page() {
  async function registerBiometric(userId) {
    const publicKey = {
      challenge: Uint8Array.from("randomString", (c) => c.charCodeAt(0)),
      rp: { name: "Your App Name" },
      user: {
        id: Uint8Array.from(userId, (c) => c.charCodeAt(0)), // Use the passed userId
        name: "user@example.com",
        displayName: "User Name",
      },
      pubKeyCredParams: [{ alg: -7, type: "public-key" }],
    };

    try {
      const credential = await navigator.credentials.create({ publicKey });

      // Save the data to MongoDB
      const biometricData = {
        userId: userId,
        credentialId: credential.id, // Unique credential ID
        publicKey: btoa(
          String.fromCharCode(...new Uint8Array(credential.response.attestationObject))
        ),
        challenge: btoa(String.fromCharCode(...publicKey.challenge)), // Store the base64 challenge
      };

      // Send data to the backend using axios
      // const response = await axios.post("http://localhost:5000/stu/present", biometricData);
      const response = await axios.post("https://api.muntasir3301.xyz/stu/present", biometricData);
      console.log("Biometric registered successfully:", response.data);



    } catch (error) {
      console.error("Biometric registration failed:", error.message);
    }
  }

  return (
    // Generate userId (for demo purposes, you could use an email or a student number)
// const userId = "student" + Math.floor(Math.random() * 1000000); // Example userId "student12345"

    <>
      <div className="container">
        <button
          // onClick={() => registerBiometric("uniqueUserId")} // Pass a valid userId here
          onClick={() => registerBiometric(`"student" + ${Math.floor(Math.random() * 1000000)}`)} // Pass a valid userId here
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register Fingerprint
        </button>
      </div>
    </>
  );
}
