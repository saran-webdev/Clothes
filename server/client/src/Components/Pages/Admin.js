import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import "../Css_pages/Admin.css";
import { message, Popconfirm } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const Adminpg = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  console.log(BACKEND_URL);
  const [productData, setProductData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [validationError, setValidationError] = useState("");
  const [formError, setFormError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/product-get`);
      setProductData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePutRequest = async (id) => {
    const data = {
      productName,
      productId,
      productImage,
      productPrice,
      description,
      category,
      stock
    };
    try {
      await axios.put(`${BACKEND_URL}/product-update/${id}`, data);
      console.log("Data Updated");
      getProducts();
      setIsEditing(false);
      setEditingId(null);
      setValidationError("");
      clearForm();
      messageApi.open({
        type: "success",
        content: "Data Updated"
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error
      });
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/product-delete/${id}`);
      setProductData(productData.filter((product) => product._id !== id));
      messageApi.open({
        type: "success",
        content: "Product deleted successfully"
      });
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: error.message
      });
    }
  };

  const handleEditClick = (id) => {
    const productToEdit = productData.find((product) => product._id === id);
    setEditingId(id);
    setProductName(productToEdit.productName);
    setProductId(productToEdit.productId);
    setProductImage(productToEdit.productImage);
    setProductPrice(productToEdit.productPrice);
    setDescription(productToEdit.description);
    setCategory(productToEdit.category);
    setStock(productToEdit.stock);
    setIsEditing(true);
    setValidationError(""); // Reset validation error
  };

  const handleSaveClick = (id) => {
    if (!productName || !productImage || !productPrice) {
      setValidationError("All fields are required.");
      return;
    }
    handlePutRequest(id);
  };

  const formHandle = async (e) => {
    e.preventDefault();
    if (!productName || !productImage || !productPrice) {
      setFormError("Please fill in all fields");
    } else {
      const data = {
        productName,
        productId,
        productImage,
        productPrice,
        description,
        category,
        stock
      };
      try {
        await axios.post(`${BACKEND_URL}/product-post`, data);
        console.log("Data Submitted Successfully");
        setFormError("");
        clearForm();
        getProducts();
        messageApi.open({
          type: "success",
          content: "Data Submitted Successfully"
        });
      } catch (error) {
        console.error(error);
        messageApi.open({
          type: "error",
          content: error
        });
      }
    }
  };

  const clearForm = () => {
    setProductName("");
    setProductId("");
    setProductImage("");
    setProductPrice(0);
    setDescription("");
    setCategory("");
    setStock(0);
    setValidationError("");
  };

  return (
    <>
      {contextHolder}
      <span className=" d-flex justify-content-center align-items-center flex-column">
        <h1 className=" my-5">Product Add</h1>
        <Form onSubmit={formHandle}>
          <Form.Group controlId="productName">
            <Form.Label>Product Name:</Form.Label>
            <Form.Control
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className=""
            />
          </Form.Group>
          <Form.Group controlId="productId">
            <Form.Label>Product ID:</Form.Label>
            <Form.Control
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productImage">
            <Form.Label>Product Image:</Form.Label>
            <Form.Control
              type="text"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="productPrice">
            <Form.Label>Product Price:</Form.Label>
            <Form.Control
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category:</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {["men", "women", "kids"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="stock">
            <Form.Label>Stock:</Form.Label>
            <Form.Control
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className=" mt-3">
            Add Product
          </Button>
          {formError && <p style={{ color: "red" }}>{formError}</p>}
        </Form>
      </span>
      <span>
        <h1 className=" mt-5  d-flex justify-content-center align-items-center">
          Product Update
        </h1>
        <div className="table-responsive mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>S/no</th>
                <th>productName</th>
                <th>productImage</th>
                <th>productPrice</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {productData &&
                productData.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      {isEditing && editingId === product._id ? (
                        <>
                          <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                          {validationError && (
                            <p style={{ color: "red" }}>{validationError}</p>
                          )}
                        </>
                      ) : (
                        product.productName
                      )}
                    </td>
                    <td>
                      {isEditing && editingId === product._id ? (
                        <input
                          type="text"
                          value={productImage}
                          onChange={(e) => setProductImage(e.target.value)}
                        />
                      ) : (
                        <div className="overflow-hidden">
                          <span
                            className="d-inline-block text-truncate"
                            style={{ maxWidth: "150px" }}
                          >
                            {product.productImage}
                          </span>
                        </div>
                      )}
                    </td>

                    <td>
                      {isEditing && editingId === product._id ? (
                        <input
                          type="text"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      ) : (
                        product.productPrice
                      )}
                    </td>
                    <td>
                      {isEditing && editingId === product._id ? (
                        <Button onClick={() => handleSaveClick(product._id)}>
                          Save
                        </Button>
                      ) : (
                        <Button onClick={() => handleEditClick(product._id)}>
                          Edit
                        </Button>
                      )}
                    </td>
                    <td>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        icon={
                          <QuestionCircleOutlined
                            style={{
                              color: "red"
                            }}
                          />
                        }
                        onConfirm={() => {
                          onDelete(product._id);
                        }}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button variant="danger">Delete</Button>
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </span>
    </>
  );
};

export default Adminpg;
