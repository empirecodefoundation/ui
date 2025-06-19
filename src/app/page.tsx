import ThemeGenerator from '@/components/ThemeGenerator';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          AuraTheme Generator
        </h1>
        <p className="text-lg text-center mb-12 text-gray-600">
          Generate beautiful color themes using AI. Simply describe your desired theme, and let our AI create a perfect color palette for you.
        </p>
        <ThemeGenerator />
      </div>
    </main>
  );
} 