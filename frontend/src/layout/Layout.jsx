import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Aside from "./Aside";

export default function Layout({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div className="text-xl mt-4 px-4 font-semibold"><div className ="titulo">PProf</div></div>
      </AppShell.Header>

      <Aside />

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
