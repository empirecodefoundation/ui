import { PasscodeCard } from "@/components/ui/cards/passcode-input";

export const PasscodeCardDemo1 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <PasscodeCard correctPasscode="1234567" length={7} />
    </div>
  );
};
