"use client";

import { ILoginForm } from "@/models/login.model";
import { login } from "@/services/auth";
import { BALANCE_ROUTE } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import Button from "antd/es/button/Button";
import Card from "antd/es/card/Card";
import Flex from "antd/es/flex";
import Form, { useForm } from "antd/es/form/Form";
import Item from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import Password from "antd/es/input/Password";
import { useRouter } from "next/navigation";

const boxStyle: React.CSSProperties = {
  width: "100%",
  height: "100vh",
};

export default function LoginPage() {
  const router = useRouter();
  const [form] = useForm<ILoginForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ILoginForm) => login(data),
    onSuccess: () => {
      router.push(BALANCE_ROUTE);
    },
  });

  return (
    <Flex justify="center" align="center" style={boxStyle}>
      <Card title="Login" variant="borderless" style={{ width: "90%" }}>
        <Form form={form} layout="vertical" size="large" onFinish={mutate}>
          <Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Item>
          <Item label="Password" name="password" rules={[{ required: true }]}>
            <Password />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Log In
            </Button>
          </Item>
        </Form>
      </Card>
    </Flex>
  );
}
