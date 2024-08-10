import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Question from "./Question";

export default function Recommend() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800">
            Assemble Your Discount
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Unlock Your Hero Discount
            </DialogTitle>
            <DialogDescription>
              <Question />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
