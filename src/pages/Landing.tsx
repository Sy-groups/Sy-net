import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  Shield, 
  Headphones, 
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useState } from 'react';

export default function Landing() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      
      {/* Why Choose Us Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {t('landing.whyChooseUs.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.whyChooseUs.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card rounded-2xl shadow-elegant border border-border hover:shadow-luxury transition-smooth">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {t('landing.whyChooseUs.fastRegistration.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('landing.whyChooseUs.fastRegistration.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 bg-card rounded-2xl shadow-elegant border border-border hover:shadow-luxury transition-smooth">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {t('landing.whyChooseUs.securePlatform.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('landing.whyChooseUs.securePlatform.description')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 bg-card rounded-2xl shadow-elegant border border-border hover:shadow-luxury transition-smooth">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Headphones className="text-luxury-black w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {t('landing.whyChooseUs.premiumSupport.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('landing.whyChooseUs.premiumSupport.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {t('landing.reviews.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.reviews.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card rounded-2xl shadow-elegant border border-border">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{t('landing.reviews.review1.text')}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {t('landing.reviews.review1.author')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('landing.reviews.review1.role')}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 bg-card rounded-2xl shadow-elegant border border-border">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{t('landing.reviews.review2.text')}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {t('landing.reviews.review2.author')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('landing.reviews.review2.role')}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 bg-card rounded-2xl shadow-elegant border border-border">
              <CardContent className="p-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{t('landing.reviews.review3.text')}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">
                    {t('landing.reviews.review3.author')}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('landing.reviews.review3.role')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              {t('landing.faq.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('landing.faq.subtitle')}
            </p>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4].map((num) => (
              <Card key={num} className="border border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(num)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-semibold text-foreground">
                      {t(`landing.faq.q${num}.question`)}
                    </h3>
                    {openFaq === num ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  {openFaq === num && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground">
                        {t(`landing.faq.q${num}.answer`)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Links Section */}
            <div>
              <h3 className="font-bold text-foreground mb-6">
                {t('nav.domains')}
              </h3>
              <div className="space-y-3">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  {t('landing.footer.links.domains')}
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  {t('landing.footer.links.pricing')}
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  {t('landing.footer.links.support')}
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  {t('landing.footer.links.privacy')}
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  {t('landing.footer.links.terms')}
                </a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                  {t('landing.footer.links.contact')}
                </a>
              </div>
            </div>
            
            {/* Logo Placeholder */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-luxury rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">SN</span>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2024 Sy-net. All rights reserved.
              </p>
            </div>
            
            {/* About Us */}
            <div>
              <h3 className="font-bold text-foreground mb-6">
                {t('common.about', 'About Us')}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('landing.footer.about')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}