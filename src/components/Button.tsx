// src/components/Button.tsx
import React from "react";
import styled from "styled-components";

// Button Component
const Button = ({
  children,
  disabled,
  $variant, // 'red' or 'outlined'
  type = "button", // default to "button" to prevent unintended form submission
}: {
  children: React.ReactNode;
  disabled?: boolean;
  $variant: "red" | "outlined";
  type?: "button" | "submit" | "reset";
}) => (
  <StyledButton disabled={disabled} $variant={$variant} type={type}>
    {children}
  </StyledButton>
);

export default Button;

// Styled Button component
const StyledButton = styled.button<{ $variant: "red" | "outlined" }>`
  width: 100%;
  padding: 10px;
  background-color: ${(props) =>
    props.$variant === "red"
      ? props.disabled
        ? "#ccc"
        : "#ff0000"
      : "transparent"};
  color: ${(props) =>
    props.$variant === "red" ? "white" : "var(--primary-color)"};
  border: ${(props) =>
    props.$variant === "outlined" ? "1px solid var(--n80-color)" : "none"};
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-bottom: ${(props) => (props.$variant === "red" ? "1.2rem" : "6rem")};

  /* Optional: Add hover effects */
  &:hover {
    background-color: ${(props) =>
      !props.disabled && props.$variant === "red" ? "#cc0000" : ""};
    border-color: ${(props) =>
      !props.disabled && props.$variant === "outlined" ? "#0056b3" : ""};
  }
`;
