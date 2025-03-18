import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { login } from "@/utils/service";
import { loginSchema } from "@/utils/validator";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { login: setAuthState } = useAuth();
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      navigate("/");
      setAuthState(data.data);
      localStorage.setItem("authData", JSON.stringify(data.data));
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  return (
    <div className={cn("flex flex-col gap-5", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { setSubmitting }) => {
              mutation.mutate(values, {
                onSuccess: () => setSubmitting(false),
                onError: () => setSubmitting(false),
              });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your email and password
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || mutation.isLoading}
                  >
                    {mutation.isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
                <div className="text-center text-sm mt-3">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
