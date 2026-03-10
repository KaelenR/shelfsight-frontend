"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Minus, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import type { PopularBook } from "../types";

interface PopularBooksProps {
  books: PopularBook[];
  isLoading?: boolean;
}

export function PopularBooks({ books, isLoading = false }: PopularBooksProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0">
                <Skeleton className="w-6 h-6 rounded" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-28 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.4 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-display">
            <BookOpen className="w-4 h-4 text-brand-navy" />
            Popular This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {books.map((book, i) => {
              const TrendIcon = book.trend === "up" ? TrendingUp : book.trend === "down" ? TrendingDown : Minus;
              const trendColor = book.trend === "up" ? "text-brand-sage" : book.trend === "down" ? "text-brand-brick" : "text-muted-foreground";
              return (
                <motion.div
                  key={book.rank}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.45 + i * 0.04 }}
                  className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0"
                >
                  <div className="w-6 h-6 rounded bg-brand-navy/8 flex items-center justify-center flex-shrink-0">
                    <span className="text-[11px] font-semibold text-brand-navy">{book.rank}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{book.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{book.author}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-[11px] font-medium">{book.checkouts}</span>
                    <TrendIcon className={`w-3 h-3 ${trendColor}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
