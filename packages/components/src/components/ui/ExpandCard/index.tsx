// @ts-nocheck
import { ExapndCard } from "@/components/core/expand-card";

export const ExpandCardExample = () => {
  return (
    <div className="p-6">
      <ExapndCard
        name={"Chaitanya"}
        title={"Intern"}
        company={"Misty Interactive Solutions"}
        imageUrl={
          "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
        }
        rating={2}
        socials={[
          { name: "LinkedIn", href: "" },
          { name: "Email", href: "" },
          { name: "twitter", href: "" },
        ]}
        additional_information="This section contains additional information about the client, their projects, and any other relevant details."
        redirectLink={""}
      />
    </div>
  );
};
