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
  const imgUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      const response = await axios.get("http://localhost:5220/api/Specialties");
      setSpecialties(response.data);
    };
    fetchSpecialties();
  }, []);

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

    const fileList = specialty.image
      ? [
          {
            uid: "-1",
            name: "Ảnh đã tải",
            status: "done",
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

      message.success("Xóa chuyên khoa thành công");
    } catch (error) {
      message.error("Xóa thất bại");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      let imageFilename = "";

      if (values.image && values.image.length > 0) {
        if (values.image[0].originFileObj) {
          imageFilename = values.image[0].name;
        } else {
          const url = values.image[0].url || values.image[0].thumbUrl;
          imageFilename = url.split("/").pop();
        }
      }

      const payload = {
        ...values,
        image: imageFilename,
      };

      if (editingSpecialty) {
        const response = await axios.put(
          `http://localhost:5220/api/Specialties/${editingSpecialty.specialtyId}`,
          { ...editingSpecialty, ...payload }
        );

        const updatedSpecialty = response.data;

        setSpecialties((prev) =>
          prev.map((specialty) =>
            specialty.specialtyId === updatedSpecialty.specialtyId ? updatedSpecialty : specialty
          )
        );

        message.success("Cập nhật thành công");
      } else {
        const response = await axios.post("http://localhost:5220/api/Specialties", {
          ...payload,
          createdAt: new Date().toISOString(),
        });

        setSpecialties((prev) => [...prev, response.data]);
        message.success("Thêm mới thành công");
      }

      setIsModalVisible(false);
      setEditingSpecialty(null);
      form.resetFields();
    } catch (err) {
      console.error("Lỗi khi gửi form", err);
      message.error("Gửi biểu mẫu thất bại");
    }
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "specialtyId",
      key: "specialtyId",
      width: "10%",
    },
    {
      title: "Tên chuyên khoa",
      dataIndex: "specialtyName",
      key: "specialtyName",
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: "15%",
      render: (url: string) => (
        <img src={`${imgUrl}/${url}`} alt="Chuyên khoa" className="h-12 w-auto" />
      ),
    },
    {
      title: "Hành động",
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
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa chuyên khoa này không?"
            onConfirm={() => handleDelete(specialty.specialtyId)}
            okText="Có"
            cancelText="Không"
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Quản lý chuyên khoa</h1>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <PageBreadCrumb pageTitle="Quản lý chuyên khoa" />
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm chuyên khoa
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <Table dataSource={specialties} columns={columns} rowKey="specialtyId" />
      </div>

      <Modal
        title={editingSpecialty ? "Chỉnh sửa chuyên khoa" : "Thêm chuyên khoa"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="specialtyName"
          label="Tên chuyên khoa"
          rules={[
            { required: true, message: "Vui lòng nhập tên chuyên khoa" },
            {
              pattern: /^[A-Za-zÀ-ỹ\s\-]+$/u,
              message: "Tên không được chứa số hoặc ký tự đặc biệt",
            },
            {
              validator: (_, value) =>
                value && value.trim() !== ""
                  ? Promise.resolve()
                  : Promise.reject("Tên không được để trống hoặc chỉ chứa khoảng trắng"),
            },
          ]}
        >
          <Input />
        </Form.Item>


          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Tải ảnh"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
            rules={[{ required: true, message: "Vui lòng tải ảnh" }]}
          >
            <Upload name="image" listType="picture" beforeUpload={() => false} accept="image/*">
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
              <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                {editingSpecialty ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SpecialtiesManagement;
