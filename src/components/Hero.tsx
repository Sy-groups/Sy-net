import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?domain=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzAwMDAwMCIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIvPgo8L2c+CjwvZz4KPHN2Zz4=')] opacity-20"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-luxury bg-clip-text text-transparent leading-tight">
          {t('hero.title')}
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 p-2 bg-card rounded-2xl shadow-elegant border border-border">
            <Input
              type="text"
              placeholder={t('hero.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-0 bg-transparent text-lg h-14 px-6 focus-visible:ring-0"
            />
            <Button 
              type="submit" 
              variant="hero" 
              size="xl"
              className="sm:w-auto"
            >
              <Search className="w-5 h-5 mr-2" />
              {t('hero.searchButton')}
            </Button>
          </div>
        </form>

        {/* Popular Extensions */}
        <p className="text-muted-foreground">
          {t('hero.popularExtensions')}
        </p>
      </div>
    </section>
  );
}