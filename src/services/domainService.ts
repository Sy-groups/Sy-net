import axios from 'axios';

export interface DomainResult {
  domain: string;
  available: boolean;
  price: number; // Price in EUR
  extension: string;
}

// Mock domain prices (in EUR)
const DOMAIN_PRICES: Record<string, number> = {
  '.com': 12.99,
  '.net': 14.99,
  '.org': 13.99,
  '.sy': 25.99,
  '.info': 11.99,
  '.biz': 16.99,
  '.me': 19.99,
  '.co': 29.99,
};

// Mock function to simulate domain availability check
// In a real app, this would call a WHOIS API
export async function checkDomainAvailability(domainName: string): Promise<DomainResult[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const cleanDomain = domainName.toLowerCase().replace(/\s+/g, '').replace(/\.$/, '');
  const results: DomainResult[] = [];
  
  // Check popular extensions
  const extensions = ['.com', '.net', '.org', '.sy', '.info', '.biz', '.me', '.co'];
  
  for (const extension of extensions) {
    const fullDomain = cleanDomain + extension;
    
    // Mock availability (randomly generate for demo)
    // In reality, this would be based on actual WHOIS data
    const available = Math.random() > 0.3; // 70% chance of being available
    
    results.push({
      domain: fullDomain,
      available,
      price: DOMAIN_PRICES[extension] || 15.99,
      extension,
    });
  }
  
  return results;
}

// Mock function for real WHOIS API integration
// Replace this with actual API calls when integrating with a real service
export async function checkDomainWithRealAPI(domain: string): Promise<DomainResult> {
  try {
    // Example using a hypothetical WHOIS API
    // const response = await axios.get(`https://api.whoisapi.com/v1/whois?domainName=${domain}&apiKey=YOUR_API_KEY`);
    
    // For now, return mock data
    return {
      domain,
      available: Math.random() > 0.5,
      price: 12.99,
      extension: domain.substring(domain.lastIndexOf('.')),
    };
  } catch (error) {
    console.error('Error checking domain:', error);
    throw new Error('Failed to check domain availability');
  }
}

export function formatPrice(price: number, currency: string): string {
  if (currency === 'EUR') {
    return `€${price.toFixed(2)}`;
  } else if (currency === 'SYP') {
    return `${(price * 2800).toLocaleString()} ل.س`;
  }
  return `${price.toFixed(2)} ${currency}`;
}