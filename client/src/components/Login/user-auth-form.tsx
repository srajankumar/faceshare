"use client";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [, setCookies] = useCookies(["access_token", "username"]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${server}/auth/login`, {
        username,
        password,
      });

      if (!response.data.token) {
        toast({
          title: "Login Failed",
          description:
            "The entered username or password is incorrect. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      } else {
        setCookies("access_token", response.data.token);
        setCookies("username", username);

        window.localStorage.setItem("userID", response.data.userID);
        window.localStorage.setItem("username", username);
        toast({
          title: "Login Successful",
          variant: "success",
        });

        setUsername("");
        setPassword("");
        setError(null);
        setTimeout(() => {
          window.location.href = "/add-profile";
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      toast({
        title: "Login Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

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
          <div className="grid gap-1 relative">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              required
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              disabled={isLoading}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <Eye className={`w-5 h-5 ${isLoading ? "text-input" : ""}`} />
              ) : (
                <EyeOff
                  className={`w-5 h-5 ${isLoading ? "text-input" : ""}`}
                />
              )}
            </button>
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
