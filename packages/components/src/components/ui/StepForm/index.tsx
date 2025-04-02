// @ts-nocheck
"use client";

import React, { useState } from "react";
import {
  Stepper,
  StepperHeader,
  StepperContent,
  StepperFooter,
} from "@/components/core/step-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Brush } from "lucide-react";

const StepContent = ({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Card className="">
    <CardContent className="pt-6">
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 mr-2 text-primary" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      {children}
    </CardContent>
  </Card>
);

//remove this logic if you dont want the color picker in your form
const ColorPicker = ({
  selectedColor,
  onChange,
}: {
  selectedColor: string;
  onChange: (color: string) => void;
}) => {
  const colors = ["#646665", "#525453", "#333634", "#363837", "#000000"];

  return (
    <div className="flex space-x-2">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
            selectedColor === color ? "border-black" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        ></div>
      ))}
    </div>
  );
};
//

export const StepFormExample = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    color: "#000000",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleSubmit = () => {
    alert(`Form submitted: ${JSON.stringify(formData)}`);
  };

  const steps = [
    {
      title: "Personal Info",
      content: (
        <StepContent
          icon={User}
          title="Personal Information"
          description="Please enter your full name"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
        </StepContent>
      ),
    },
    {
      title: "Contact",
      content: (
        <StepContent
          icon={Mail}
          title="Contact Information"
          description="Please provide your email address"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
        </StepContent>
      ),
    },
    {
      title: "Color",
      content: (
        <StepContent
          icon={Brush}
          title="Your preferences"
          description="Please select your favorite color"
        >
          <div className="flex space-x-3 items-center">
            <Label htmlFor="color">Color</Label>
            <ColorPicker
              selectedColor={formData.color}
              onChange={handleColorChange}
            />
          </div>
        </StepContent>
      ),
    },
    {
      title: "Password",
      content: (
        <StepContent
          icon={Lock}
          title="Create Password"
          description="Choose a secure password for your account"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>
        </StepContent>
      ),
    },
  ];

  return (
    <div className="w-xl my-10">
      <Stepper steps={steps}>
        <StepperHeader />
        <StepperContent />
        <StepperFooter onSubmit={handleSubmit} />
      </Stepper>
    </div>
  );
};
