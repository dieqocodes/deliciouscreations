import { z } from "zod";
import {
  useForm,
  useFieldArray,
  FormProvider,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MaxWidthWrapper from "../../components/max-width-wrapper";
import { CATEGORIES } from "../../constants";
import { PlusCircle, X, Dot, Image, Loader2, RotateCw } from "lucide-react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { toast } from "sonner";
import { useUploadThing } from "../../lib/uploadthing";
import { useState } from "react";
import { createRecipe } from "../../lib/data";
import { useAuth } from "@clerk/clerk-react";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
  category: z.string().min(1),
  ingredients: z
    .array(
      z.object({
        value: z.string().min(1),
      })
    )
    .min(1),
  instructions: z
    .array(
      z.object({
        value: z.string().min(1),
      })
    )
    .min(1),
});

export default function Post() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { userId } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      category: "",
      ingredients: [],
      instructions: [],
    },
  });
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      setImageUrl(data.url);
      form.setValue("imageUrl", data.url);
    },
  });

  const {
    fields: ings,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: ins,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    name: "instructions",
    control: form.control,
  });

  // DropZone Functions
  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles);
  };
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    toast.error(
      `${file.file.type} type is not supported. Please choose a PNG, JPG, or JPEG image instead.`
    );
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ingredients = values.ingredients.map((i) => i.value);
    const instructions = values.instructions.map((i) => i.value);
    const body = {
      ...values,
      userId: `${userId}`,
      ingredients,
      instructions,
    };

    const data = await createRecipe(body);

    if (data.success) {
      toast.success("Recipe has been added!");
      form.reset();
      setImageUrl(null);
    } else {
      toast.error("Something went wrong, try again.");
    }
  };
  return (
    <MaxWidthWrapper className="py-10">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <div className="w-full flex justify-between items-center h-[15vh]">
            <p className="text-4xl poppins-semibold">Create a recipe</p>
            <button
              type="submit"
              className="bg-black text-white flex items-center gap-1"
            >
              <PlusCircle size={15} />
              Create
            </button>
          </div>
          <div className="flex gap-8">
            <div className="w-1/2 flex flex-col gap-8">
              {/* Recipe Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Name"
                    className="outline-none w-full text-2xl poppins-semibold"
                  />
                )}
              />
              {/* Recipe Description */}
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Description"
                    className="outline-none w-full h-[150px] resize-none"
                  />
                )}
              />
              {/* Recipe Category */}
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <select
                    {...field}
                    onChange={(e) => field.onChange(e)}
                    className="outline-none border px-4 py-2 rounded-xl"
                  >
                    <option value="" disabled>
                      Choose a category
                    </option>
                    {CATEGORIES.map((category) => (
                      <option key={category.id} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                )}
              />
              {/* Recipe Image */}
              <div className="w-full rounded-xl border h-[500px]">
                <Dropzone
                  accept={{
                    "image/png": [".png"],
                    "image/jpeg": [".jpeg"],
                    "image/jpg": [".jpg"],
                  }}
                  onDropAccepted={onDropAccepted}
                  onDropRejected={onDropRejected}
                >
                  {({ getInputProps, getRootProps }) => (
                    <div
                      className="w-full h-full grid place-items-center p-4"
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {!isUploading && !imageUrl && <Image size={15} />}
                      {isUploading && (
                        <Loader2 size={15} className="animate-spin" />
                      )}
                      {imageUrl && (
                        <div className="w-full h-full relative grid place-items-center">
                          <img
                            src={imageUrl}
                            alt="upload image"
                            className="w-full object-contain rounded-xl"
                          />
                          <button className="bg-red-400 absolute top-0 right-0 p-2">
                            <RotateCw size={15} className="text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-8">
              {/* Recipe Ingredients */}
              <div className="flex flex-col items-start gap-2">
                <p className="text-lg poppins-semibold">Ingredients</p>
                {ings.map((field, index) => (
                  <div
                    className="w-full flex items-center gap-2"
                    key={field.id}
                  >
                    <div className="flex items-center gap-1 grow">
                      <Dot />
                      <Controller
                        control={form.control}
                        name={`ingredients.${index}.value`}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="w-full outline-none grow"
                          />
                        )}
                      />
                    </div>
                    <button
                      className="bg-red-400 p-2 rounded-lg text-white"
                      onClick={() => remIng(index)}
                      type="button"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addIng({ value: "" })}
                  className="bg-black text-white flex items-center gap-1 w-auto text-sm"
                  type="button"
                >
                  <PlusCircle size={15} />
                  Add
                </button>
              </div>
              {/* Recipe Instructions */}
              <div className="flex flex-col items-start gap-2">
                <p className="text-lg poppins-semibold">Instructions</p>
                {ins.map((field, index) => (
                  <div
                    className="w-full flex items-start justify-start gap-2"
                    key={field.id}
                  >
                    <div className="flex items-start justify-start gap-2 grow">
                      <p>{index + 1}.</p>
                      <Controller
                        control={form.control}
                        name={`instructions.${index}.value`}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            className="w-full outline-none grow h-[100px] resize-none"
                          />
                        )}
                      />
                    </div>
                    <button
                      className="bg-red-400 p-2 rounded-lg text-white"
                      onClick={() => remIns(index)}
                      type="button"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addIns({ value: "" })}
                  className="bg-black text-white flex items-center gap-1 w-auto text-sm"
                  type="button"
                >
                  <PlusCircle size={15} />
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </MaxWidthWrapper>
  );
}
