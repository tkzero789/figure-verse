import { Highlight } from "react-instantsearch";
import { getPropertyByPath } from "instantsearch.js/es/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import "../global.css";
import { Button } from "./ui/button";
import React from "react";
import { useCart } from "./CartContext";

export const Hit = ({ hit }) => {
  const { addToCart } = useCart();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="shop-item">
          <img src={hit.image_url} />
          <div className="flex flex-grow flex-col">
            <div className="hit-name">
              <Highlight attribute="name" hit={hit} />
            </div>
            <div className="hit-type">
              <Highlight attribute="type" hit={hit} />
            </div>
            <div className="hit-price">
              <span>${getPropertyByPath(hit, "price")}</span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{hit.name}</DialogTitle>
          <DialogDescription>
            <span>{hit.type}</span>
            <div className="mt-4 flex justify-center">
              <img className="w-[400px] rounded-md" src={hit.image_url} />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button className="mt-8 w-full" onClick={() => addToCart(hit)}>
              Add to Cart
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
