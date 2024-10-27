"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "../Counter/Counter";
import { loginButtonRegistry } from "./login-registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(
  loginButtonRegistry.component,
  loginButtonRegistry.options
);
