"use client";
import { useState } from "react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const server = process.env.NEXT_PUBLIC_SERVER_URL;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  async function checkUsernameAvailability(username: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `${server}/auth/check-username/${username}`
      );
      return !response.data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const isUsernameAvailable = await checkUsernameAvailability(username);

      if (!isUsernameAvailable) {
        setError("Username already exists. Please choose a different one.");
        toast({
          title: "Registration Failed",
          description:
            "Username already exists. Please choose a different one.",
        });
        return;
      }

      await axios.post(`${server}/auth/register`, {
        username,
        password,
      });

      toast({
        title: "Registration Completed",
        description: "Login to continue",
      });

      setUsername("");
      setPassword("");
      setError(null);
      window.location.href = "/login";
    } catch (err) {
      console.error(err);

      setError("An error occurred during registration. Please try again.");
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              required
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              required
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
