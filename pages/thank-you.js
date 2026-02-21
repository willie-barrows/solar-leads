export default function ThankYou() {
  return (
    <div style={{
      fontFamily: "Arial",
      maxWidth: "600px",
      margin: "60px auto",
      padding: "30px",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#16a34a" }}>
        ✅ Request Received
      </h1>

      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        Thank you for requesting a solar or backup power quotation.
      </p>

      <div style={{
        background: "#f3f4f6",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "25px"
      }}>
        <h3>What happens next?</h3>

        <p>✔ Your request has been sent to a verified local installer.</p>
        <p>✔ A solar specialist will contact you within <b>48 hours</b>.</p>
        <p>✔ They will discuss system size, pricing, and installation options.</p>
      </div>

      <p style={{ marginTop: "30px", color: "#666" }}>
        Please keep your phone available so the installer can reach you.
      </p>
    </div>
  );
}
