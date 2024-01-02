import Image from "next/image";
import Link from "next/link";

import { UserAuthForm } from "@/components/Login/user-auth-form";

export default function Login() {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
          <Image
            quality={100}
            priority
            src="/login.jpg"
            className="relative bg-black object-cover w-full h-full z-20"
            layout="fill"
            alt=""
          ></Image>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to continue
              </h1>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Do not have an account?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
