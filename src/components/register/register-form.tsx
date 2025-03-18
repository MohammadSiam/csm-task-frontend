import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { registerUser } from '@/utils/service';
import { RegisterSchema } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';

export function RegisterForm({ className, ...props }) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate('/auth');
    },
    onError: (error: any) =>
      alert(error.response?.data?.message || 'Something went wrong!'),
  });

  return (
    <div className={cn('flex flex-col gap-5', className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => mutation.mutate(values)}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Field as={Input} name="firstName" placeholder="John" />
                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Field as={Input} name="lastName" placeholder="Doe" />
                      <ErrorMessage
                        name="lastName"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      as={Input}
                      name="email"
                      type="email"
                      placeholder="example@mymail.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Field
                      as={Input}
                      name="password"
                      type="password"
                      placeholder="******"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || mutation.isLoading}
                  >
                    {mutation.isLoading ? 'Registering...' : 'Register'}
                  </Button>
                </div>

                {/* Login Link */}
                <div className="text-center text-sm text-gray-600 my-2">
                  Already have an account?{' '}
                  <Link to="/auth" className="underline underline-offset-4">
                    Login
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
