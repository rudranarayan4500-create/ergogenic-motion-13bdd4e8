import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@radix-ui')) return 'radix';
            if (id.includes('sonner') || id.includes('next-themes')) return 'vendor';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('@tanstack/react-query')) return 'query';
            return 'vendor';
          }
          if (id.includes('src/pages/Admin')) return 'admin';
          if (id.includes('src/pages/Products') || id.includes('src/pages/ProductDetail')) return 'products';
          if (id.includes('src/pages/Cart') || id.includes('src/pages/Checkout')) return 'cart';
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
}));
