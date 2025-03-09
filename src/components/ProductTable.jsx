import React, { useState } from "react";
import { Modal, Button, Form, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProductTable({ products, setProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [show, setShow] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState();

  const handleShow = (product, event) => {
    if (event.target.tagName === "BUTTON") return;
    setSelectedProductModal(product);
    setShow(true);
  };

  const handleEditClick = (product, index) => {
    setSelectedProduct({ ...product });
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleDeleteClick = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleSaveChanges = () => {
    if (editIndex !== null && selectedProduct) {
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts];
        updatedProducts[editIndex] = { ...selectedProduct };
        return updatedProducts;
      });
      setShowEditModal(false);
      setEditIndex(null);
      setSelectedProduct(null);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage); 

  return (
    <div className="container mt-4">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="bg-body-secondary" style={{ borderTopLeftRadius: "6px" }}>Thumbnail</th>
            <th className="bg-body-secondary">Name</th>
            <th className="bg-body-secondary text-start">Description</th>
            <th className="bg-body-secondary">Price</th>
            <th className="bg-body-secondary">Discount</th>
            <th className="bg-body-secondary" style={{ borderTopRightRadius: "6px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={index} onClick={(e) => handleShow(product, e)} style={{ cursor: "pointer" }}>
              <td>
                <img src={product.thumbnail} alt={product.name} style={{ width: "50px", borderRadius: "6px" }} />
              </td>
              <td style={{ paddingTop: "20px", width: "16vh" }}>{product.name}</td>
              <td className="text-start" style={{ paddingTop: "16px" }}>{product.description}</td>
              <td className="text-primary" style={{ paddingTop: "16px" }}><strong>₱{product.price}</strong></td>
              <td className="text-primary" style={{ paddingTop: "16px", textAlign: "center" }}><strong>{product.discount}%</strong></td>
              <td>
                <div className="d-flex">
                  <button className="btn btn-warning btn-sm text-white me-2" onClick={(e) => { e.stopPropagation(); handleEditClick(product, index); }}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); handleDeleteClick(index); }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Product Details */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <div className="d-flex flex-column">
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "1px",
                fontWeight: 600,
                marginBottom: "-2px",
              }}
            >
              SMARTPHONES
            </p>
            <Modal.Title>{selectedProductModal?.name}</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body className="overflow-auto" style={{ maxHeight: "70vh" }}>
          {/* Image Carousel */}
          <Carousel className="mt-4 mb-5" style={{ marginBottom: "20px" }}>
            <Carousel.Item>
              <img
                className="d-block w-50 mb-4"
                src={selectedProductModal?.thumbnail}
                alt="Product Thumbnail"
                style={{ borderRadius: "6px", margin: "auto", display: "block" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <a href={selectedProductModal?.image1} target="_blank" rel="noopener noreferrer">
                <img
                  className="d-block w-50 mb-4"
                  src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/1.png"
                  alt="Product Image 1"
                  style={{ borderRadius: "6px", margin: "auto", display: "block", }}
                />
              </a>
            </Carousel.Item>
            <Carousel.Item>
              <a href={selectedProductModal?.image2} target="_blank" rel="noopener noreferrer">
                <img
                  className="d-block w-50 mb-4"
                  src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/2.png"
                  alt="Product Image 2"
                  style={{ borderRadius: "6px", margin: "auto", display: "block" }}
                />
              </a>
            </Carousel.Item>
            <Carousel.Item>
              <a href={selectedProductModal?.image3} target="_blank" rel="noopener noreferrer">
                <img
                  className="d-block w-50 mb-4"
                  src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/3.png"
                  alt="Product Image 3"
                  style={{ borderRadius: "6px", margin: "auto", display: "block" }}
                />
              </a>
            </Carousel.Item>
          </Carousel>

          <p className="text-primary" style={{ fontWeight: 300 }}>
            <strong>₱ {selectedProductModal?.price}</strong>
          </p>

          <div className="text-left mb-4">
            <label htmlFor="" className="text-secondary" style={{ fontWeight: 600 }}>
              Discount:
            </label>
            <br />
            <strong className="text-danger"> {selectedProductModal?.discount}%</strong>
          </div>

          <div className="text-left mb-4">
            <label htmlFor="" className="text-secondary" style={{ fontWeight: 600 }}>
              Description:
            </label>
            <p>{selectedProductModal?.description}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Updated Pagination Layout with "Per Page" Option */}
      <div className="d-flex justify-content-evenly align-items-center p-3 border-top">
        {/* Pagination Section */}
        <nav aria-label="Page navigation example">
          <ul className="pagination m-0">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}
                aria-label="Previous" disabled={currentPage === 1}>
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}
                aria-label="Next" disabled={currentPage === totalPages}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <span>
          of {Math.min(indexOfLastItem, products.length)} pages
        </span>

        <div className="position-relative d-inline-block">
          <legend className={`per-page-label ${itemsPerPage ? "active" : ""}`} style={{ fontSize: "14px" }}>
            Per Page
          </legend>
          <select
            className="form-select form-select-sm w-auto d-inline-block ms-2 per-page-select"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            onFocus={() =>
              document.querySelector(".per-page-label").classList.add("active")
            }
            onBlur={() => {
              if (!itemsPerPage) {
                document.querySelector(".per-page-label").classList.remove("active");
              }
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Thumbnail URL</Form.Label>
                <Form.Control type="text" value={selectedProduct.thumbnail} onChange={(e) => setSelectedProduct({ ...selectedProduct, thumbnail: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={selectedProduct.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={selectedProduct.description || ""} 
                  onChange={(e) => setSelectedProduct({...selectedProduct, description: e.target.value})} style={{ resize: "none", height: "20vh" }} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={selectedProduct.price} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Discount</Form.Label>
                <Form.Control type="text" value={selectedProduct.discount} onChange={(e) => setSelectedProduct({ ...selectedProduct, discount: e.target.value })} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSaveChanges}>Save Changes</Button>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
