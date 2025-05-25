import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Edit3 } from "lucide-react";

interface FieldSchema {
  id: string;
  label: string;
  type: "text" | "email" | "number" | "textarea" | "boolean" | "select" | "tel" | "url";
  required?: boolean;
  placeholder?: string;
  options?: string[]; // For select fields
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface FormData {
  [key: string]: string | number | boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export default function SmartFormBuilder() {
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState<FieldSchema[]>([]);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [darkMode, setDarkMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Enhanced field generation logic
  const generateFields = useCallback(async () => {
    if (!description.trim()) return;
    
    setIsGenerating(true);
    const desc = description.toLowerCase();
    const newFields: FieldSchema[] = [];

    // More sophisticated field detection
    const fieldPatterns = [
      {
        keywords: ["email", "e-mail", "mail"],
        field: {
          label: "Email Address",
          type: "email" as const,
          required: true,
          placeholder: "Enter your email address",
        }
      },
      {
        keywords: ["first name", "firstname", "given name"],
        field: {
          label: "First Name",
          type: "text" as const,
          required: true,
          placeholder: "Enter your first name",
          minLength: 2,
          maxLength: 50
        }
      },
      {
        keywords: ["last name", "lastname", "surname", "family name"],
        field: {
          label: "Last Name",
          type: "text" as const,
          required: true,
          placeholder: "Enter your last name",
          minLength: 2,
          maxLength: 50
        }
      },
      {
        keywords: ["full name", "name", "your name"],
        field: {
          label: "Full Name",
          type: "text" as const,
          required: true,
          placeholder: "Enter your full name",
          minLength: 2,
          maxLength: 100
        }
      },
      {
        keywords: ["phone", "telephone", "mobile", "contact number"],
        field: {
          label: "Phone Number",
          type: "tel" as const,
          placeholder: "Enter your phone number",
        }
      },
      {
        keywords: ["age", "years old"],
        field: {
          label: "Age",
          type: "number" as const,
          placeholder: "Enter your age",
          min: 1,
          max: 120
        }
      },
      {
        keywords: ["website", "url", "site"],
        field: {
          label: "Website",
          type: "url" as const,
          placeholder: "https://example.com",
        }
      },
      {
        keywords: ["message", "feedback", "comment", "description"],
        field: {
          label: "Message",
          type: "textarea" as const,
          placeholder: "Enter your message here...",
          maxLength: 1000
        }
      },
      {
        keywords: ["terms", "agreement", "accept", "privacy"],
        field: {
          label: "I accept the terms and conditions",
          type: "boolean" as const,
          required: true,
        }
      },
      {
        keywords: ["country", "nationality"],
        field: {
          label: "Country",
          type: "select" as const,
          options: ["United States", "Canada", "United Kingdom", "Australia", "Other"],
          placeholder: "Select your country",
        }
      }
    ];

    // Generate fields based on patterns
    fieldPatterns.forEach((pattern, index) => {
      if (pattern.keywords.some(keyword => desc.includes(keyword))) {
        const fieldExists = newFields.some(field => 
          field.label.toLowerCase().includes(pattern.keywords[0])
        );
        
        if (!fieldExists) {
          newFields.push({
            ...pattern.field,
            id: `field_${Date.now()}_${index}`
          });
        }
      }
    });

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFields(newFields);
    setFormData({});
    setErrors({});
    setIsGenerating(false);
  }, [description]);

  // Enhanced validation with better error messages
  const validate = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    fields.forEach((field) => {
      const value = formData[field.id];
      
      // Required field validation
      if (field.required && (value === undefined || value === "" || value === false)) {
        newErrors[field.id] = `${field.label} is required`;
        return;
      }

      if (value !== undefined && value !== "") {
        // Type-specific validation
        switch (field.type) {
          case "email":
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
              newErrors[field.id] = "Please enter a valid email address";
            }
            break;
          
          case "tel":
            if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(value as string)) {
              newErrors[field.id] = "Please enter a valid phone number";
            }
            break;
          
          case "url":
            try {
              new URL(value as string);
            } catch {
              newErrors[field.id] = "Please enter a valid URL";
            }
            break;
          
          case "number":
            const numValue = Number(value);
            if (isNaN(numValue)) {
              newErrors[field.id] = "Please enter a valid number";
            } else {
              if (field.min !== undefined && numValue < field.min) {
                newErrors[field.id] = `Value must be at least ${field.min}`;
              }
              if (field.max !== undefined && numValue > field.max) {
                newErrors[field.id] = `Value must be at most ${field.max}`;
              }
            }
            break;
          
          case "text":
          case "textarea":
            const strValue = value as string;
            if (field.minLength && strValue.length < field.minLength) {
              newErrors[field.id] = `Must be at least ${field.minLength} characters`;
            }
            if (field.maxLength && strValue.length > field.maxLength) {
              newErrors[field.id] = `Must be at most ${field.maxLength} characters`;
            }
            break;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, formData]);

  // Handle input changes with proper typing
  const handleChange = useCallback((fieldId: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  }, [errors]);

  // Enhanced form submission
  const handleSubmit = useCallback(() => {
    if (validate()) {
      const submissionData = fields.reduce((acc, field) => {
        acc[field.label] = formData[field.id];
        return acc;
      }, {} as Record<string, any>);

      console.log("Form submitted:", submissionData);
      alert(
        "Form submitted successfully!\n\n" +
        "Data:\n" + JSON.stringify(submissionData, null, 2)
      );
    }
  }, [validate, fields, formData]);

  // Field management functions
  const addCustomField = useCallback(() => {
    const newField: FieldSchema = {
      id: `custom_${Date.now()}`,
      label: "New Field",
      type: "text",
      placeholder: "Enter value",
    };
    setFields(prev => [...prev, newField]);
    setEditingField(newField.id);
  }, []);

  const removeField = useCallback((fieldId: string) => {
    if (window.confirm("Are you sure you want to remove this field?")) {
      setFields(prev => prev.filter(field => field.id !== fieldId));
      setFormData(prev => {
        const newData = { ...prev };
        delete newData[fieldId];
        return newData;
      });
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  }, []);

  const updateField = useCallback((fieldId: string, updates: Partial<FieldSchema>) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
    setEditingField(null);
  }, []);

  // Field reordering with bounds checking
  const moveField = useCallback((index: number, delta: number) => {
    const newIndex = index + delta;
    if (newIndex < 0 || newIndex >= fields.length) return;

    setFields(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(index, 1);
      updated.splice(newIndex, 0, moved);
      return updated;
    });
  }, [fields.length]);

  // Enhanced reset with confirmation
  const handleReset = useCallback(() => {
    if (Object.keys(formData).length > 0) {
      if (window.confirm("Are you sure you want to reset all form data?")) {
        setFormData({});
        setErrors({});
      }
    }
  }, [formData]);

  // Download schema with better error handling
  const downloadSchema = useCallback(() => {
    try {
      const schema = {
        fields: fields.map(({ id, ...field }) => field),
        generatedAt: new Date().toISOString(),
        description
      };
      
      const blob = new Blob([JSON.stringify(schema, null, 2)], {
        type: "application/json",
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `form-schema-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert("Error downloading schema. Please try again.");
    }
  }, [fields, description]);

  // Memoized computed values
  const hasFields = useMemo(() => fields.length > 0, [fields.length]);
  const hasFormData = useMemo(() => Object.keys(formData).length > 0, [formData]);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-50 text-gray-900"
    }`}>
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Smart Form Builder</h1>
          <div className="flex items-center space-x-2">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>

        {/* Form Generator */}
        <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="description" className="text-lg font-medium">
                Describe Your Form
              </Label>
              <Textarea
                id="description"
                placeholder="e.g., 'Contact form with name, email, phone, message, and terms acceptance'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={generateFields} 
                disabled={!description.trim() || isGenerating}
                className="min-w-24"
              >
                {isGenerating ? "Generating..." : "Generate Fields"}
              </Button>
              
              <Button
                variant="outline"
                onClick={addCustomField}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Field
              </Button>
              
              {hasFields && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={downloadSchema}
                  >
                    Download Schema
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated Form */}
        {hasFields && (
          <Card className={`mt-6 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Form Fields</h2>
                <span className="text-sm text-gray-500">
                  {fields.length} field{fields.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="space-y-4">
                {fields.map((field, idx) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    index={idx}
                    value={formData[field.id]}
                    error={errors[field.id]}
                    isEditing={editingField === field.id}
                    canMoveUp={idx > 0}
                    canMoveDown={idx < fields.length - 1}
                    darkMode={darkMode}
                    onChange={(value) => handleChange(field.id, value)}
                    onEdit={() => setEditingField(field.id)}
                    onUpdate={(updates) => updateField(field.id, updates)}
                    onRemove={() => removeField(field.id)}
                    onMoveUp={() => moveField(idx, -1)}
                    onMoveDown={() => moveField(idx, 1)}
                    onCancelEdit={() => setEditingField(null)}
                  />
                ))}
              </div>
              
              <div className="flex gap-2 mt-6 pt-4 border-t">
                <Button onClick={handleSubmit} className="flex-1">
                  Submit Form
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={!hasFormData}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Panel */}
        {showPreview && hasFields && (
          <Card className={`mt-6 ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Form Preview</h3>
              <div className="space-y-4 opacity-75">
                {fields.map((field) => (
                  <div key={`preview-${field.id}`}>
                    <Label className="block font-medium mb-1">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    <PreviewField field={field} darkMode={darkMode} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Field Renderer Component
interface FieldRendererProps {
  field: FieldSchema;
  index: number;
  value: any;
  error?: string;
  isEditing: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  darkMode: boolean;
  onChange: (value: any) => void;
  onEdit: () => void;
  onUpdate: (updates: Partial<FieldSchema>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onCancelEdit: () => void;
}

function FieldRenderer({
  field,
  value,
  error,
  isEditing,
  canMoveUp,
  canMoveDown,
  darkMode,
  onChange,
  onEdit,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  onCancelEdit
}: FieldRendererProps) {
  const [editLabel, setEditLabel] = useState(field.label);
  const [editType, setEditType] = useState(field.type);
  const [editRequired, setEditRequired] = useState(field.required || false);
  const [editPlaceholder, setEditPlaceholder] = useState(field.placeholder || "");

  const handleSaveEdit = () => {
    onUpdate({
      label: editLabel,
      type: editType,
      required: editRequired,
      placeholder: editPlaceholder
    });
  };

  if (isEditing) {
    return (
      <div className={`p-4 border rounded-lg ${darkMode ? "border-gray-600 bg-gray-750" : "border-gray-300 bg-gray-50"}`}>
        <div className="space-y-3">
          <div>
            <Label>Field Label</Label>
            <Input
              value={editLabel}
              onChange={(e) => setEditLabel(e.target.value)}
              placeholder="Enter field label"
            />
          </div>
          
          <div>
            <Label>Field Type</Label>
            <Select value={editType} onValueChange={(value: any) => setEditType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="tel">Phone</SelectItem>
                <SelectItem value="url">URL</SelectItem>
                <SelectItem value="textarea">Textarea</SelectItem>
                <SelectItem value="boolean">Checkbox</SelectItem>
                <SelectItem value="select">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Placeholder</Label>
            <Input
              value={editPlaceholder}
              onChange={(e) => setEditPlaceholder(e.target.value)}
              placeholder="Enter placeholder text"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              checked={editRequired}
              onCheckedChange={setEditRequired}
            />
            <Label>Required field</Label>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSaveEdit} size="sm">Save</Button>
            <Button onClick={onCancelEdit} variant="outline" size="sm">Cancel</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded-lg ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
      <div className="flex justify-between items-start mb-2">
        <Label className="font-medium">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={onEdit}
          >
            <Edit3 className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onMoveUp}
            disabled={!canMoveUp}
          >
            ↑
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onMoveDown}
            disabled={!canMoveDown}
          >
            ↓
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <FormField field={field} value={value} onChange={onChange} />
      
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}


interface FormFieldProps {
  field: FieldSchema;
  value: any;
  onChange: (value: any) => void;
}

function FormField({ field, value, onChange }: FormFieldProps) {
  switch (field.type) {
    case "textarea":
      return (
        <Textarea
          placeholder={field.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          maxLength={field.maxLength}
        />
      );
    
    case "boolean":
      return (
        <div className="flex items-center space-x-2">
          <Switch
            checked={value || false}
            onCheckedChange={onChange}
          />
          <Label className="text-sm">{field.placeholder || "Check to agree"}</Label>
        </div>
      );
    
    case "select":
      return (
        <Select value={value || ""} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    
    case "number":
      return (
        <Input
          type="number"
          placeholder={field.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : "")}
          min={field.min}
          max={field.max}
        />
      );
    
    default:
      return (
        <Input
          type={field.type}
          placeholder={field.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          minLength={field.minLength}
          maxLength={field.maxLength}
        />
      );
  }
}

// Preview Field Component
interface PreviewFieldProps {
  field: FieldSchema;
  darkMode: boolean;
}

function PreviewField({ field }: PreviewFieldProps) {
  switch (field.type) {
    case "textarea":
      return <Textarea disabled placeholder={field.placeholder} />;
    
    case "boolean":
      return (
        <div className="flex items-center space-x-2">
          <Switch disabled checked={false} />
          <Label className="text-sm">{field.placeholder || "Check to agree"}</Label>
        </div>
      );
    
    case "select":
      return (
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder={field.placeholder || "Select an option"} />
          </SelectTrigger>
        </Select>
      );
    
    default:
      return (
        <Input
          disabled
          type={field.type}
          placeholder={field.placeholder}
        />
      );
  }
}
