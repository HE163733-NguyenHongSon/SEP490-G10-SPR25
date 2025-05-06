"use client";
import React, { useEffect, useState } from "react";
import PageBreadCrumb from "../components/PageBreadCrumb";
import { serviceService } from "../../common/services/serviceService";
import { specialtyService } from "../../common/services/specialtyService";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Space,
  Popconfirm,
  Table,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const ServicesManagement = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingService, setEditingService] = useState<IService | null>(null);

  useEffect(() => {
    fetchServices();
    fetchSpecialties();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getAllServices();
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      message.error("Failed to fetch services");
      setLoading(false);
    }
  };

  const fetchSpecialties = async () => {
    try {
      const data = await specialtyService.getSpecialtyList();
      setSpecialties(data);
    } catch (error) {
      console.error("Error fetching specialties:", error);
      message.error("Failed to fetch specialties");
    }
  };

  const handleEdit = (service: IService) => {
    setEditingService(service);
    form.setFieldsValue({
      serviceName: service.serviceName,
      overview: service.overview,
      process: service.process,
      treatmentTechniques: service.treatmentTechniques,
      price: service.price,
      specialtyId: service.specialtyId,
      estimatedTime: service.estimatedTime,
      image: service.image,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (serviceId: number) => {
    try {
      await serviceService.deleteService(serviceId);
      message.success("Service deleted successfully");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      message.error("Failed to delete service");
    }
  };

  const showModal = () => {
    setEditingService(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: {
    serviceName: string;
    specialtyId: number;
    overview?: string;
    process?: string;
    treatmentTechniques?: string;
    price: number;
    estimatedTime?: string;
    image?: string;
  }) => {
    try {
      if (values.estimatedTime && !values.estimatedTime.includes("minutes")) {
        values.estimatedTime = `${values.estimatedTime} minutes`;
      }

      if (editingService) {
        const payload = {
          ...values,
          serviceId: String(editingService.serviceId),
          overview: values.overview || "",
          process: values.process || "",
          treatmentTechniques: values.treatmentTechniques || "",
          estimatedTime: values.estimatedTime || "",
          image: values.image || "",
        };
        await serviceService.updateService(payload);
      } else {
        const payload = {
          ...values,
          overview: values.overview || "",
          process: values.process || "",
          treatmentTechniques: values.treatmentTechniques || "",
          estimatedTime: values.estimatedTime || "",
          image: values.image || "",
        };
        await serviceService.createService(payload);
      }

      message.success(
        `Service ${editingService ? "updated" : "created"} successfully`
      );
      setIsModalVisible(false);
      fetchServices();
    } catch (error) {
      console.error(
        `Error ${editingService ? "updating" : "creating"} service:`,
        error
      );
      message.error(
        `Failed to ${editingService ? "update" : "create"} service`
      );
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "serviceId",
      key: "serviceId",
      width: "10%",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "serviceName",
      key: "serviceName",
      width: "20%",
    },
    {
      title: "Chuyên khoa",
      dataIndex: "specialtyId",
      key: "specialtyId",
      width: "15%",
      render: (specialtyId: number) => {
        const specialty = specialties.find(
          (s) => Number(s.specialtyId) === specialtyId
        );
        return specialty ? specialty.specialtyName : specialtyId;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "15%",
    },
    {
      title: "Thời gian ước tính",
      dataIndex: "estimatedTime",
      key: "estimatedTime",
      width: "15%",
    },
    {
      title: "Hành động",
      key: "actions",
      width: "25%",
      render: (_: unknown, record: IService) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
            size="small"
          >
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa dịch vụ này?"
            onConfirm={() => handleDelete(Number(record.serviceId))}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger size="small">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý dịch vụ
        </h1>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <PageBreadCrumb pageTitle="Quản lý dịch vụ" />
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm dịch vụ
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Table
          dataSource={services}
          columns={columns}
          loading={loading}
          className="w-full"
        />
      </div>

      <Modal
        title={editingService ? "Edit Service" : "Add New Service"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="serviceName"
            label="Service Name"
            rules={[
              { required: true, message: "Please enter the service name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="specialtyId"
            label="Specialty"
            rules={[{ required: true, message: "Please select a specialty" }]}
          >
            <Select placeholder="Select a specialty">
              {specialties.map((specialty) => (
                <Option
                  key={specialty.specialtyId}
                  value={specialty.specialtyId}
                >
                  {specialty.specialtyName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="overview" label="Overview">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="process" label="Process">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="treatmentTechniques" label="Treatment Techniques">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="estimatedTime" label="Estimated Time">
            <Input placeholder="e.g., 30 minutes" />
          </Form.Item>

          <Form.Item name="image" label="Image URL">
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingService ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ServicesManagement;
