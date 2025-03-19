import * as React from "react";
import {
  Toast,
  ToastAction,
  ToastActionElement,
  ToastClose,
  ToastDescription,
  ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: ToastProps["variant"];
  duration?: number;
};

type Toast = ToastOptions & {
  id: string;
  onOpenChange?: (open: boolean) => void;
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastOptions & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
      id: string;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      id: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      id: string;
    };

interface ToastContextValue {
  toasts: ToasterToast[];
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  update: (id: string, options: ToastOptions) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

function toastReducer(state: ToasterToast[], action: Action): ToasterToast[] {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return [action.toast, ...state].slice(0, TOAST_LIMIT);

    case actionTypes.UPDATE_TOAST:
      return state.map((t) =>
        t.id === action.id ? { ...t, ...action.toast } : t
      );

    case actionTypes.DISMISS_TOAST:
      return state.map((t) =>
        t.id === action.id ? { ...t, onOpenChange: () => {} } : t
      );

    case actionTypes.REMOVE_TOAST:
      return state.filter((t) => t.id !== action.id);

    default:
      return state;
  }
}

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, dispatch] = React.useReducer(toastReducer, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = genId();

      const update = (props: ToastOptions) =>
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          id,
          toast: { ...props },
        });

      const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, id });

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
          ...options,
          id,
          onOpenChange: (open) => {
            if (!open) dismiss();
          },
        },
      });

      return id;
    },
    [dispatch]
  );

  const update = React.useCallback(
    (id: string, options: ToastOptions) => {
      dispatch({
        type: actionTypes.UPDATE_TOAST,
        id,
        toast: { ...options },
      });
    },
    [dispatch]
  );

  const dismiss = React.useCallback(
    (id: string) => {
      dispatch({ type: actionTypes.DISMISS_TOAST, id });
    },
    [dispatch]
  );

  React.useEffect(() => {
    const timeouts = new Map<string, ReturnType<typeof setTimeout>>();

    toasts.forEach((toast) => {
      if (!toast.id) return;

      if (timeouts.has(toast.id)) {
        clearTimeout(timeouts.get(toast.id));
      }

      timeouts.set(
        toast.id,
        setTimeout(() => {
          dispatch({ type: actionTypes.REMOVE_TOAST, id: toast.id });
        }, TOAST_REMOVE_DELAY)
      );
    });

    return () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, [toasts, dispatch]);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss, update }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return context;
}

function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export { Toaster };
