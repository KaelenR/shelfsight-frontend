import { motion } from "motion/react";
import { ShelfSection } from "@/components/map/types";

interface ShelfFirstPersonViewProps {
  section: ShelfSection;
}

export function ShelfFirstPersonView({ section }: ShelfFirstPersonViewProps) {
  return (
    <motion.div
      key={section.id}
      initial={{ opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="h-full rounded-xl bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 p-6"
    >
      <div className="relative h-full overflow-hidden rounded-lg border border-amber-200/80 bg-amber-50/60">
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_54px,rgba(146,64,14,0.15)_54px,rgba(146,64,14,0.15)_55px)]" />

        <div className="absolute inset-x-0 bottom-0 top-12 flex items-end justify-center gap-2 p-5">
          {section.books.map((book, index) => (
            <motion.div
              key={`${section.id}-${book.title}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              className="group relative w-12 rounded-t-sm shadow-md transition-transform hover:-translate-y-1"
              style={{
                height: `${170 + (index % 3) * 30}px`,
                backgroundColor: book.color,
              }}
              title={`${book.title} - ${book.author}`}
            >
              <p className="absolute inset-x-0 bottom-2 mx-auto w-fit rotate-180 text-[10px] font-medium tracking-wide text-white [writing-mode:vertical-rl]">
                {book.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
