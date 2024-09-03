import { Card1 } from "@/components/ui/cards/card1";

export const Card1Demo = () => {
  return (
    <div className="p-6">
      <Card1
        name={"Chaitanya"}
        title={"Intern"}
        company={"Misty Interactive Solutions"}
        imageUrl={
          "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
        }
        rating={5}
        socials={[
          { name: "LinkedIn", href: "" },
          { name: "Email", href: "" },
          { name: "twitter", href: "" },
        ]}
        redirectLink="/chaitanya"
      />
    </div>
  );
};
