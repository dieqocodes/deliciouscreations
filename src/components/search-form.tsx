import { z } from "zod";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  input: z.string().min(1),
});

export default function SearchForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    navigate(`/search?q=${values.input}`);
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-1/2 px-8 py-4 bg-gray-100 rounded-full flex items-center gap-2"
      >
        <Search size={15} />
        <Controller
          name="input"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Search"
              className="grow bg-transparent outline-none"
            />
          )}
        />
      </form>
    </FormProvider>
  );
}
