"use client";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from "antd";
import { useState } from "react";
import PageBreadCrumb from "../components/PageBreadCrumb";

interface ISpecialty {
  specialtyId: number;
  specialtyName: string;
  description: string;
  image: string;
  createdAt: string;
}

const SpecialtiesManagement = () => {
  const [specialties, setSpecialties] = useState<ISpecialty[]>([
    {
      specialtyId: 1,
      specialtyName: "Cardiology",
      description: "Heart-related treatments and diagnostics.",
      image: "https://via.placeholder.com/100x60.png?text=Cardiology",
      createdAt: "2024-04-01",
    },
    {
      specialtyId: 2,
      specialtyName: "Dermatology",
      description: "Skin care, acne, eczema, and more.",
      image: "https://via.placeholder.com/100x60.png?text=Dermatology",
      createdAt: "2024-04-02",
    },
    {
      specialtyId: 3,
      specialtyName: "Neurology",
      description: "Brain and nervous system disorders.",
      image: "https://via.placeholder.com/100x60.png?text=Neurology",
      createdAt: "2024-04-03",
    },
    {
      specialtyId: 3,
      specialtyName: "Neurology",
      description: "Brain and nervous system disorders.",
      image: "https://via.placeholder.com/100x60.png?text=Neurology",
      createdAt: "2024-04-03",
    },
    {
      specialtyId: 3,
      specialtyName: "Neurology",
      description: "Brain and nervous system disorders.",
      image: "https://via.placeholder.com/100x60.png?text=Neurology",
      createdAt: "2024-04-03",
    },
    {
      specialtyId: 3,
      specialtyName: "Neurology",
      description: "Brain and nervous system disorders.",
      image: "https://via.placeholder.com/100x60.png?text=Neurology",
      createdAt: "2024-04-03",
    },
    {
      specialtyId: 3,
      specialtyName: "Neurology",
      description: "Brain and nervous system disorders.",
      image: "https://via.placeholder.com/100x60.png?text=Neurology",
      createdAt: "2024-04-03",
    },
    {
      specialtyId: 3,
      specialtyName: "Neurology",
      description: "Brain and nervous system disorders.",
      image: "https://via.placeholder.com/100x60.png?text=Neurology",
      createdAt: "2024-04-03",
    },
    {
      specialtyId: 3,
      specialtyName: "Neurology",
      description: "Brain and nervous system disorders.",
      image: "https://via.placeholder.com/100x60.png?text=Neurology",
      createdAt: "2024-04-03",
    },
  ]);

  const [form] = Form.useForm();
  const [editingSpecialty, setEditingSpecialty] = useState<ISpecialty | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setEditingSpecialty(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (specialty: ISpecialty) => {
    setEditingSpecialty(specialty);
    form.setFieldsValue(specialty);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setSpecialties((prev) => prev.filter((s) => s.specialtyId !== id));
    message.success("Deleted successfully");
  };

  const handleSubmit = (values: any) => {
    if (editingSpecialty) {
      setSpecialties((prev) =>
        prev.map((s) =>
          s.specialtyId === editingSpecialty.specialtyId
            ? { ...editingSpecialty, ...values }
            : s
        )
      );
      message.success("Updated successfully");
    } else {
      const newSpecialty = {
        ...values,
        specialtyId: Date.now(),
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setSpecialties((prev) => [...prev, newSpecialty]);
      message.success("Created successfully");
    }

    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "specialtyId",
      key: "specialtyId",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "specialtyName",
      key: "specialtyName",
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "15%",
      render: (url: string) => <img src={url} alt="Specialty" className="h-12 w-auto" />,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (_: any, record: ISpecialty) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this service?"
            onConfirm={() => handleDelete(record.specialtyId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Specialty Management</h1>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <PageBreadCrumb pageTitle="Specialty Management" />
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add New Specialty
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Table dataSource={specialties} columns={columns} rowKey="specialtyId" />
      </div>

      <Modal
        title={editingSpecialty ? "Edit Specialty" : "Add New Specialty"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="specialtyName"
            label="Specialty Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter the image URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingSpecialty ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SpecialtiesManagement;
