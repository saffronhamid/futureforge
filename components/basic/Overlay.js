import React, { useState, useEffect } from "react";
import styles from "../../styles/Overlay.module.css";
import Image from "next/image";
import jwt_decode from "jwt-decode";

const Overlay = ({ callbackFunction, onDisappear }) => {
  const [show, setShow] = useState(true);

  // Function to handle when the overlay should disappear
  const disappearOverlay = () => {
    onDisappear();
    setShow(false);
  };

  // Function to handle Google Sign-In callback response
  const handleCallbackResponse = (response) => {
    try {
      const userObject = jwt_decode(response.credential);
      callbackFunction(userObject);
      disappearOverlay();
    } catch (error) {
      console.error("Error decoding JWT:", error);
      // Handle error if JWT decoding fails
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      // Initialize Google Sign-In
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      // Render Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" },
      );

      // Render Google Sign-In button for magic URL
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton2"),
        { theme: "outline", size: "large" },
      );

      // Prompt Google Sign-In
      window.google.accounts.id.prompt();
    };
    script.onerror = () => {
      console.error("Failed to load Google sign-in script.");
      // Handle error if Google script fails to load
    };
    document.head.appendChild(script);

    // Clean up script tag
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {show && (
        <div className={styles.overlay} id="overlay" onClick={disappearOverlay}>
          <Image
            className={styles.overlayArrow}
            src="/Arrow.svg"
            width={200}
            height={200}
          />
          <div className={styles.overlayText}>
            <h1>Sign In</h1>
            <p>Please select an account to continue using FutureForge</p>
            <p>By logging in you agree to the Terms & Conditions</p>
            <ul className="tw-text-white">
              <li className="tw-list-disc tw-list-inside">Privacy Policy</li>
              <li className="tw-list-disc tw-list-inside">
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overlay;
