"use client";
import { deleteExpense, updateExpense } from "@/services/expenses";
import { Expense } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import Button from "antd/es/button";
import Divider from "antd/es/divider";
import Drawer from "antd/es/drawer/";
import Form, { useForm } from "antd/es/form/Form";
import Item from "antd/es/form/FormItem";
import Input from "antd/es/input";
import InputNumber from "antd/es/input-number";
import { useEffect } from "react";

interface ExpenseDrawerProps {
  data: Expense | null;
  onClose: (refetch?: boolean) => void;
}

export default function ExpenseDrawer({ data, onClose }: ExpenseDrawerProps) {
  const [form] = useForm<Partial<Expense>>();
  const update = useMutation({
    mutationFn: (values: Partial<Expense>) =>
      updateExpense({ ...data, ...values }),
    onSuccess: () => onClose(true),
  });

  const remove = useMutation({
    mutationFn: () => deleteExpense(data),
    onSuccess: () => onClose(true),
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Drawer
      destroyOnHidden
      size="large"
      open={!!data}
      onClose={() => {
        form.resetFields();
        onClose();
      }}
      title={data?.label}
    >
      <Form key={data?.id} onFinish={update.mutate} size="large" form={form}>
        <Item
          label="Label"
          name="label"
          rules={[{ required: true, message: "Please enter a label" }]}
        >
          <Input placeholder="e.g. Salary, Bonus" />
        </Item>

        <Item
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please enter the day of month" },
            { type: "number", min: 1, max: 31, message: "Day must be 1–31" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Item>

        <Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter the amount" }]}
        >
          <InputNumber style={{ width: "100%" }} prefix="$" />
        </Item>

        <Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={update.isPending}
          >
            Submit
          </Button>
        </Item>
      </Form>
      <Divider />
      <Button
        type="primary"
        danger
        block
        loading={remove.isPending}
        size="large"
        onClick={() => remove.mutate()}
      >
        Delete
      </Button>
    </Drawer>
  );
}
