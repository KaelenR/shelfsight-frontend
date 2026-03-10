"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { LOAN_STATUS_CONFIG } from "../constants";
import type { PatronLoan } from "../types";

interface CurrentLoansProps {
  loans: PatronLoan[];
  onRenew: (loanId: string) => void;
  isLoading?: boolean;
}

export function CurrentLoans({ loans, onRenew, isLoading = false }: CurrentLoansProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-3 w-48 mt-1" />
        </CardHeader>
        <CardContent>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3 py-3 border-b border-border/60 last:border-0">
              <Skeleton className="w-10 h-14 rounded" />
              <div className="flex-1">
                <Skeleton className="h-4 w-28 mb-1" />
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.25 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-display">My Current Loans</CardTitle>
          <CardDescription className="text-xs">Books you currently have checked out</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {loans.map((loan, i) => {
              const config = LOAN_STATUS_CONFIG[loan.status] || LOAN_STATUS_CONFIG["on-time"];
              return (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.06 }}
                  className="flex gap-3 py-3 border-b border-border/60 last:border-0"
                >
                  {/* Book Cover Placeholder */}
                  <div
                    className="w-10 h-14 rounded flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: `${loan.coverColor}18` }}
                  >
                    <span className="text-[10px] font-bold" style={{ color: loan.coverColor }}>
                      {loan.title.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-0.5">
                      <div className="min-w-0">
                        <p className="text-[13px] font-medium truncate">{loan.title}</p>
                        <p className="text-[11px] text-muted-foreground">{loan.author}</p>
                      </div>
                      <Badge variant={config.variant} className="text-[10px] px-2 py-0.5 ml-2 flex-shrink-0">
                        {loan.status === "overdue"
                          ? `${Math.abs(loan.daysLeft)}d overdue`
                          : `${loan.daysLeft}d left`}
                      </Badge>
                    </div>

                    {/* Loan Progress */}
                    <div className="flex items-center gap-2 mt-2">
                      <Progress value={loan.progress} className="h-1 flex-1" />
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">
                        Due {loan.dueDate}
                      </span>
                    </div>

                    {/* Renew Button */}
                    {loan.status !== "overdue" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-[11px] px-2 mt-1.5 text-brand-copper hover:text-brand-copper/80"
                        onClick={() => onRenew(loan.id)}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Renew
                      </Button>
                    )}
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
