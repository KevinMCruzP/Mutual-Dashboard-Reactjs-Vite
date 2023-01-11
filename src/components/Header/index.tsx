import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
  // const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="60px"
      mx="auto"
      mt="4"
      px="6"
      align="center"
      justifyContent="space-between"
      bg="gray.700"
      overflow="hidden"
      position="sticky"
    >
      <Flex>Agregar algo</Flex>
      <Flex>Agregar algo</Flex>
      <Flex>Agregar algo</Flex>

      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          // onClick={onOpen}
          mr="2"
        ></IconButton>
      )}
      {/* <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex> */}
    </Flex>
  );
}
