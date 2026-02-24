"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function BookIngestionPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<Record<string, string | number> | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        processImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setExtractedData({
        isbn: "978-0-7432-7356-5",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publisher: "Scribner",
        year: "2004",
        deweyClass: "813.52",
        deweyCategory: "American fiction",
        confidence: 94,
        suggestedLocation: "Section B, Shelf 3",
      });
      setIsProcessing(false);
    }, 2500);
  };

  const handleAccept = () => {
    // Mock acceptance - would save to database
    alert("Book added to catalog successfully!");
    setUploadedImage(null);
    setExtractedData(null);
  };

  const handleReject = () => {
    setUploadedImage(null);
    setExtractedData(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">AI-Assisted Book Ingestion</h1>
        <p className="text-gray-600">Upload book cover or spine images for automatic cataloging</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Book Image</CardTitle>
            <CardDescription>
              Take a clear photo of the book cover or spine showing the ISBN if visible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!uploadedImage ? (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-sm font-medium mb-1">Click to upload book image</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={uploadedImage} alt="Uploaded book" className="w-full h-64 object-contain bg-gray-50" />
                  </div>
                  {isProcessing && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                        <span className="text-gray-700">AI processing image...</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setUploadedImage(null);
                      setExtractedData(null);
                    }}
                    disabled={isProcessing}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Upload Different Image
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Extracted Data Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Extracted Metadata
            </CardTitle>
            <CardDescription>
              AI-generated data ready for review
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!extractedData && !isProcessing && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">Upload an image to see extracted data</p>
              </div>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mb-4" />
                <p className="text-sm text-gray-600">Analyzing image with AI...</p>
              </div>
            )}

            {extractedData && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">ISBN Detected</p>
                    <p className="text-xs text-green-700">Confidence: {extractedData.confidence}%</p>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    High
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-500">ISBN</Label>
                    <Input value={extractedData.isbn as string} readOnly className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Title</Label>
                    <Input value={extractedData.title as string} className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Author</Label>
                    <Input value={extractedData.author as string} className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-500">Publisher</Label>
                      <Input value={extractedData.publisher as string} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Year</Label>
                      <Input value={extractedData.year as string} className="mt-1" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-500">Dewey Decimal</Label>
                      <Input value={extractedData.deweyClass as string} className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">Category</Label>
                      <Input value={extractedData.deweyCategory as string} className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Suggested Location</Label>
                    <Input value={extractedData.suggestedLocation as string} readOnly className="mt-1 bg-indigo-50" />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleAccept} className="flex-1">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Accept & Add to Catalog
                  </Button>
                  <Button variant="outline" onClick={handleReject}>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Books ingested today</p>
                <p className="text-2xl font-semibold">24</p>
              </div>
              <div className="text-green-600 text-sm font-medium">+12%</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average confidence</p>
                <p className="text-2xl font-semibold">92%</p>
              </div>
              <Badge variant="outline">High</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Time saved</p>
                <p className="text-2xl font-semibold">3.2hrs</p>
              </div>
              <div className="text-indigo-600 text-sm font-medium">vs manual</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
