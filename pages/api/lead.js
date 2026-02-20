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
      <div style="font-family:Arial;max-width:650px;margin:auto;border:1px solid #ddd;padding:25px">

        <h2 style="color:#f59e0b;">SOLAR LEAD DELIVERY NOTICE</h2>
        <hr/>

        <p><strong>Lead Reference:</strong> ${leadRef}</p>
        <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

        <h3>Customer Details</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Location:</b> ${city}</p>

        <h3>Customer Request</h3>
        <p>${message || "Requested solar quotation."}</p>

        <hr/>

        <h3 style="color:#16a34a;">Invoice Summary</h3>

        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="border:1px solid #ddd;padding:8px">Product</td>
            <td style="border:1px solid #ddd;padding:8px">Exclusive Solar Lead</td>
          </tr>
          <tr>
            <td style="border:1px solid #ddd;padding:8px">Lead Reference</td>
            <td style="border:1px solid #ddd;padding:8px">${leadRef}</td>
          </tr>
          <tr>
            <td style="border:1px solid #ddd;padding:8px">Amount Due</td>
            <td style="border:1px solid #ddd;padding:8px"><strong>R ${LEAD_PRICE}.00</strong></td>
          </tr>
        </table>

        <p><strong>Payment Terms:</strong> Payment due within 48 hours.</p>

        <h3>Payment Instructions</h3>
        <p>
          Bank: CAPITEC BANK<br/>
          Account Name: Solar Quote Network<br/>
          Account Number: 1467436311<br/>
          Branch Code: 470010<br/>
          Reference: ${invoiceNumber}
        </p>

        <hr/>

        <p style="font-size:12px;color:#888">
          Solar Quote Network — Verified Lead Delivery System
        </p>

      </div>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("EMAIL SEND ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}