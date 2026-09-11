"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth.schema";

export default function RegisterPage() {
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      setServerError(json.error ?? "Registration failed");
      return;
    }

    router.push("/auth/login?registered=1");
  };

  return (
    <div className="min-h-[calc(100vh-var(--nav-height))] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">Create Account</h1>
            <p style={{ color: "var(--muted-foreground)" }}>
              Join our store and discover products made for everyday life
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Your Name"
              required
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              required
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Phone (optional)"
              type="tel"
              placeholder="+92 300 0000000"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              required
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              required
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {serverError && (
              <div
                className="px-4 py-3 rounded-[var(--radius-md)] text-sm"
                style={{ background: "var(--error-bg)", color: "var(--error)" }}
                role="alert"
              >
                {serverError}
              </div>
            )}

            <Button type="submit" fullWidth isLoading={isSubmitting} size="lg" className="mt-2">
              Create Account
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-[var(--primary)] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
