"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "./CartContext";
import { Input } from "./ui/input";
import { toast } from "sonner";
import FigureVerse from "@/public/figure-verse.svg";
import Image from "next/image";

const routes = [
  { href: "/", label: "Best Sellers" },
  { href: "/", label: "Figures" },
  { href: "/", label: "Superheroes" },
  { href: "/", label: "Villains" },
  { href: "/", label: "Tools" },
  { href: "/", label: "Contact" },
];

const Header = () => {
  const { cartItems, removeFromCart, resetCart } = useCart();
  const [coupon, setCoupon] = React.useState("");
  const [isDiscount, setIsDiscount] = React.useState(false);
  const [discountPrice, setDiscountPrice] = React.useState<string | null>(null);
  const [isCheckout, setIsCheckout] = React.useState(false);

  const price = cartItems.map((item) => item.price);

  let cartAmount = cartItems.length;

  const handleRemove = (name: string) => {
    removeFromCart(name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
  };

  const handleCheckCoupon = () => {
    if (coupon === "FIGUREVERSE20") {
      setIsDiscount(true);
      const totalPrice = price.reduce((acc, curr) => acc + Number(curr), 0);
      const discountAmount = (totalPrice - totalPrice * 0.2).toFixed(2);
      setDiscountPrice(discountAmount);
      toast.success("Discount code applied!");
    } else {
      setIsDiscount(false);
      toast.error("Invalid discount code!");
    }
  };

  React.useEffect(() => {
    if (isDiscount) {
      const totalPrice = price.reduce((acc, curr) => acc + Number(curr), 0);
      const discountAmount = (totalPrice - totalPrice * 0.2).toFixed(2);
      setDiscountPrice(discountAmount);
    } else {
      setDiscountPrice(null);
    }
  }, [cartItems, isDiscount, price]);

  const handleCheckout = () => {
    setIsCheckout(!isCheckout);
    resetCart();
    setCoupon("");
    setIsDiscount(false);
    setDiscountPrice(null);
    toast.success("Checkout successful!");
  };

  return (
    <header className="border-b px-4 py-3 sm:flex sm:justify-between">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6 md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {routes.map((route, i) => (
                  <Link key={i} href={route.href}>
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-4 flex items-center gap-2 lg:ml-0">
            <Image src={FigureVerse} alt="Logo" width={140} height={140} />
          </Link>
        </div>
        <nav className="mx-6 flex hidden items-center space-x-4 md:block lg:space-x-6">
          {routes.map((route, i) => (
            <Button key={i} asChild variant="ghost">
              <Link className="text-base" href={route.href}>
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger className="relative">
              <div className="absolute right-[-10px] top-[-8px] flex h-5 w-5 items-center justify-center rounded-full bg-pink-800 text-white">
                <span>{cartAmount}</span>
              </div>
              <ShoppingCart />
            </SheetTrigger>
            <SheetContent className="max-w-screen-sm sm:max-w-[800px]">
              <div className="flex flex-col gap-2">
                <span className="mr-4 text-lg font-semibold">Cart:</span>
                <div className="flex items-center">
                  <Input
                    value={coupon}
                    onChange={handleInputChange}
                    placeholder="Apply coupon"
                    className="w-2/4 border border-gray-500"
                  />
                  <Button className="ml-4" onClick={() => handleCheckCoupon()}>
                    Apply
                  </Button>
                </div>
              </div>
              <ul className="mt-8 flex max-h-[70%] flex-col gap-10 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex gap-2">
                    <div className="h-36 w-36 rounded-lg">
                      <img
                        className="h-full w-full rounded-lg"
                        src={item.image_url}
                        alt="item"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold">{item.name}</div>
                      <div className="text-[#757575]">{item.type}</div>
                      <div className="mt-4 text-[#757575]">Qty: 1</div>
                      <div
                        className="mt-auto underline"
                        onClick={() => handleRemove(item.name)}
                      >
                        Remove
                      </div>
                    </div>
                    <div className="ml-auto font-semibold">${item.price}</div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-end">
                <span className="mr-2 font-normal">Total: </span>
                {isDiscount ? (
                  <span className="font-bold">${discountPrice}</span>
                ) : (
                  <span className="font-bold">
                    {" "}
                    $
                    {price
                      .reduce((acc, curr) => acc + Number(curr), 0)
                      .toFixed(2)}
                  </span>
                )}
              </div>
              {isCheckout && (
                <div className="text-center text-xl font-semibold">
                  Thank you for your purchase!
                </div>
              )}
              <Button className="mt-6 w-full" onClick={() => handleCheckout()}>
                Checkout
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
