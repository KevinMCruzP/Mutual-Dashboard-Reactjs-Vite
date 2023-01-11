import { Button, Flex, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "./components/Form/Input";

type SignInFormData = {
  email: string;
  password: string;
};

const signInSchema = yup
  .object({
    email: yup
      .string()
      .required("Email obligatorio")
      .email("El email es invalido"),
    password: yup.string().required("Clave obligatoria"),
  })
  .required();

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: yupResolver(signInSchema) });

  const handleSignIn: SubmitHandler<SignInFormData> = (values) => {
    // Routes.push("/dashboard");
  };

  return (
    <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            idName="email"
            type="email"
            label="Email"
            {...register("email")}
            error={errors.email}
          />
          <Input
            idName="password"
            type="password"
            label="Password"
            error={errors.password}
            {...register("password")}
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
          // isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
