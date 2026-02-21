import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, city, message } = req.body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ success: false, error: "Missing environment variables" });
  }

  const LEAD_PRICE = 200;
  const leadRef = "SL-" + Math.floor(10000 + Math.random() * 90000);
  const invoiceNumber = "INV-" + Math.floor(10000 + Math.random() * 90000);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Solar Quote Network" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🔥 New Solar Installation Lead — REF ${leadRef}`,
      html: `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;background:#f9fafb;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <div style="background:#16a34a;padding:24px 0;text-align:center;">
          <img src='https://img.icons8.com/ios-filled/100/ffffff/solar-panel.png' alt='Solar Panel' width='60' style='margin-bottom:10px;'/>
          <h1 style="color:#fff;font-size:2.2rem;margin:0;letter-spacing:1px;">Solar Quote Network</h1>
          <div style="color:#fff;font-size:1.1rem;margin-top:6px;">Verified Lead Delivery Notice</div>
        </div>
        <div style="padding:32px 28px 24px 28px;">
          <div style="margin-bottom:18px;">
            <span style="display:inline-block;background:#f59e0b;color:#fff;padding:6px 18px;border-radius:6px;font-weight:bold;font-size:1.1rem;">Lead Ref: ${leadRef}</span>
            <span style="display:inline-block;background:#e5e7eb;color:#222;padding:6px 18px;border-radius:6px;font-weight:bold;font-size:1.1rem;margin-left:10px;">Invoice: ${invoiceNumber}</span>
          </div>
          <div style="color:#555;font-size:1.05rem;margin-bottom:18px;">Date: <b>${new Date().toLocaleDateString()}</b></div>
          <h2 style="color:#16a34a;margin-bottom:10px;font-size:1.3rem;">Customer Details</h2>
          <table style="width:100%;margin-bottom:18px;font-size:1rem;">
            <tr><td style="padding:4px 0;width:120px;color:#888;">Name:</td><td>${name}</td></tr>
            <tr><td style="padding:4px 0;color:#888;">Phone:</td><td>${phone}</td></tr>
            <tr><td style="padding:4px 0;color:#888;">Email:</td><td>${email}</td></tr>
            <tr><td style="padding:4px 0;color:#888;">Location:</td><td>${city}</td></tr>
          </table>
          <h2 style="color:#f59e0b;margin-bottom:10px;font-size:1.2rem;">Customer Request</h2>
          <div style="background:#fffbe6;padding:14px 18px;border-radius:8px;margin-bottom:18px;border:1px solid #f59e0b33;">${message || "Requested solar quotation."}</div>
          <h2 style="color:#16a34a;margin-bottom:10px;font-size:1.2rem;">Invoice Summary</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:18px;">
            <tr>
              <td style="border:1px solid #e5e7eb;padding:10px 8px;background:#f3f4f6;font-weight:bold;">Product</td>
              <td style="border:1px solid #e5e7eb;padding:10px 8px;">Exclusive Solar Lead</td>
            </tr>
            <tr>
              <td style="border:1px solid #e5e7eb;padding:10px 8px;background:#f3f4f6;font-weight:bold;">Lead Reference</td>
              <td style="border:1px solid #e5e7eb;padding:10px 8px;">${leadRef}</td>
            </tr>
            <tr>
              <td style="border:1px solid #e5e7eb;padding:10px 8px;background:#f3f4f6;font-weight:bold;">Amount Due</td>
              <td style="border:1px solid #e5e7eb;padding:10px 8px;"><span style="color:#16a34a;font-weight:bold;font-size:1.1rem;">R ${LEAD_PRICE}.00</span></td>
            </tr>
          </table>
          <div style="margin-bottom:18px;color:#555;font-size:1rem;"><b>Payment Terms:</b> Payment due within 48 hours.</div>
          <h2 style="color:#f59e0b;margin-bottom:10px;font-size:1.2rem;">Payment Instructions</h2>
          <div style="background:#f3f4f6;padding:14px 18px;border-radius:8px;margin-bottom:18px;border:1px solid #e5e7eb;">
            <b>Bank:</b> CAPITEC BANK<br/>
            <b>Account Name:</b> Solar Quote Network<br/>
            <b>Account Number:</b> 1467436311<br/>
            <b>Branch Code:</b> 470010<br/>
            <b>Reference:</b> ${invoiceNumber}
          </div>
          <div style="text-align:center;margin-top:30px;font-size:13px;color:#888;">
            Solar Quote Network — Verified Lead Delivery System
          </div>
        </div>
      </div>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}