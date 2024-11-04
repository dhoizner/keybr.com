import {
  type AnyUser,
  Avatar,
  type PageInfo,
  Pages,
  usePageData,
} from "@keybr/pages-shared";
import { Icon } from "@keybr/widget";
import { clsx } from "clsx";
import { type ReactNode } from "react";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import * as styles from "./NavMenu.module.less";
import { SubMenu } from "./SubMenu.tsx";
import { ThemeSwitcher } from "./themes/ThemeSwitcher.tsx";

export function NavMenu({
  currentPath,
}: {
  readonly currentPath: string;
}): ReactNode {
  const { publicUser } = usePageData();
  return (
    <div className={styles.root}>
      <MenuItem>
        <ThemeSwitcher />
      </MenuItem>

      <MenuItem>
        <MenuItemLink page={Pages.practice} />
      </MenuItem>

      <MenuItem>
        <MenuItemLink page={Pages.profile} />
      </MenuItem>

      <MenuItem>
        <MenuItemLink page={Pages.help} />
      </MenuItem>

      <MenuItem>
        <MenuItemLink page={Pages.typingTest} />
      </MenuItem>

      <MenuItem>
        <MenuItemLink page={Pages.wordCount} />
      </MenuItem>

      <MenuItem>
        <SubMenu currentPath={currentPath} />
      </MenuItem>
    </div>
  );
}

function MenuItem({ children }: { readonly children: ReactNode }): ReactNode {
  return <div className={styles.item}>{children}</div>;
}

function AccountLink({ user }: { readonly user: AnyUser }): ReactNode {
  const { formatMessage } = useIntl();
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(styles.accountLink, isActive && styles.isActive)
      }
      to={Pages.account.path}
      title={
        user.id != null
          ? formatMessage({
              id: "page.account.link.named.description",
              defaultMessage: "Manage your online account.",
            })
          : formatMessage({
              id: "page.account.link.anonymous.description",
              defaultMessage: "Sign-in for an online account.",
            })
      }
    >
      <Avatar user={user.id != null ? user : null} size="large" />
      <span className={styles.userName}>
        {user.id != null
          ? user.name
          : formatMessage({
              id: "account.widget.signIn.label",
              defaultMessage: "Sign-In",
            })}
      </span>
    </NavLink>
  );
}

function MenuItemLink({
  page: {
    path,
    link: { label, title, icon },
  },
}: {
  readonly page: PageInfo;
}): ReactNode {
  const { formatMessage } = useIntl();
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(styles.link, isActive && styles.isActive)
      }
      to={path}
      title={title && formatMessage(title)}
    >
      <Icon shape={icon ?? ""} />
      <span className={styles.label}>{formatMessage(label)}</span>
    </NavLink>
  );
}
