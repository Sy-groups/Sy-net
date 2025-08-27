import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '@/contexts/AppContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/services/domainService';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Checkout() {
  const { t } = useTranslation();
  const { currency, convertPrice } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const domain = searchParams.get('domain') || '';
  const price = parseFloat(searchParams.get('price') || '0');
  
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  const convertedPrice = convertPrice(price);

  const handleCheckout = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    setCompleted(true);
    
    toast({
      title: t('checkout.success'),
      description: `${domain} has been registered successfully!`,
    });
  };

  if (!domain || !price) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('common.error')}</h1>
          <Button onClick={() => navigate('/')} variant="hero">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
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
            {t('checkout.success')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your domain <strong>{domain}</strong> has been registered successfully!
          </p>
          <Button onClick={() => navigate('/')} variant="hero" size="lg">
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
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
          
          <h1 className="text-3xl font-bold">
            {t('checkout.title')}
          </h1>
        </div>

        {/* Order Summary */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{domain}</p>
                  <p className="text-sm text-muted-foreground">1 year registration</p>
                </div>
                <p className="font-semibold text-foreground">
                  {formatPrice(convertedPrice, currency)}
                </p>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between text-lg font-bold">
                <span>{t('checkout.total')}</span>
                <span className="text-primary">
                  {formatPrice(convertedPrice, currency)}
                </span>
              </div>
            </div>
          </Card>

          {/* Payment Form */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg border border-dashed">
                <p className="text-center text-muted-foreground">
                  💳 Payment integration placeholder
                </p>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  In a real application, this would integrate with Stripe, PayPal, or other payment providers
                </p>
              </div>
              
              <div className="bg-accent/20 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Selected Currency:</strong> {currency} ({t(`currency.${currency.toLowerCase()}`)})
                </p>
                <p className="text-sm mt-1">
                  <strong>Domain:</strong> {domain}
                </p>
                <p className="text-sm mt-1">
                  <strong>Total:</strong> {formatPrice(convertedPrice, currency)}
                </p>
              </div>
              
              <Button 
                variant="luxury" 
                size="lg" 
                className="w-full"
                onClick={handleCheckout}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  t('checkout.continue')
                )}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                This is a demo checkout. No actual payment will be processed.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}