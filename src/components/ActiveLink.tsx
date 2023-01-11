import { cloneElement } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface ActiveLinkProps {
  children: React.ReactElement;
  shouldMatchExactHref?: boolean;
  href: string;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  let isActive = false;

  const asPath = useLocation();

  if (asPath.pathname === rest.href) {
    isActive = true;
  }

  return (
    <NavLink {...rest} to={rest.href}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </NavLink>
  );
}
