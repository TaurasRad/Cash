"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Gift,
  Trophy,
  Mail,
  Percent,
  Sparkles,
  XCircle,
  RotateCcw,
} from "lucide-react";

const EMAIL_MODAL_KEY = "emailModalShown";

const INITIAL_CARD_COUNT_DESKTOP = 5;
const INITIAL_CARD_COUNT_MOBILE = 3;
const WINNING_ATTEMPT_NUMBER = 3;

interface CardItem {
  id: number;
  isLucky?: boolean;
  revealedIncorrect?: boolean;
}

export default function EmailDiscountModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"pick" | "email" | "thanks">("pick");
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const [initialCardCount, setInitialCardCount] = useState(
    INITIAL_CARD_COUNT_DESKTOP
  );
  const [cards, setCards] = useState<CardItem[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isProcessingPick, setIsProcessingPick] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Commenting out for easier testing in preview, re-enable for production
    // if (sessionStorage.getItem(EMAIL_MODAL_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(EMAIL_MODAL_KEY, "true");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setInitialCardCount(INITIAL_CARD_COUNT_MOBILE);
      } else {
        setInitialCardCount(INITIAL_CARD_COUNT_DESKTOP);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize cards when initialCardCount changes or modal opens to "pick" step
  useEffect(() => {
    if (open && step === "pick") {
      const newCards = Array.from({ length: initialCardCount }, (_, i) => ({
        id: i,
        revealedIncorrect: false,
        isLucky: false,
      }));
      setCards(newCards);
      setAttempts(0);
      setSelectedCardId(null);
      setIsProcessingPick(false);
    }
  }, [initialCardCount, open, step]); // Rerun when initialCardCount changes

  useEffect(() => {
    if (step === "thanks") {
      const t = setTimeout(() => {
        setOpen(false);
        setStep("pick"); // Reset step for next opening
        // Cards will re-initialize due to the effect above
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [step, router]);

  const handleCardClick = (clickedCard: CardItem) => {
    if (
      clickedCard.revealedIncorrect ||
      isProcessingPick ||
      (selectedCardId !== null && selectedCardId !== clickedCard.id)
    )
      return;

    setIsProcessingPick(true);
    setSelectedCardId(clickedCard.id);
    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    if (currentAttempts === WINNING_ATTEMPT_NUMBER) {
      // WINNING PICK
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === clickedCard.id
            ? { ...c, isLucky: true, revealedIncorrect: false }
            : c
        )
      );
      setTimeout(() => {
        setStep("email"); // Go directly to email step, which now includes win message
      }, 600); // Short delay to show "lucky" card style
    } else {
      // INCORRECT PICK
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === clickedCard.id
            ? { ...c, revealedIncorrect: true, isLucky: false }
            : c
        )
      );
      // Very short delay to show "incorrect" feedback, then allow next pick
      setTimeout(() => {
        setSelectedCardId(null); // Clear selection highlight to allow picking another
        setIsProcessingPick(false); // Allow next pick
      }, 700); // Duration for "incorrect" feedback display
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setStep("thanks");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // Faster stagger
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setStep("pick"); // Reset to pick step, triggers card re-initialization
        }
      }}
    >
      <DialogContent className="w-[95vw] max-w-md p-0 overflow-hidden">
        <div className="p-4 md:p-6">
          <DialogTitle className="text-2xl font-bold text-center">
            {step === "pick" &&
              (attempts < WINNING_ATTEMPT_NUMBER - 1
                ? "Pick a Card!"
                : "Last Chance!")}
            {step === "email" && "🎉 You Won! Claim Your Discount"}
            {step === "thanks" && "Thank You!"}
          </DialogTitle>
          <DialogDescription className="text-center mt-2 text-sm">
            {step === "pick" &&
              `Pick the right card and get 60% discount on your first purchase!`}
            {step === "email" &&
              "You picked the lucky card! Enter your email below to receive your exclusive discount code."}
            {step === "thanks" &&
              "We've sent your discount code. Check your inbox!"}
          </DialogDescription>
        </div>

        <div className="px-4 pb-6 pt-2 md:px-6 md:pb-8 flex flex-col items-center justify-center min-h-[230px] w-full">
          {step === "pick" && (
            <motion.div className="flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 mt-4 justify-center w-full py-2 px-1 sm:px-2">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  layout // Smooths transitions if items reorder (though not happening here)
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={
                    !card.revealedIncorrect && !isProcessingPick
                      ? { y: -6, scale: 1.03 }
                      : {}
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="flex-shrink-0"
                >
                  <Card
                    tabIndex={
                      card.revealedIncorrect || isProcessingPick ? -1 : 0
                    }
                    onKeyDown={(e) => {
                      if (
                        !card.revealedIncorrect &&
                        !isProcessingPick &&
                        (e.key === "Enter" || e.key === " ")
                      ) {
                        handleCardClick(card);
                      }
                    }}
                    className={`
                      w-20 h-32 sm:w-24 sm:h-36 md:w-28 md:h-40
                      flex flex-col items-center justify-center 
                      border-2 rounded-xl shadow-lg overflow-hidden
                      transform transition-all duration-200 ease-out
                      ${
                        card.revealedIncorrect
                          ? "cursor-not-allowed bg-muted/50 border-dashed"
                          : "cursor-pointer bg-card hover:shadow-xl"
                      }
                      ${
                        selectedCardId === card.id && card.isLucky
                          ? "border-green-500 ring-4 ring-green-500/50 scale-105 shadow-2xl"
                          : selectedCardId === card.id && !card.isLucky // This is the brief "incorrect" highlight
                          ? " ring-destructive/50 scale-105 shadow-2xl"
                          : card.revealedIncorrect
                          ? "border-muted-foreground/30"
                          : "border-border hover:border-primary/50"
                      }
                    `}
                    onClick={() =>
                      !card.revealedIncorrect && handleCardClick(card)
                    }
                  >
                    <CardContent className="p-2 sm:p-3 flex flex-col items-center justify-center text-center w-full h-full">
                      {card.revealedIncorrect ? (
                        <RotateCcw className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-muted-foreground/70" />
                      ) : selectedCardId === card.id && card.isLucky ? (
                        <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-green-500" />
                      ) : selectedCardId === card.id && !card.isLucky ? ( // Brief X for current wrong pick
                        <XCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-destructive" />
                      ) : (
                        <Gift className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary" />
                      )}
                      <p
                        className={`mt-2 text-[10px] sm:text-xs font-medium ${
                          card.revealedIncorrect
                            ? "text-muted-foreground"
                            : selectedCardId === card.id
                            ? card.isLucky
                              ? "text-green-600"
                              : "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {card.revealedIncorrect
                          ? "Try Again!"
                          : selectedCardId === card.id
                          ? card.isLucky
                            ? "Lucky!"
                            : "Not this one..."
                          : "Pick Me"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {step === "email" && (
            <motion.div className="flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-center justify-center w-full gap-4">
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="text-center md:text-left"
                />
                <Button type="submit" className="w-full" size="lg">
                  <Mail className="mr-2 h-5 w-5" />
                  Claim My Discount
                </Button>
              </div>
            </motion.div>
          )}

          {step === "thanks" && (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-6 text-green-600 font-semibold text-center text-lg"
            >
              <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              Awesome! Your discount is on its way.
              <br />
              <span className="text-sm text-muted-foreground">
                Redirecting you shortly...
              </span>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
