import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  theme,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

const userRegisterOptions: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[400],
  },
  grid: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-03-18T00:00:00.000Z",
      "2021-03-19T00:00:00.000Z",
      "2021-03-20T00:00:00.000Z",
      "2021-03-21T00:00:00.000Z",
      "2021-03-22T00:00:00.000Z",
      "2021-03-23T00:00:00.000Z",
      "2021-03-24T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};
const userRegisterSeries = [
  { name: "series1", data: [31, 120, 10, 28, 61, 18, 109] },
];

const appointmentOptions: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[400],
  },
  grid: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "category",
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: ["20", "20", "20", "20", "20", "20", "20"],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
  colors: [theme.colors.pink[500]],
};
const appointmentSeries = [
  { name: "series2", data: [31, 120, 10, 28, 61, 18, 109] },
];

const totalUserOption: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[400],
  },
  labels: ["admin", "user", "doctors"],
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
};
const totalUserSeries = [5, 50, 20];

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex
        w="100%"
        h="100%"
        my="6"
        maxW={1480}
        mx="auto"
        px="6"
        overflow="hidden"
        position="sticky"
      >
        <Sidebar />
        <Flex
          flex="1"
          overflowY="auto"
          __css={{
            "&::-webkit-scrollbar": {
              w: "2",
            },
            "&::-webkit-scrollbar-track": {
              w: "6",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10",
              bg: "gray.600",
            },
          }}
        >
          <SimpleGrid
            w="100%"
            h="100%"
            gap="4"
            minChildWidth="440px"
            alignContent="flex-start"
          >
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Usuarios registrados
              </Text>
              <Chart
                options={userRegisterOptions}
                series={userRegisterSeries}
                type="area"
              />
            </Box>

            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Solicitudes por mes
              </Text>
              <Chart
                options={appointmentOptions}
                series={appointmentSeries}
                type="bar"
              />
            </Box>

            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">
                Admin x User x Doctors
              </Text>
              <Chart
                options={totalUserOption}
                series={totalUserSeries}
                type="pie"
              />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  );
}
