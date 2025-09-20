import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Landing from "./pages/Landing";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Domains from "./pages/Domains";
import Pricing from "./pages/Pricing";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.VITE_BASE_PATH || "/Sy-Net/"}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
