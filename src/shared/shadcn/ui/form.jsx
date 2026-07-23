"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/shadcn/ui/label";
import { Button } from "@/shared/shadcn/ui/button";
import { ArrowButton } from "@/features/global-ui";
import { Loader } from "lucide-react";

const Form = FormProvider;

const FormFieldContext = React.createContext({});

const FormField = ({ ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItemContext = React.createContext({});

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn(className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return <Label ref={ref} className={cn(className)} htmlFor={formItemId} {...props} />;
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-muted-foreground text-[0.9em]", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("flex gap-1 text-[0.9em] font-medium text-destructive", className)}
      {...props}>
      <span>*</span> {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

const FormSubmit = ({ children, arrowButton = false, ...props }) => {
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();

  const disabled = isSubmitting;

  if (arrowButton) {
    return (
      <ArrowButton
        type="submit"
        disabled={disabled}
        size="lg"
        bgColor="gray-darker"
        dimmerColor="blue"
        className={cn("mobile:w-full", props.className)}
        {...props}>
        {isSubmitting ? <Loader className="h-4 w-4 animate-spin" /> : children}
      </ArrowButton>
    );
  }

  return (
    <Button
      type="submit"
      disabled={disabled}
      variant="gray-darker"
      size="lg"
      className={cn("mobile:w-full", props.className)}
      {...props}>
      {isSubmitting ? <Loader className="h-4 w-4 animate-spin" /> : children}
    </Button>
  );
};

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormSubmit,
};
