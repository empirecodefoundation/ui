export default function TemplatesPage() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
          🚧 Under Construction 🚧
        </div>
        <p className="text-lg text-gray-400">
          We are working hard to make this page awesome for you!
        </p>
        <div className="mt-6">
          <a
            href="templates/ocr"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            Go to OCR Page
          </a>
        </div>
      </div>
    </div>
  );
}