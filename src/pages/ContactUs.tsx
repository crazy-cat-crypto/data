import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

export default function ContactUs() {

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Connect With Us 🌍
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's Collaborate for a Sustainable Future 🌱
          </p>
          <p className="text-muted-foreground mt-2">
            Have questions, ideas, or data to share? We're just a message away.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information Card */}
          <Card className="card-space animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Get In Touch</CardTitle>
              <CardDescription>
                We're always here to collaborate for a better Earth. Reach out to us anytime.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">office@baral-aayush.com.np</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = "mailto:office@baral-aayush.com.np"}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">976631144</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = "tel:9856027896"}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </div>

              {/* Additional Info */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Response Time:</strong> We typically respond within 24-48 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 text-center animate-fade-in">
          <Card className="card-space">
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                <strong>About Data:</strong> We're dedicatedto create sustainable solutions for Nepal and beyond.
                Join us in building a better future 
                through data-driven insights.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
