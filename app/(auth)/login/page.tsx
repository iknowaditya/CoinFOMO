"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { toast } from "sonner";
import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/sidebar-config/mode-toggle";

const StaticPattern = () => {
  const maskId = "gradientMask";

  return (
    <div className="w-full h-full relative overflow-hidden bg-zinc-900">
      {/* Base Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="geometricPattern"
            width="43.78"
            height="70"
            patternTransform="rotate(115)scale(2)"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100%" height="100%" fill="#283e3c" />
            <path
              fill="none"
              stroke="#4cae4f"
              strokeWidth="4"
              d="m15.323-.024 8.66-69.952H6.663ZM6.567-69.976l8.66 69.952h-17.32Zm43.78 0 8.66 69.952h-17.32ZM-6.567 34.976l8.66-69.952h-17.32Zm21.89 35L23.983.024H6.663ZM6.567.024l8.66 69.952h-17.32Zm30.646 34.952 8.66-69.952h-17.32Zm-8.756-69.952 8.66 69.952h-17.32Zm21.89 35 8.66 69.952h-17.32ZM-6.567 104.976l8.66-69.952h-17.32Zm21.89 35 8.66-69.952H6.663ZM6.567 70.024l8.66 69.952h-17.32Zm30.646 34.952 8.66-69.952h-17.32Zm-8.756-69.952 8.66 69.952h-17.32Zm21.89 35 8.66 69.952h-17.32Z"
            />
          </pattern>
          <linearGradient id={maskId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect
          width="800%"
          height="800%"
          fill="url(#geometricPattern)"
          transform="translate(-28 -244)"
        />
        <rect width="100%" height="100%" fill={`url(#${maskId})`} />
      </svg>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white">
            Track Crypto, Seize Opportunities
          </h2>
          <p className="text-zinc-400 text-lg ">
            Stay ahead of the market with real-time cryptocurrency tracking and
            analytics
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Login Page Component
export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    try {
      const result = await signIn("credentials", {
        email: target.email.value,
        password: target.password.value,
        redirect: false,
      });

      if (result?.error === "GoogleUser") {
        toast.error("This email is registered with Google", {
          description:
            "Please use the 'Continue with Google' button to sign in.",
          action: {
            label: "Sign in with Google",
            onClick: () => signIn("google", { callbackUrl: "/dashboard" }),
          },
        });
      } else if (result?.error) {
        toast.error("Invalid credentials", {
          description: "Please check your email and password.",
        });
      } else {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      toast.error("Google login failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* Left Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 bg-card/50">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="text-green-500">
                <Image
                  src="/logo.svg"
                  alt="CoinFOMO Logo"
                  width={40}
                  height={40}
                />
              </div>
              <h1 className="text-xl font-bold">CoinFOMO</h1>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Google Login Button */}
            <Button
              variant="outline"
              onClick={loginWithGoogle}
              disabled={isGoogleLoading}
              className="w-full"
            >
              {isGoogleLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.61z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="dark:bg-zinc-900 bg-zinc-100 px-2 dark:text-zinc-400 text-zinc-600">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={onSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="dark:text-gray-400 text-gray-500"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="dark:text-gray-400 text-gray-500"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                    className="w-full"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-black font-medium"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-gray-400 text-center">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-green-500 hover:text-green-400 underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Right Side - Animated Pattern */}
      <div className="hidden md:block w-1/2">
        <StaticPattern />
      </div>
    </div>
  );
}
