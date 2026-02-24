"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, MapPin, AlertTriangle, Lightbulb } from "lucide-react";

interface ShelfSection {
  id: string;
  name: string;
  category: string;
  capacity: number;
  used: number;
  x: number;
  y: number;
  width: number;
  height: number;
  books: Array<{ title: string; author: string; dewey: string }>;
}

export default function LibraryMapPage() {
  const [selectedSection, setSelectedSection] = useState<ShelfSection | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "shelf">("map");

  const sections: ShelfSection[] = [
    {
      id: "A1",
      name: "Section A-1",
      category: "Fiction A-D",
      capacity: 150,
      used: 142,
      x: 50,
      y: 100,
      width: 120,
      height: 60,
      books: [
        { title: "Pride and Prejudice", author: "Jane Austen", dewey: "823.7" },
        { title: "The Catcher in the Rye", author: "J.D. Salinger", dewey: "813.54" },
        { title: "Animal Farm", author: "George Orwell", dewey: "823.912" },
      ],
    },
    {
      id: "A2",
      name: "Section A-2",
      category: "Fiction E-K",
      capacity: 150,
      used: 98,
      x: 190,
      y: 100,
      width: 120,
      height: 60,
      books: [
        { title: "The Great Gatsby", author: "F. Scott Fitzgerald", dewey: "813.52" },
        { title: "Brave New World", author: "Aldous Huxley", dewey: "823.912" },
      ],
    },
    {
      id: "B1",
      name: "Section B-1",
      category: "Fiction L-R",
      capacity: 150,
      used: 134,
      x: 50,
      y: 200,
      width: 120,
      height: 60,
      books: [
        { title: "To Kill a Mockingbird", author: "Harper Lee", dewey: "813.54" },
        { title: "1984", author: "George Orwell", dewey: "823.912" },
      ],
    },
    {
      id: "B2",
      name: "Section B-2",
      category: "Fiction S-Z",
      capacity: 150,
      used: 141,
      x: 190,
      y: 200,
      width: 120,
      height: 60,
      books: [
        { title: "The Hobbit", author: "J.R.R. Tolkien", dewey: "823.912" },
      ],
    },
    {
      id: "C1",
      name: "Section C-1",
      category: "Non-Fiction 000-500",
      capacity: 200,
      used: 165,
      x: 350,
      y: 100,
      width: 120,
      height: 60,
      books: [
        { title: "A Brief History of Time", author: "Stephen Hawking", dewey: "530.1" },
        { title: "Sapiens", author: "Yuval Noah Harari", dewey: "909" },
      ],
    },
    {
      id: "C2",
      name: "Section C-2",
      category: "Non-Fiction 500-900",
      capacity: 200,
      used: 178,
      x: 350,
      y: 200,
      width: 120,
      height: 60,
      books: [
        { title: "The Selfish Gene", author: "Richard Dawkins", dewey: "576.8" },
      ],
    },
  ];

  const handleSectionClick = (section: ShelfSection) => {
    setSelectedSection(section);
    setViewMode("shelf");
  };

  const handleBackToMap = () => {
    setViewMode("map");
    setTimeout(() => setSelectedSection(null), 300);
  };

  const getCapacityColor = (used: number, capacity: number) => {
    const percentage = (used / capacity) * 100;
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    return "bg-green-500";
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Interactive Library Map</h1>
          <p className="text-gray-600">
            {viewMode === "map"
              ? "Click on any section to view shelf details"
              : `Viewing ${selectedSection?.name} - ${selectedSection?.category}`}
          </p>
        </div>
        {viewMode === "shelf" && (
          <Button onClick={handleBackToMap} variant="outline">
            <ZoomOut className="w-4 h-4 mr-2" />
            Back to Map
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map/Shelf View */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardContent className="p-6 h-full">
              <AnimatePresence mode="wait">
                {viewMode === "map" ? (
                  <motion.div
                    key="map"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden"
                  >
                    {/* Map Legend */}
                    <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-sm z-10">
                      <p className="text-xs font-medium mb-2">Capacity Legend</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span>&lt; 75%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span>75-90%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span>&gt; 90%</span>
                        </div>
                      </div>
                    </div>

                    {/* Entrance Label */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Main Entrance
                    </div>

                    {/* Shelf Sections */}
                    <svg className="w-full h-full">
                      {sections.map((section) => (
                        <g key={section.id}>
                          <rect
                            x={section.x}
                            y={section.y}
                            width={section.width}
                            height={section.height}
                            className={`${getCapacityColor(section.used, section.capacity)} cursor-pointer transition-all hover:opacity-80`}
                            rx="8"
                            onClick={() => handleSectionClick(section)}
                          />
                          <text
                            x={section.x + section.width / 2}
                            y={section.y + section.height / 2 - 5}
                            textAnchor="middle"
                            className="fill-white text-sm font-semibold pointer-events-none"
                          >
                            {section.name}
                          </text>
                          <text
                            x={section.x + section.width / 2}
                            y={section.y + section.height / 2 + 12}
                            textAnchor="middle"
                            className="fill-white text-xs pointer-events-none"
                          >
                            {section.category}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="shelf"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="h-full flex flex-col"
                  >
                    {/* First-person shelf view */}
                    <div className="flex-1 bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg p-8 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(0,0,0,0.1) 50px, rgba(0,0,0,0.1) 51px)',
                        }}></div>
                      </div>

                      {/* Book spines */}
                      <div className="relative h-full flex items-end justify-center gap-2">
                        {selectedSection?.books.map((book, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="w-12 bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-t-sm shadow-lg flex items-end justify-center p-2 cursor-pointer hover:scale-105 transition-transform"
                            style={{
                              height: `${150 + index * 30}px`,
                              transform: 'rotateX(5deg)',
                            }}
                            title={book.title}
                          >
                            <p className="text-white text-xs font-medium [writing-mode:vertical-rl] rotate-180 truncate">
                              {book.title}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Book list */}
                    <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                      {selectedSection?.books.map((book, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{book.title}</p>
                            <p className="text-xs text-gray-600">{book.author}</p>
                          </div>
                          <Badge variant="outline">{book.dewey}</Badge>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Section Info */}
          {selectedSection ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Section Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Section Name</p>
                  <p className="font-semibold">{selectedSection.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold">{selectedSection.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Capacity</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`${getCapacityColor(selectedSection.used, selectedSection.capacity)} h-2 rounded-full transition-all`}
                        style={{ width: `${(selectedSection.used / selectedSection.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {selectedSection.used}/{selectedSection.capacity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((selectedSection.used / selectedSection.capacity) * 100)}% full
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Books</p>
                  <p className="font-semibold">{selectedSection.books.length}</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Map Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Sections</span>
                    <span className="font-semibold">{sections.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Capacity</span>
                    <span className="font-semibold">
                      {sections.reduce((acc, s) => acc + s.capacity, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Books Shelved</span>
                    <span className="font-semibold">
                      {sections.reduce((acc, s) => acc + s.used, 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900">High Capacity</p>
                  <p className="text-xs text-red-700 mt-1">
                    Section A-1 is 95% full. Consider redistributing to A-2.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <ZoomIn className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Optimize Layout</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Group related Dewey 800s across sections B-1 and B-2.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Utilization Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-sm">High Capacity</span>
                  </div>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span className="text-sm">Medium Capacity</span>
                  </div>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-sm">Good Capacity</span>
                  </div>
                  <span className="font-semibold">1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
