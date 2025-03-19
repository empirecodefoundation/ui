import React from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/toast-context";

export function ToastExample() {
  const { toast } = useToast();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Default Toast",
            description: "This is a default toast message",
          });
        }}
      >
        Default Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Success Notification",
            description: "Your action was completed successfully",
            variant: "success",
          });
        }}
      >
        Success Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Warning Alert",
            description: "This action requires attention",
            variant: "warning",
          });
        }}
      >
        Warning Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Information",
            description: "Here's some information you might need",
            variant: "info",
          });
        }}
      >
        Info Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Error Occurred",
            description: "There was a problem with your request",
            variant: "destructive",
          });
        }}
      >
        Error Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: "Toast with Action",
            description: "This toast has an action button",
            action: (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  console.log("Toast action clicked");
                }}
              >
                Undo
              </Button>
            ),
          });
        }}
      >
        Toast with Action
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          const id = toast({
            title: "Updating Toast",
            description: "This toast will update in 2 seconds",
          });

          setTimeout(() => {
            toast.update(id, {
              title: "Toast Updated",
              description: "This toast has been updated!",
              variant: "success",
            });
          }, 2000);
        }}
      >
        Updating Toast
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          // Show multiple toasts to demonstrate stacking
          toast({
            title: "First Toast",
            description: "This is the first toast",
          });

          setTimeout(() => {
            toast({
              title: "Second Toast",
              description: "This is the second toast",
              variant: "info",
            });
          }, 500);

          setTimeout(() => {
            toast({
              title: "Third Toast",
              description: "This is the third toast",
              variant: "success",
            });
          }, 1000);
        }}
      >
        Multiple Toasts
      </Button>
    </div>
  );
}
