import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Input } from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "../../types/post";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import z from "zod";

import "./PostForm.css";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  file: z
    .any()
    .refine((file) => file && file.length > 0, "Document is required.")
    .refine((file) => {
      return file?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max document size is 2MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

type FormFields = z.infer<typeof formSchema>;
type postFormProps = {
  post?: Post;
};

const PostForm = ({ post }: postFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: post
      ? {
          title: post.title,
          description: post.body,
          file: post.photo,
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);

  const postDetails = async (file: File): Promise<string> => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dgbgvecx3");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgbgvecx3/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await response.json();
    if (result.error) {
      throw new Error(result.error.message);
    }
    return result.url;
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const title = data.title;
    const body = data.description;
    const file = data.file;

    try {
      const imageUrl = await postDetails(file[0]);

      if (imageUrl) {
        const response = await fetch("/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, body, image_url: imageUrl }),
        });

        const result = await response.json();
        if (result.error) {
          throw new Error(result.error);
        }
        alert("success");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError("root", {
          message: error.message || "An unexpected error occurred",
        });
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="post-form-container">
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
          <Input
            label="Image"
            name="file"
            type="file"
            register={register}
            error={errors.file?.message?.toString()}
            onChange={handleFileChange}
          />
          <div className="image-container">
            {image && <img src={image as string} alt="Selected" />}
          </div>
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
          <div className="root-error-container">
            {errors.root?.message && (
              <span className="input-error">{errors.root?.message}</span>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PostForm;
