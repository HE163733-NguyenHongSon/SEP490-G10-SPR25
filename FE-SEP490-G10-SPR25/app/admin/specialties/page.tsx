"use client";
import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Popconfirm, Space, Table, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import PageBreadCrumb from "../components/PageBreadCrumb";



interface ISpecialty {
  specialtyId: number;
  specialtyName: string;
  description: string;
  image: string;
  createdAt: string;
}

const SpecialtiesManagement = () => {
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  useEffect(() => {
    const fetchSpecialties = async() => {
      const response =  await axios.get("http://localhost:5220/api/Specialties")
      setSpecialties(response.data)
    }
    fetchSpecialties()
  },[])

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
  
    // Convert image string to Upload format
    const fileList = specialty.image
      ? [
          {
            uid: '-1',
            name: 'Uploaded Image',
            status: 'done',
            url: specialty.image,
          },
        ]
      : [];
  
    form.setFieldsValue({
      ...specialty,
      image: fileList,
    });
  
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5220/api/Specialties/${id}`);
      setSpecialties((prev) => prev.filter((s) => s.specialtyId !== id));
  
      message.success("Deleted successfully");
    } catch (error) {
      message.error("Failed to delete");
    }
  };
  

  const handleSubmit = async (values: any) => {
    try {
      if (editingSpecialty) {
        const response = await axios.put(
          `http://localhost:5220/api/Specialties/${editingSpecialty.specialtyId}`,
          { ...editingSpecialty, ...values }
        );
  
        const updated = response.data;
  
        setSpecialties((prev) =>
          prev.map((s) =>
            s.specialtyId === updated.specialtyId ? updated : s
          )
        );
  
        message.success("Updated successfully");
      } else {
        const response = await axios.post("http://localhost:5220/api/Specialties", {
          ...values,
          createdAt: new Date().toISOString(),
        });
  
        setSpecialties((prev) => [...prev, response.data]);
        message.success("Created successfully");
      }
  
      setIsModalVisible(false);
      setEditingSpecialty(null);
      form.resetFields();
    } catch (err) {
      console.error("Error submitting form", err);
      message.error("Error submitting form");
    }
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
      render: (_: any, specialty: ISpecialty) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(specialty)}
            type="primary"
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this service?"
            onConfirm={() => handleDelete(specialty.specialtyId)}
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
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              name="image"
              listType="picture"
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
