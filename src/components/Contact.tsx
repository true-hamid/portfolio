import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/contexts/LanguageContext";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { content } = useLanguage();
  const { contact, personal } = content;
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Clear field error when user starts typing
  const handleFieldChange = (field: keyof ContactFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  // Auto-dismiss success/error messages after 5 seconds
  useEffect(() => {
    if (submitStatus !== "idle") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus("idle");

    // Validate form data
    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {

      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Send email using EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          to_email: contact.emailPrimary,
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: contact.emailPrimary,
      href: `mailto:${contact.emailPrimary}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: personal.location,
      href: null,
    },
  ];

  // Use links from content; icons are mapped by index (LinkedIn, GitHub, Twitter)
  const socialTargets = contact.socialLinks;
  const socialIcons = [Linkedin, Github];
  const socialLinks = socialTargets.map((s, i) => ({ icon: socialIcons[i] ?? Linkedin, href: s.href, label: s.label }));

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-4">{contact.heading}</h2>
            <p className="text-xl text-slate-600">{contact.subheading}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-6">{contact.infoHeading}</h3>
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-slate-600 mb-1">{item.label}</div>
                        <div className="text-lg">{item.value}</div>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={index} href={item.href} className="block hover:opacity-75 transition-opacity">
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              <div>
                <h4 className="mb-4">{contact.followHeading}</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="size-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl mb-6">{contact.formHeading}</h3>

              {submitStatus === "success" && (
                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#dcfce7', padding: '8px', color: '#166534' }}>
                 {contact.successMessage}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#fee2e2', padding: '8px', color: '#991b1b' }}>
                  {contact.errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder={contact.placeholders.name}
                    value={formData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    className={errors.name ? "!border-red-500 focus:!border-red-500" : ""}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm font-medium" style={{ color: '#dc2626' }}>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder={contact.placeholders.email}
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    className={errors.email ? "!border-red-500 focus:!border-red-500" : ""}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm font-medium" style={{ color: '#dc2626' }}>
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder={contact.placeholders.message}
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleFieldChange("message", e.target.value)}
                    className={errors.message ? "!border-red-500 focus:!border-red-500" : ""}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-2 text-sm font-medium" style={{ color: '#dc2626' }}>
                      {errors.message}
                    </p>
                  )}
                </div>
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? contact.sendingText : contact.submitButton}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
