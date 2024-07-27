import React from "react";
import Layout from "../../components/Layout/Layout";
import { Input } from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Post } from "../../types/post";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  // file: z
  //   .instanceof(File)
  //   .refine(
  //     (file) => {
  //       if (!file) return false;
  //       const allowedTypes = ["image/jpeg", "image/png"];
  //       return allowedTypes.includes(file.type);
  //     },
  //     {
  //       message: "File must be of type .jpg or .png",
  //     }
  //   )
  //   .nullable(),
});

type FormFields = z.infer<typeof formSchema>;
type postFormProps = {
  post?: Post;
};

const PostForm = ({ post }: postFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: post
      ? {
          title: post.title,
          description: post.body,
          // file: post.photo, // Handle this properly if needed
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("Form submitted");
    console.log(data);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          name="title"
          type="text"
          register={register}
          error={errors.title?.message}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          register={register}
          error={errors.description?.message}
        />
        {/* <Input
          label="Image"
          name="file"
          type="file"
          register={register}
          error={errors.file?.message}
        /> */}
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
        <div className="root-error-container">
          {errors.root?.message && (
            <span className="input-error">{errors.root?.message}</span>
          )}
        </div>
        {errors && <pre>{JSON.stringify(errors, null, 2)}</pre>}
      </form>
    </Layout>
  );
};

export default PostForm;
