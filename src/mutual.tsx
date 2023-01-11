import { Button, Flex, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Input } from "./components/Form/Input";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { useToasts } from "./hooks/useToasts";
import { api } from "./services/api";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type SignInFormData = {
  rut: string;
  birthDate: string;
};

const signInSchema = yup
  .object({
    rut: yup
      .string()
      .required("El rut es requerido")
      .matches(/^[0-9]{7,8}-[0-9Kk]$/g, "El rut debe ser valido"),
    birthDate: yup.string().required("Fecha es obligatoria"),
  })
  .required();
export default function Mutual() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) });

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [stateMutual, setStateMutual] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let navigate = useNavigate();

  const { toastSuccess, toastError } = useToasts();

  let Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto: any) {
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
      var tmp = rutCompleto.split("-");
      var digv = tmp[1];
      var rut = tmp[0];
      if (digv == "K") digv = "k";
      return Fn.dv(parseInt(rut)) == digv;
    },
    dv: function (T: number) {
      var M = 0,
        S = 1;
      for (; T; T = Math.floor(T / 10))
        S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
      return S ? S - 1 : "k";
    },
  };

  useEffect(() => {}, [message]);

  const SubmitMutualForm: SubmitHandler<SignInFormData> = async (data) => {
    if (Fn.validaRut(data.rut)) {
      try {
        const response = await api.post("/searchMutual", {
          rut: data.rut,
          birthDate: data.birthDate,
        });

        if (response.status == 200) {
          const mutualData = response.data.message;

          setMessage(mutualData.text);
          setStatus(mutualData.status);

          onOpen();
        } else {
          toastError({ description: "Error al buscar mutual" });
        }

        console.log("response", response);
      } catch (err) {
        toastError({ description: "Error al buscar mutual" });
      }
    } else {
      toastError({ description: "El rut no existe" });
    }
  };

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
          alignItems="top"
          justifyContent="center"
          overflowY="auto"
        >
          <Flex
            as="form"
            w="100%"
            m="0 300px auto 0"
            p={8}
            maxW={360}
            bg="gray.800"
            borderRadius={8}
            flexDir="column"
            onSubmit={handleSubmit(SubmitMutualForm)}
            gap={4}
          >
            <Text fontWeight="bold" fontSize={25}>
              Buscar mutual:{" "}
            </Text>
            <Stack spacing="6">
              <Input
                idName="rut"
                type="rut"
                label="rut (xxxxxxxx-x)"
                {...register("rut")}
                error={errors.rut}
              />
              <Input
                idName="birthDate"
                type="birthDate"
                label="Fecha (dd/mm/YYYY)"
                error={errors.birthDate}
                {...register("birthDate")}
              />
            </Stack>

            <Button
              type="submit"
              mt="6"
              bg="gray.500"
              _hover={{
                bgColor: "gray.400",
              }}
              size="lg"
              isLoading={isSubmitting}
            >
              Entrar
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color="black">
          <ModalHeader>Mutual</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={status == "0" ? "red" : "#5a55e8"}>{message}</Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="#e33939" color={"white"} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
