import { cn } from "@/lib/utils/utils";

export const NotFound = ({
  title,
  description,
  style,
}: {
  title: string;
  description: string;
  style?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full  items-center max-w-xl  py-20 text-center",
        style,
      )}
    >
      <h1 className="text-2xl font-semibold">{title}</h1>
      <br />
      <p className="font-medium">{description}</p>
    </div>
  );
};
