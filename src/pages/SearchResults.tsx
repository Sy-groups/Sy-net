import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '@/contexts/AppContext';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { checkDomainAvailability, formatPrice, type DomainResult } from '@/services/domainService';
import { Loader2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export default function SearchResults() {
  const { t } = useTranslation();
  const { currency, convertPrice } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const domain = searchParams.get('domain') || '';
  
  const [results, setResults] = useState<DomainResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (domain) {
      searchDomains();
    }
  }, [domain]);

  const searchDomains = async () => {
    try {
      setLoading(true);
      setError('');
      const domainResults = await checkDomainAvailability(domain);
      setResults(domainResults);
    } catch (err) {
      setError(t('common.error'));
      console.error('Error searching domains:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (domainResult: DomainResult) => {
    const params = new URLSearchParams({
      domain: domainResult.domain,
      price: domainResult.price.toString(),
    });
    navigate(`/checkout?${params.toString()}`);
  };

  if (!domain) {
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('common.back')}
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">
            {t('search.results')} "{domain}"
          </h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">{t('search.searching')}</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{error}</p>
            <Button variant="hero" onClick={searchDomains}>
              {t('common.tryAgain')}
            </Button>
          </div>
        )}

        {/* Results */}
        {!loading && !error && results.length > 0 && (
          <div className="grid gap-4">
            {results.map((result) => (
              <Card key={result.domain} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {result.available ? (
                      <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                    )}
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {result.domain}
                      </h3>
                      <p className={`text-sm font-medium ${result.available ? 'text-secondary' : 'text-destructive'}`}>
                        {result.available ? t('search.available') : t('search.taken')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {result.available && (
                      <>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">
                            {formatPrice(convertPrice(result.price), currency)}
                          </p>
                          <p className="text-sm text-muted-foreground">/year</p>
                        </div>
                        
                        <Button 
                          variant="hero"
                          onClick={() => handleRegister(result)}
                        >
                          {t('search.register')}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">{t('search.noResults')}</p>
            <Button variant="hero" onClick={() => navigate('/')}>
              {t('common.back')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}