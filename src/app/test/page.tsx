import ThemeGenerator from '@/components/ThemeGenerator';

export default function TestPage() {
  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: 'var(--background-color)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text-color)' }}>
          Theme Generator Test Page
        </h1>
        
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--secondary-color)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-color)' }}>
            Sample Content
          </h2>
          <p style={{ color: 'var(--text-color)' }}>
            This is a sample paragraph that will change color based on the generated theme.
            The background and text colors will update automatically when you generate a new theme.
          </p>
          <button 
            className="mt-4 px-4 py-2 rounded"
            style={{ 
              backgroundColor: 'var(--primary-color)',
              color: 'var(--text-color)'
            }}
          >
            Sample Button
          </button>
        </div>

        <ThemeGenerator />
      </div>
    </main>
  );
} 