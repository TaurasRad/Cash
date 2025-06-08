"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input/input-form";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type LoginValuesType = z.infer<typeof loginFormSchema>;

const defaultValues: LoginValuesType = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const router = useRouter();

  const supabase = createClient();

  const form = useForm<LoginValuesType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  async function handleLogin(values: LoginValuesType) {
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) return toast.error(error.message);

    toast.success("Login successful");

    router.replace("/");
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) toast.error(error.message);
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 mb-4"
        onClick={handleGoogleLogin}
      >
        <span className="inline-block w-5 h-5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_993_771)">
              <path
                d="M19.805 10.2305C19.805 9.55078 19.7484 8.86719 19.6266 8.19922H10.2V12.0508H15.6406C15.4156 13.2812 14.6734 14.332 13.6344 15.0172V17.2672H16.7484C18.5484 15.6172 19.805 13.1836 19.805 10.2305Z"
                fill="#4285F4"
              />
              <path
                d="M10.2 20C12.7 20 14.7922 19.1836 16.3484 17.6172L13.6344 15.0172C12.7922 15.6172 11.6422 16.0008 10.2 16.0008C7.79219 16.0008 5.74844 14.3344 5.01719 12.1172H1.79219V14.4344C3.39219 17.6172 6.59219 20 10.2 20Z"
                fill="#34A853"
              />
              <path
                d="M5.01719 12.1172C4.79219 11.5172 4.66719 10.8672 4.66719 10.2008C4.66719 9.53437 4.79219 8.88437 5.01719 8.28437V5.96719H1.79219C1.13437 7.33437 0.800781 8.80078 0.800781 10.2008C0.800781 11.6008 1.13437 13.0672 1.79219 14.4344L5.01719 12.1172Z"
                fill="#FBBC05"
              />
              <path
                d="M10.2 4.40078C11.7484 4.40078 13.0734 4.93437 14.0734 5.86719L16.4172 3.53437C14.7922 1.96719 12.7 1 10.2 1C6.59219 1 3.39219 3.38281 1.79219 6.56719L5.01719 8.88437C5.74844 6.66719 7.79219 4.40078 10.2 4.40078Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_993_771">
                <rect
                  width="19"
                  height="19"
                  fill="white"
                  transform="translate(0.800781 1)"
                />
              </clipPath>
            </defs>
          </svg>
        </span>
        Continue with Google
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleLogin)}
          className="w-full flex flex-col gap-y-4"
        >
          <InputForm
            label="Email"
            name="email"
            placeholder="hello@sarathadhi.com"
            description=""
            required
          />

          <InputForm
            type="password"
            label="Password"
            name="password"
            description=""
            required
          />

          <Button>Login</Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
