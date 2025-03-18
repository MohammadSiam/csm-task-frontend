import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { updateProfile } from '@/utils/service';
import { ProfileSchema } from '@/utils/validator';
import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useState } from 'react';

export default function ProfilePage() {
  const { authState } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const mutation = useMutation({
    mutationFn: ({
      userId,
      profileData,
    }: {
      userId: number;
      profileData: any;
    }) => updateProfile(userId, profileData),
    onSuccess: () => {
      alert('Update successful!');
      setIsEditing(false);
    },
    onError: (error: any) =>
      alert(error.response?.data?.message || 'Something went wrong!'),
  });

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
        User Profile
      </h2>
      <Formik
        initialValues={{
          firstName: authState?.user?.firstName || '',
          lastName: authState?.user?.lastName || '',
          email: authState?.user?.email || '',
          content: authState?.user?.content || [''],
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
          mutation.mutate({
            userId: Number(authState?.user?.id),
            profileData: values,
          });
        }}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            {!isEditing ? (
              <div className="space-y-4">
                <p>
                  <strong>First Name:</strong> {values.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {values.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {values.email}
                </p>
                <p>
                  <strong>Personal Content (YouTube):</strong>
                </p>
                {values.content.map((link, index) => (
                  <iframe
                    key={index}
                    className="w-full h-48"
                    src={link}
                    title={`YouTube Video ${index + 1}`}
                    allowFullScreen
                  />
                ))}
                <Button className="mt-4" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>First Name</Label>
                  <Field name="firstName" as={Input} />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Field name="lastName" as={Input} />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Field name="email" as={Input} />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <Label>YouTube Embed Links</Label>
                  <FieldArray name="content">
                    {({ push, remove }) => (
                      <div className="space-y-2">
                        {values.content.map((_, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Field name={`content.${index}`} as={Input} />
                            <Button
                              variant="destructive"
                              type="button"
                              onClick={() => remove(index)}
                            >
                              X
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => push('')}
                        >
                          Add Another Link
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                  <ErrorMessage
                    name="content"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
