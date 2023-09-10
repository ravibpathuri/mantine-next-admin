import { AppProps } from "next/app";
import Head from "next/head";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  AppShell,
  Header,
  Navbar,
  MediaQuery,
  Aside,
  Text,
  Footer,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import React from "react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const theme = useMantineTheme();

  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("light");
  const [opened, setOpened] = React.useState(false);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    //setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>My Next App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: colorScheme,
          }}
        >
          <AppShell
            styles={{
              main: {
                background:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
              <Navbar
                p="md"
                hiddenBreakpoint="sm"
                hidden={!opened}
                width={{ sm: 200, lg: 300 }}
              >
                <Text>Application navbar</Text>
              </Navbar>
            }
            header={
              <Header height={{ base: 50, md: 70 }} p="md">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>

                  <Text>Application header</Text>
                </div>
              </Header>
            }
            aside={
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Aside
                  p="md"
                  hiddenBreakpoint="sm"
                  width={{ sm: 200, lg: 300 }}
                >
                  <Text>Application sidebar</Text>
                </Aside>
              </MediaQuery>
            }
            footer={
              <Footer height={60} p="md">
                Application footer
              </Footer>
            }
          >
            {/* Your application here */}
            <Component {...pageProps} />
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
