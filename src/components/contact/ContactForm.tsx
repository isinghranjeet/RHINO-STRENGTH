import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

type EnquiryType =
  | "General Enquiry"
  | "Membership Price Plan"
  | "Personal Coaching Slot";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  enquiryType: EnquiryType;
  preferredPlan: string;
  preferredSlot: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

interface ContactFormProps {
  /** Gym WhatsApp number with country code, e.g. "+91 93958 27174" */
  whatsappNumber?: string;
}

const MAX_MESSAGE_LENGTH = 500;
const DEFAULT_WHATSAPP_NUMBER = "919395827174";

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  enquiryType: "General Enquiry",
  preferredPlan: "Monthly",
  preferredSlot: "Morning (6 AM - 10 AM)",
  message: "",
};

function sanitizeWhatsAppPhone(rawPhone?: string): string {
  const digits = (rawPhone ?? "").replace(/\D/g, "");
  if (!digits) return DEFAULT_WHATSAPP_NUMBER;
  // If a 10-digit Indian number is passed without country code, prefix 91
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function buildWhatsAppMessage(
  data: ContactFormData,
  planOrSlotLabel: string
): string {
  const lines = [
    "*New Gym Enquiry - Lakhimpur Gym HQ*",
    `• *Name:* ${data.name.trim()}`,
    `• *Phone:* ${data.phone.trim()}`,
    ...(data.email.trim() ? [`• *Email:* ${data.email.trim()}`] : []),
    `• *Enquiry Type:* ${data.enquiryType}`,
    ...(planOrSlotLabel !== "-"
      ? [`• *Preference:* ${planOrSlotLabel}`]
      : []),
    ...(data.message.trim() ? [`• *Message:* ${data.message.trim()}`] : []),
  ];

  return lines.join("\n");
}

/** Direct message form that logs enquiry and redirects to WhatsApp on submit. */
export function ContactForm({ whatsappNumber }: ContactFormProps) {
  const { addEnquiry } = useApp();

  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormData, boolean>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const validateField = (
    name: keyof ContactFormData,
    value: string
  ): string | undefined => {
    const trimmed = value.trim();

    switch (name) {
      case "name":
        if (!trimmed) return "Full name is required.";
        if (trimmed.length < 2) return "Name must be at least 2 characters.";
        return undefined;

      case "phone": {
        if (!trimmed) return "Phone number is required.";
        const digitsOnly = trimmed.replace(/\D/g, "");
        if (!/^[+\d][\d\s-]{7,16}$/.test(trimmed) || digitsOnly.length < 10) {
          return "Enter a valid phone number (at least 10 digits).";
        }
        return undefined;
      }

      case "email":
        if (!trimmed) return undefined;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
          return "Enter a valid email address.";
        }
        return undefined;

      case "message":
        if (trimmed.length > MAX_MESSAGE_LENGTH) {
          return `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (data: ContactFormData): FormErrors => {
    const nextErrors: FormErrors = {};
    (Object.keys(data) as Array<keyof ContactFormData>).forEach((key) => {
      const err = validateField(key, data[key]);
      if (err) nextErrors[key] = err;
    });
    return nextErrors;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    setSubmitError(null);

    if (touched[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: validateField(fieldName, value),
      }));
    }
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;

    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setPopupBlocked(false);

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      enquiryType: true,
      message: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const planName =
        formData.enquiryType === "Membership Price Plan"
          ? formData.preferredPlan
          : formData.enquiryType === "Personal Coaching Slot"
          ? `Coaching (${formData.preferredSlot})`
          : "-";

      await Promise.resolve(
        addEnquiry({
          type: formData.enquiryType,
          planName,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          createdAt: new Date().toISOString(),
        })
      );

      const targetPhone = sanitizeWhatsAppPhone(whatsappNumber);
      const encodedText = encodeURIComponent(
        buildWhatsAppMessage(formData, planName)
      );
      const waUrl = `https://wa.me/${targetPhone}?text=${encodedText}`;

      setWhatsappUrl(waUrl);
      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      setTouched({});

      const openedWindow = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!openedWindow) {
        setPopupBlocked(true);
      }
    } catch {
      setSubmitError("Could not process your enquiry right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError(null);
    setPopupBlocked(false);
    setWhatsappUrl(null);
    setErrors({});
    setTouched({});
    setFormData(INITIAL_FORM_DATA);
  };

  const inputBaseClass =
    "w-full bg-zinc-900 border rounded p-2.5 text-white placeholder:text-zinc-500 focus:outline-none transition-colors";

  const getFieldClass = (fieldName: keyof ContactFormData) =>
    `${inputBaseClass} ${
      errors[fieldName]
        ? "border-red-500/80 focus:border-red-500"
        : "border-zinc-800 focus:border-gold"
    }`;

  return (
    <div className="bg-card p-6 sm:p-8 rounded-xl border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">
          SEND DIRECT MESSAGE
        </h3>
        <p className="text-xs text-zinc-400">
          Logged in our portal and sent directly to our WhatsApp desk on submit.
        </p>
      </div>

      {submitted ? (
        <div
          role="status"
          className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg text-center space-y-3"
        >
          <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto" />
          <h4 className="font-bold text-white text-base uppercase">
            REDIRECTING TO WHATSAPP!
          </h4>
          <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
            {popupBlocked
              ? "Your browser blocked the automatic pop-up. Click below to open WhatsApp with your pre-filled message."
              : "Your enquiry is saved and WhatsApp has opened with your message ready to send."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-400 text-black text-xs font-extrabold px-4 py-2.5 rounded uppercase transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Open WhatsApp
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold px-4 py-2.5 rounded uppercase transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4 text-xs">
          {submitError && (
            <div
              role="alert"
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/40 text-red-300 p-3 rounded"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{submitError}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="contact-name" className="block text-zinc-300 font-bold mb-1">
              Full Name <span className="text-gold">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className={getFieldClass("name")}
            />
            {errors.name && (
              <p id="contact-name-error" className="text-red-400 text-[11px] mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="contact-phone" className="block text-zinc-300 font-bold mb-1">
              Phone Number <span className="text-gold">*</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 93958 27174"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "contact-phone-error" : undefined}
              className={getFieldClass("phone")}
            />
            {errors.phone && (
              <p id="contact-phone-error" className="text-red-400 text-[11px] mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="contact-email" className="block text-zinc-300 font-bold mb-1">
              Email Address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className={getFieldClass("email")}
            />
            {errors.email && (
              <p id="contact-email-error" className="text-red-400 text-[11px] mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Type of Enquiry */}
          <div>
            <label htmlFor="contact-enquiry-type" className="block text-zinc-300 font-bold mb-1">
              Type of Enquiry
            </label>
            <select
              id="contact-enquiry-type"
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              className={getFieldClass("enquiryType")}
            >
              <option value="General Enquiry">General Enquiry</option>
              <option value="Membership Price Plan">Membership Price Plan</option>
              <option value="Personal Coaching Slot">Personal Coaching Slot</option>
            </select>
          </div>

          {/* Conditional Field: Membership Plan */}
          {formData.enquiryType === "Membership Price Plan" && (
            <div>
              <label htmlFor="contact-preferred-plan" className="block text-zinc-300 font-bold mb-1">
                Preferred Plan Duration
              </label>
              <select
                id="contact-preferred-plan"
                name="preferredPlan"
                value={formData.preferredPlan}
                onChange={handleChange}
                className={getFieldClass("preferredPlan")}
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly (3 Months)">Quarterly (3 Months)</option>
                <option value="Half-Yearly (6 Months)">Half-Yearly (6 Months)</option>
                <option value="Annual (12 Months)">Annual (12 Months)</option>
              </select>
            </div>
          )}

          {/* Conditional Field: Personal Coaching Slot */}
          {formData.enquiryType === "Personal Coaching Slot" && (
            <div>
              <label htmlFor="contact-preferred-slot" className="block text-zinc-300 font-bold mb-1">
                Preferred Time Slot
              </label>
              <select
                id="contact-preferred-slot"
                name="preferredSlot"
                value={formData.preferredSlot}
                onChange={handleChange}
                className={getFieldClass("preferredSlot")}
              >
                <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
                <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
              </select>
            </div>
          )}

          {/* Message */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="contact-message" className="block text-zinc-300 font-bold">
                Your Message
              </label>
              <span
                className={`text-[11px] ${
                  formData.message.length > MAX_MESSAGE_LENGTH
                    ? "text-red-400 font-semibold"
                    : "text-zinc-500"
                }`}
              >
                {formData.message.length}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Write your questions or visit preferences..."
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={getFieldClass("message")}
            />
            {errors.message && (
              <p id="contact-message-error" className="text-red-400 text-[11px] mt-1">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-deep disabled:opacity-60 disabled:cursor-not-allowed text-black font-extrabold py-3.5 rounded uppercase tracking-wider transition-colors text-xs cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                OPENING WHATSAPP...
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4" />
                SUBMIT &amp; CONTINUE ON WHATSAPP
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}