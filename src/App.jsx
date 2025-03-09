import React, { useState } from "react";
import ProductTable from "./components/ProductTable";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/thumbnail.png",
      name: "iPhone 5s",
      description: "The iPhone 5s is a classic smartphone known for its compact design and advanced features during its release. While it's an older model, it still provides a reliable user experience.",
      price: 199.99,
      discount: "12",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/thumbnail.png",
      name: "iPhone 6",
      description: "The iPhone 6 is a stylish and capable smartphone with a larger display and improved performance. It introduced new features and design elements, making it a popular choice in its time.",
      price: 299.99,
      discount: "5",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/thumbnail.png",
      name: "iPhone 13 Pro",
      description: "The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.",
      price: 1099.99,
      discount: "18.3",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png",
      name: "iPhone X",
      description: "The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.",
      price: 899.99,
      discount: "14",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20A57/thumbnail.png",
      name: "Oppo A57",
      description: "The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.",
      price: 249.99,
      discount: "12",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20F19%20Pro%20Plus/thumbnail.png",
      name: "Oppo F19 Pro Plus",
      description: "The Oppo A57 is a mid-range smartphone known for its sleek design and capable features.",
      price: 399.99,
      discount: "16",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/Oppo%20K1/thumbnail.png",
      name: "Oppo K1",
      description: "The Oppo K1 series offers a range of smartphones with various features and specifications. Known for their stylish design and reliable performance, the Oppo K1 series caters to diverse user preferences.",
      price: 299.99,
      discount: "15",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/Realme%20C35/thumbnail.png",
      name: "Realme C35",
      description: "The Realme C35 is a budget-friendly smartphone with a focus on providing essential features for everyday use. It offers a reliable performance and user-friendly experience.",
      price: 149.99,
      discount: "16",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/Realme%20X/thumbnail.png",
      name: "Realme X",
      description: "The Realme X is a mid-range smartphone known for its sleek design and impressive display. It offers a good balance of performance and camera capabilities for users seeking a quality device.",
      price: 299.99,
      discount: "2",
    },
    {
      thumbnail: "https://cdn.dummyjson.com/products/images/smartphones/Realme%20XT/thumbnail.png",
      name: "Realme XT",
      description: "The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.",
      price: 349.99,
      discount: "3",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    thumbnail: "",
    name: "",
    description: "",
    price: "",
    discount: "",
  });

  const computeDiscountPercentage = (price, discount) => {
    if (!price || !discount) return "0%";
    const originalPrice = parseFloat(price);
    const discountValue = parseFloat(discount);
    if (isNaN(originalPrice) || isNaN(discountValue) || discountValue >= originalPrice) return "0%";
    const discountPercentage = ((originalPrice - discountValue) / originalPrice) * 100;
    return discountPercentage.toFixed(2) + "%";
  };

  const handleAddProduct = () => {
    if (newProduct.thumbnail && newProduct.name && newProduct.description && newProduct.price) {
      const discountPercentage = computeDiscountPercentage(newProduct.price, newProduct.discount);
      
      setProducts([...products, { 
        ...newProduct, 
        price: parseFloat(newProduct.price).toFixed(2),
        discount: discountPercentage
      }]);
  
      setNewProduct({
        thumbnail: "",
        name: "",
        description: "",
        price: "",
        discount: "",
      });
  
      setShowModal(false);
    } else {
      alert("Please fill in all fields before adding a product.");
    }
  };

  const handleInputChange = (field, value) => {
    setNewProduct((prev) => {
      const updatedProduct = { ...prev, [field]: value };
      if (field === "price" || field === "discount") {
        updatedProduct.discount = computeDiscountPercentage(updatedProduct.price, updatedProduct.discount);
      }
      return updatedProduct;
    });
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid mb-4 p-3" style={{ minHeight: "60vh" }}>
      <div className="justify-content-center text-center">
        <h2 className="bg-primary text-white fs-3 p-3 rounded">PRODUCTS DEMO</h2>
        <div className="mb-3 position-relative">
          <Form.Control
            type="text"
            className="p-3 pe-5"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn btn-light position-absolute end-0 top-50 translate-middle-y me-2"
              style={{ border: "none", background: "none", cursor: "pointer" }}
              onClick={handleClearSearch}
            >
              ❌
            </button>
          )}
        </div>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add Product
        </Button>
      </div>
      <ProductTable products={filteredProducts} setProducts={setProducts} />

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["thumbnail", "name", "description", "price", "discount"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                <Form.Control
                  as={field === "description" ? "textarea" : "input"}
                  rows={field === "description" ? 3 : undefined}
                  placeholder={`Enter ${field}`}
                  value={newProduct[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  style={field === "description" ? { resize: "none" } : {}}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
