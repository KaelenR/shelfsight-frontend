"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";
import type { PendingReturn } from "../types";

interface PendingReturnsProps {
  returns: PendingReturn[];
  isLoading?: boolean;
}

export function PendingReturns({ returns, isLoading = false }: PendingReturnsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-44 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded" />
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
      transition={{ duration: 0.35, delay: 0.35 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">Pending Returns</CardTitle>
          <CardDescription className="text-xs">Items due for return today</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[11px] h-8">Book</TableHead>
                <TableHead className="text-[11px] h-8">Patron</TableHead>
                <TableHead className="text-[11px] h-8">Due</TableHead>
                <TableHead className="text-[11px] h-8 text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returns.map((item) => (
                <TableRow key={item.id} className={item.isOverdue ? "bg-brand-brick/3" : ""}>
                  <TableCell className="text-[12px] font-medium py-2">{item.bookTitle}</TableCell>
                  <TableCell className="text-[12px] text-muted-foreground py-2">{item.patronName}</TableCell>
                  <TableCell className="text-[11px] text-muted-foreground py-2">{item.dueDate}</TableCell>
                  <TableCell className="text-right py-2">
                    <Badge
                      variant={item.isOverdue ? "destructive" : "outline"}
                      className="text-[10px] px-2 py-0.5"
                    >
                      {item.isOverdue ? "Overdue" : "Due Today"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
