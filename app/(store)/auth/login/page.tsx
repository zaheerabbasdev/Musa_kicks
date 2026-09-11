"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginSchema, type LoginInput } from "@/lib/validations/auth.schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const [showPw, setShowPw] = useState(false);
  const [authError, setAuthError] = useState("");
  const { update } = useSession();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/account";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setAuthError("");
    await signOut({ redirect: false });

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setAuthError("Invalid email or password");
    } else {
      const session = await update();
      const destination =
        !searchParams.get("callbackUrl") && session?.user?.role === "ADMIN"
          ? "/admin"
          : callbackUrl;
      window.location.assign(destination);
    }
  };

  return (
    <div className="card p-8 md:p-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Welcome Back</h1>
        <p style={{ color: "var(--muted-foreground)" }}>
          Sign in to your Musa Kicks account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            required
            error={errors.password?.message}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 bottom-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} className="w-4 h-4" />
          </button>
        </div>

        {authError && (
          <div
            className="px-4 py-3 rounded-[var(--radius-md)] text-sm"
            style={{ background: "var(--error-bg)", color: "var(--error)" }}
            role="alert"
          >
            {authError}
          </div>
        )}

        <Button type="submit" fullWidth isLoading={isSubmitting} size="lg" className="mt-2">
          Sign In
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-medium text-[var(--primary)] hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<div className="card p-8 h-96 animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
