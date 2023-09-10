import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

type UserFormType = {
  userName: string;
  termsOfService: boolean;
  user: {
    firstName: string;
    lastName: string;
  };
};

type UserDetailsType = {
  onSubmit?: (values: UserFormType) => void;
};

const UserDetails: React.FC<UserDetailsType> = ({ onSubmit }) => {
  const router = useRouter();
  const { userName } = router.query;
  const form = useForm<UserFormType>({
    initialValues: {
      userName: "",
      termsOfService: false,
      user: {
        firstName: "",
        lastName: "",
      },
    },

    validate: {
      userName: (value) => (value?.length < 2 ? "Invalid User Name" : null),
      termsOfService: (value) => (!value ? "Please accect terms" : null),
      user: {
        firstName: (value) =>
          value.length < 2 ? "First name must have at least 2 letters" : null,
        lastName: (value) =>
          value.length < 2 ? "Last name must have at least 2 letters" : null,
      },
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          if (onSubmit) {
            onSubmit(values);
          }
        })}
      >
        <TextInput
          withAsterisk
          label="User Name"
          placeholder=""
          {...form.getInputProps("userName")}
        />

        <TextInput
          withAsterisk
          label="First Name"
          {...form.getInputProps("user.firstName")}
        />

        <TextInput
          withAsterisk
          label="Last Name"
          {...form.getInputProps("user.lastName")}
        />
        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group position="right" mt="md">
          <Button
            variant="outline"
            color="yellow"
            type="button"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};

export default UserDetails;
