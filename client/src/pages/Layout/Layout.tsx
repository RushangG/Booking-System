import { Outlet, useNavigate } from "react-router-dom";
import { useIsMobile } from "@primereact/hooks";
import {
  ChevronDown,
  Cog,
  Sidebar as SidebarIcon,
  SignOut,
  Users,
} from "@primeicons/react";
import { Avatar } from "@primereact/ui/avatar";
import { Button } from "@primereact/ui/button";
import { Menu } from "@primereact/ui/menu";
import { Sidebar } from "@primereact/ui/sidebar";

export function Layout() {
  const navigate = useNavigate();
  const isMobile = useIsMobile(1024);

  return (
    <>
      <div className="border border-surface-200 dark:border-surface-700 rounded-lg overflow-hidden">
        <Sidebar.Layout className="min-h-192! relative!">
          {isMobile && <Sidebar.Backdrop className="absolute!" />}
          <Sidebar.Root
            id="menu-demo"
            collapsible={isMobile ? "offcanvas" : "icon"}
            overlay={isMobile}
            defaultOpen={!isMobile}
          >
            <Sidebar.Spacer />
            <Sidebar.Aside>
              <Sidebar.Panel>
                <Sidebar.Content>
                  <Sidebar.Group>
                    <Sidebar.GroupLabel>Navigation</Sidebar.GroupLabel>
                    <Sidebar.GroupContent>
                      <Sidebar.Menu>
                        
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton
                            onClick={() => navigate("/customer")}
                          >
                            <Users />
                            <span>Customer</span>
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton
                            onClick={() => navigate("/company")}
                          >
                            <Users />
                            <span>Company</span>
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton
                            onClick={() => navigate("/users")}
                          >
                            <Users />
                            <span> Users </span>
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton
                            onClick={() => navigate("/accommodation")}
                          >
                            <Users />
                            <span>Accommodation</span>
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                        <Sidebar.MenuItem>
                          <Sidebar.MenuButton
                            onClick={() => navigate("/booking")}
                          >
                            <Users />
                            <span>Booking</span>
                          </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                      </Sidebar.Menu>
                    </Sidebar.GroupContent>
                  </Sidebar.Group>
                </Sidebar.Content>
                <Sidebar.Footer>
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Menu.Root className="w-full">
                        <Menu.Trigger as={Sidebar.MenuButton} className="p-1!">
                          <Avatar.Root
                            className="size-6! shrink-0! text-xs!"
                            shape="circle"
                          >
                            <Avatar.Fallback>U</Avatar.Fallback>
                          </Avatar.Root>
                          <span>User</span>
                          <ChevronDown className="ml-auto" />
                        </Menu.Trigger>
                        <Menu.Portal>
                          <Menu.Positioner
                            side="top"
                            align="start"
                            sideOffset={4}
                          >
                            <Menu.Popup>
                              <Menu.List>
                                <Menu.Label>user@gmail.com</Menu.Label>
                                <Menu.Separator />
                                <Menu.Item>
                                  <Cog />
                                  Settings
                                </Menu.Item>
                                <Menu.Separator />
                                <Menu.Item onClick={() => navigate("/login")}>
                                  <SignOut />
                                  Sign out
                                </Menu.Item>
                              </Menu.List>
                            </Menu.Popup>
                          </Menu.Positioner>
                        </Menu.Portal>
                      </Menu.Root>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.Footer>
                <Sidebar.Rail />
              </Sidebar.Panel>
            </Sidebar.Aside>
          </Sidebar.Root>
          <Sidebar.Main>
            <header className="flex h-12 items-center gap-2 border-b border-surface-200 dark:border-surface-700 px-4">
              <Sidebar.Trigger
                as={Button}
                severity="secondary"
                variant="text"
                size="small"
                iconOnly
              >
                <SidebarIcon />
              </Sidebar.Trigger>
            </header>
            <div>
              <Outlet />
            </div>
          </Sidebar.Main>
        </Sidebar.Layout>
      </div>
    </>
  );
}
