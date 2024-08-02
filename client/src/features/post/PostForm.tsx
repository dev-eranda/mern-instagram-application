import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Input } from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "../../types/post";
import { Schema } from "./PostSchema";
import { createPostAsync } from "../../slices/postSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import z from "zod";
import "./PostForm.css";

type FormFields = z.infer<typeof Schema>;
type postFormProps = {
  post?: Post;
};

const PostForm = ({ post }: postFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: post
      ? {
          title: post.title,
          description: post.body,
          file: post.photo,
        }
      : undefined,
    resolver: zodResolver(Schema),
  });
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const { title, description, file } = data;
      await dispatch(createPostAsync({ title, description, file })).unwrap();
      reset();
      setImage(null);
      alert("success");
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
          <Button disabled={isSubmitting}>{isSubmitting ? "Posting..." : "Post"}</Button>
          <div className="root-error-container">
            {errors.root?.message && <span className="input-error">{errors.root?.message}</span>}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default PostForm;
