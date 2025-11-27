// frontend/src/components/EmailVerify/EmailVerify.js
import { useState } from "react";

function EmailVerify() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleVerify = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setIsVerifying(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/users/send-verification-email", { // ✅ updated route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Verification email sent! Check your inbox.");
        setIsEmailSent(true);
      } else {
        setMessage(data.message || "Failed to send verification email.");
      }
    } catch (err) {
      setMessage("⚠️ Server error. Try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="email-verify-container">
      <h2>Verify Your Email</h2>

      {!isEmailSent ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isVerifying}
          />
          <button onClick={handleVerify} disabled={isVerifying}>
            {isVerifying ? "Sending..." : "Send Verification Email"}
          </button>
        </>
      ) : (
        <p>
          ✅ Verification email has been sent to <b>{email}</b>. 
          Please check your inbox and click the link to verify your account.
        </p>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default EmailVerify;

