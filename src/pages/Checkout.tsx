import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "@/contexts/AppContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/services/domainService";
import {
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Strikethrough,
  Apple,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const { t } = useTranslation();
  const { currency, convertPrice } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const domain = searchParams.get("domain") || "";
  const price = parseFloat(searchParams.get("price") || "0");

  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  // User info form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('no');
  const [message, setMessage] = useState('');

  const convertedPrice = convertPrice(price);

  const handleCheckout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setProcessing(true);
    // Send email with user info using EmailJS (demo-friendly, no backend required)
    try {
          await emailjs.send(
            'service_38bx0ic', // Replace with your EmailJS service ID
            'template_0kdnaub', // Replace with your EmailJS template ID
            {
              fullName: fullName || '',
              email: email || '',
              address: address || '',
              phone: phone || '',
              domain: domain || '',
              payment: payment || '',
              message: message || '',
              price: convertedPrice || '',
            },
            'Bs6VJ1s_47EaUP-4z' // Replace with your EmailJS public key
          );
      setCompleted(true);
      toast({
        title: t("checkout.success"),
        description: `${domain} has been registered successfully!`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (!domain || !price) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("common.error")}</h1>
          <Button onClick={() => navigate("/")} variant="hero">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <CheckCircle className="w-20 h-20 text-secondary mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-luxury bg-clip-text text-transparent">
            {t("checkout.success")}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your domain <strong>{domain}</strong> has been registered
            successfully!
          </p>
          <Button onClick={() => navigate("/")} variant="hero" size="lg">
            Register Another Domain
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>

          <h1 className="text-3xl font-bold">{t("checkout.title")}</h1>
        </div>

        {/* User Info Form + Order Summary */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Info Form */}
          <Card className="p-6 h-fit">
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>
            <form className="space-y-4" onSubmit={handleCheckout}>
              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <Input
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Textarea
                placeholder="Message (optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
              <Button
                type="submit"
                variant="luxury"
                size="lg"
                className="w-full"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  "Continue to Payment"
                )}
              </Button>
            </form>
          </Card>

          <div className="flex flex-col gap-8">
            {/* Order Summary on top */}
            <Card className="p-6 h-fit">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{domain}</p>
                    <p className="text-sm text-muted-foreground">
                      1 year registration
                    </p>
                  </div>
                  <p className="font-semibold text-foreground">
                    {formatPrice(convertedPrice, currency)}
                  </p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>{t("checkout.total")}</span>
                  <span className="text-primary">
                    {formatPrice(convertedPrice, currency)}
                  </span>
                </div>
              </div>
            </Card>
            {/* Payment Card below */}
            <Card className="p-6 h-fit">
              <h2 className="text-xl font-semibold mb-6">
                Payment Information
              </h2>
              <div className="space-y-4">
                {/* Payment Method Dropdown */}
                <Select value={payment} onValueChange={setPayment} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Payment Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">
                      <span className="inline-flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Choose Payment Method
                      </span>
                    </SelectItem>
                    <SelectItem value="visa">
                      <span className="inline-flex items-center gap-2">
                        <CreditCard className="w-4 h-4" /> Visa/Master Card
                      </span>
                    </SelectItem>
                    <SelectItem value="paypal">
                      <span className="inline-flex items-center gap-2">
                        <Strikethrough className="w-4 h-4" /> PayPal
                      </span>
                    </SelectItem>
                    <SelectItem value="apple">
                      <span className="inline-flex items-center gap-2">
                        <Apple className="w-4 h-4" /> Apple Pay
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="p-4 bg-muted rounded-lg border border-dashed">
                  {/* Payment Method Image/Prompt */}
                  <div className="flex flex-col items-center gap-2 min-h-[48px]">
                    {payment === "no" && (
                      <>
                        <span className="text-3xl">💳</span>
                        <span className="text-muted-foreground">
                          Choose Payment Method
                        </span>
                      </>
                    )}
                    {payment === "visa" && (
                      <img
                      src="/visa.png"
                      alt="Visa/Master Card"
                      width={100}
                      height={70}
                      />
                    )}
                    {payment === "paypal" && (
                      <img
                      src="/paypal.png"
                      alt="PayPal"
                      width={140}
                      height={70}
                      />
                    )}
                    {payment === "apple" && (
                      <img
                      src="/applepay.png"
                      alt="Apple Pay"
                      width={140}
                      height={100}
                      />
                    )}
                  </div>
                </div>

                <div className="bg-accent/20 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Selected Currency:</strong> {currency} (
                    {t(`currency.${currency.toLowerCase()}`)})
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Domain:</strong> {domain}
                  </p>
                  <p className="text-sm mt-1">
                    <strong>Total:</strong>{" "}
                    {formatPrice(convertedPrice, currency)}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
