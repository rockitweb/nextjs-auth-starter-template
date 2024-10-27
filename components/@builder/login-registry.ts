import { Component } from "@builder.io/sdk";
import LoginButton from "../ui/login";

import { FunctionComponent } from "react";
import { loginButtonProps } from "../ui/login";

export type registeredComponent = {
  component: FunctionComponent;
  options: Component;
};

export const loginButtonRegistry: registeredComponent = {
  component: LoginButton,
  options: {
    name: "LoginButton",
  },
};
