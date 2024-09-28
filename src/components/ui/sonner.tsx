import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  //@todo
  // const { theme = "system" } = useTheme()

  return (
    <Sonner
      // theme={theme as ToasterProps["theme"]}
      theme="dark"
      richColors
      {...props}
    />
  );
};

export { Toaster };
