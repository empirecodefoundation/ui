# AIDocumentAnalyzer Component

A comprehensive AI-powered document analysis component for EmpireUI that combines document upload, text extraction, OCR capabilities, and intelligent content analysis using large language models.

## Features

### 🚀 Core Capabilities
- **Multi-format Support**: PDF, images (PNG, JPG, JPEG), text files, and DOCX
- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **OCR Integration**: Extract text from images using AI-powered OCR services
- **AI Analysis**: Comprehensive content analysis using OpenAI GPT-4 or compatible LLMs
- **Real-time Progress**: Live updates during document processing
- **Export Results**: Download analysis results in JSON format

### 🧠 AI-Powered Analysis
- **Smart Summarization**: Generate concise summaries of document content
- **Sentiment Analysis**: Detect positive, negative, or neutral sentiment
- **Entity Extraction**: Identify people, places, organizations, and other entities
- **Topic Detection**: Discover main themes and topics in the content
- **Key Points**: Extract the most important points from the document
- **Readability Scoring**: Assess document readability on a 1-10 scale
- **Confidence Metrics**: AI confidence scores for analysis reliability

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Automatic adaptation to user's color scheme preference
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Error Handling**: Comprehensive error messages and recovery options
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## Installation

```bash
npx @empireui/empire-ui add AIDocumentAnalyzer
```

## Usage

### Basic Implementation

```tsx
import { AIDocumentAnalyzer } from "@/components/ui/AIDocumentAnalyzer";

function DocumentAnalysisPage() {
  const handleAnalysisComplete = (result) => {
    console.log("Analysis completed:", result);
    // Handle the analysis result
  };

  return (
    <div className="container mx-auto py-8">
      <AIDocumentAnalyzer
        onAnalysisComplete={handleAnalysisComplete}
        maxFileSize={10}
        acceptedFileTypes={[".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"]}
      />
    </div>
  );
}
```

### Advanced Configuration

```tsx
import { AIDocumentAnalyzer } from "@/components/ui/AIDocumentAnalyzer";

function AdvancedAnalysisPage() {
  const handleAnalysisComplete = (result) => {
    // Store results in state management
    // Send to analytics
    // Update UI with insights
  };

  return (
    <AIDocumentAnalyzer
      className="max-w-6xl"
      onAnalysisComplete={handleAnalysisComplete}
      maxFileSize={25} // 25MB limit
      acceptedFileTypes={[".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx", ".rtf"]}
      apiEndpoint="/api/custom-document-analyzer"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `undefined` | Additional CSS classes for styling |
| `onAnalysisComplete` | `(result: AnalysisResult) => void` | `undefined` | Callback fired when analysis completes |
| `maxFileSize` | `number` | `10` | Maximum file size in MB |
| `acceptedFileTypes` | `string[]` | `[".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"]` | Allowed file extensions |
| `apiEndpoint` | `string` | `"/api/ai-document-analyzer"` | API endpoint for document processing |

## Analysis Result Interface

```typescript
interface AnalysisResult {
  summary: string;                    // AI-generated summary
  keyPoints: string[];               // Important points extracted
  sentiment: "positive" | "negative" | "neutral"; // Overall sentiment
  entities: string[];                // Named entities found
  topics: string[];                  // Main topics/themes
  readabilityScore: number;          // Readability score (1-10)
  wordCount: number;                 // Total word count
  confidence: number;                // AI confidence (0-1)
}
```

## API Setup

### Environment Variables

Create a `.env.local` file in your project root:

```env
# Required for AI analysis
OPENAI_API_KEY=your_openai_api_key_here

# Optional for enhanced OCR
OCR_API_KEY=your_ocr_service_api_key
GOOGLE_CLOUD_VISION_API_KEY=your_google_vision_key
```

### API Route Implementation

The component automatically creates an API route at `/api/ai-document-analyzer/route.ts` when installed via CLI. The route handles:

1. **File Upload & Validation**: Size and type checking
2. **Text Extraction**: PDF parsing, OCR for images, direct text reading
3. **AI Analysis**: OpenAI GPT-4 integration for content analysis
4. **Response Formatting**: Structured JSON response with analysis results

### Custom OCR Integration

To enhance OCR capabilities, you can integrate with various services:

```typescript
// Google Cloud Vision API
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

// Tesseract.js for client-side OCR
import Tesseract from 'tesseract.js';

// Azure Computer Vision
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
```

## Styling

The component includes comprehensive CSS with:
- CSS custom properties for easy theming
- Responsive breakpoints
- Dark mode support
- Smooth animations and transitions
- Accessibility-focused design

### Custom Styling

```css
.ai-document-analyzer {
  --primary-color: #your-brand-color;
  --border-radius: 12px;
  --animation-duration: 0.3s;
}
```

## Dependencies

### Required
- React 18+
- Next.js 13+ (App Router)
- Framer Motion
- Lucide React (icons)
- Tailwind CSS

### Optional
- pdf-parse (for PDF text extraction)
- tesseract.js (for client-side OCR)
- @google-cloud/vision (for Google Cloud OCR)
- @azure/cognitiveservices-computervision (for Azure OCR)

## Examples

### Integration with State Management

```tsx
import { useDocumentAnalysis } from "@/hooks/useDocumentAnalysis";

function DocumentDashboard() {
  const { analyses, addAnalysis, exportAnalysis } = useDocumentAnalysis();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <AIDocumentAnalyzer
        onAnalysisComplete={addAnalysis}
        className="lg:col-span-1"
      />
      <AnalysisHistory 
        analyses={analyses}
        onExport={exportAnalysis}
      />
    </div>
  );
}
```

### Batch Processing

```tsx
function BatchDocumentProcessor() {
  const [queue, setQueue] = useState([]);
  const [processing, setProcessing] = useState(false);

  const processQueue = async () => {
    setProcessing(true);
    for (const file of queue) {
      // Process each file
      await analyzeDocument(file);
    }
    setProcessing(false);
  };

  return (
    <div>
      <AIDocumentAnalyzer
        onAnalysisComplete={(result) => {
          // Add to batch results
        }}
      />
      <BatchControls 
        queue={queue}
        processing={processing}
        onProcess={processQueue}
      />
    </div>
  );
}
```

## Performance Considerations

- **File Size Limits**: Default 10MB, configurable up to 25MB
- **Rate Limiting**: Implement API rate limiting for production use
- **Caching**: Consider caching analysis results for identical documents
- **Streaming**: For large documents, consider streaming responses
- **Error Recovery**: Implement retry logic for failed analyses

## Security

- **File Validation**: Strict file type and size validation
- **API Security**: Implement authentication and authorization
- **Data Privacy**: Consider data retention policies for uploaded documents
- **Rate Limiting**: Prevent abuse with proper rate limiting
- **Input Sanitization**: Sanitize extracted text before AI processing

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This component is part of EmpireUI. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

- [Documentation](https://empireui.com/docs/components/ai-document-analyzer)
- [GitHub Issues](https://github.com/empirecodefoundation/ui/issues)
- [Discord Community](https://discord.gg/empireui)
