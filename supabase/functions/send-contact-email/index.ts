import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission from:", email);

    // Send email to CODE4EARTH
    const emailResponse = await resend.emails.send({
      from: "CODE4EARTH Contact <onboarding@resend.dev>",
      to: ["wecode4earth@gmail.com"],
      replyTo: email,
      subject: subject ? `Contact Form: ${subject}` : "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #0c1420 0%, #1a2332 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">📬 New Contact Form Submission</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 2px solid #e0e0e0;">
              <h2 style="color: #0ea5e9; margin: 0 0 10px 0;">Contact Details</h2>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a></p>
              ${subject ? `<p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>` : ''}
            </div>
            
            <div>
              <h2 style="color: #0ea5e9; margin: 0 0 10px 0;">Message</h2>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #0ea5e9;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                This message was sent via the CODE4EARTH contact form
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to the sender
    const confirmationResponse = await resend.emails.send({
      from: "CODE4EARTH <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message! - CODE4EARTH",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #0c1420 0%, #1a2332 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">🌍 Thank You for Reaching Out!</h1>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #0ea5e9; margin: 0 0 15px 0;">Hi ${name},</h2>
            
            <p style="line-height: 1.6; color: #333; margin-bottom: 20px;">
              Thank you for contacting CODE4EARTH! We have successfully received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
              <p style="margin: 0; color: #333;">
                <strong>⏱️ Expected Response Time:</strong> 24-48 hours
              </p>
            </div>
            
            <p style="line-height: 1.6; color: #333; margin-bottom: 15px;">
              In the meantime, feel free to explore our platform and discover how we're using NASA data to create sustainable solutions for Nepal.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:wecode4earth@gmail.com" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                📧 Email Us Directly
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
              <p style="color: #666; font-size: 14px; margin: 0; text-align: center;">
                Best regards,<br>
                <strong style="color: #0ea5e9;">The CODE4EARTH Team</strong><br>
                <em>NASA Space Apps Challenge 2025</em>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
