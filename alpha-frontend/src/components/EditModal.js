import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  FormGroup,
  Input,
  CustomInput,
} from "reactstrap";

class EditModal extends Component {
  state = {
    id_product: 0,
    productName: "",
    stock: 0,
    price: 0,
    categoryName: 0,
    description: "",
    image: {
      imageName: "Choose File",
      imageFile: undefined,
    },
  };

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      id_product: data.id_product,
      productName: data.productName,
      stock: data.stock,
      price: data.price,
      description: data.description,
      image: {
        imageName: "Choose File",
        imageFile: data.imagepath,
      },
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.props;
    if (prevProps.data !== data && data) {
      this.setState({
        id_product: data.id_product,
        productName: data.productName,
        stock: data.stock,
        price: data.price,
        description: data.description,
      });
    }
    // undefined.stock
  }

  onChangeInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  onChangeImage = (e) => {
    // File gambar masuk kedalam state
    if (e.target.files[0]) {
      this.setState({
        image: {
          imageName: e.target.files[0].name,
          imageFile: e.target.files[0],
        },
      });
    } else {
      this.setState({
        image: {
          imageName: "Choose File",
          imageFile: undefined,
        },
      });
    }
  };

  editButton = () => {
    const { toggle, editData } = this.props;
    toggle();
    editData(this.state);
  };

  render() {
    const { isOpen, toggle, data } = this.props;
    const { productName, description, price, stock } = this.state;
    console.log(data);
    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit a Product</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Product Name</Label>
                <Input
                  type="text"
                  id="productName"
                  onChange={this.onChangeInput}
                  value={productName}
                />
                <Label>Caption</Label>
                <Input
                  type="text"
                  id="description"
                  onChange={this.onChangeInput}
                  value={description}
                />
                <Label>Price</Label>
                <Input
                  type="number"
                  id="price"
                  onChange={this.onChangeInput}
                  value={price}
                />
                <Label>Stock</Label>
                <Input
                  type="number"
                  id="stock"
                  onChange={this.onChangeInput}
                  value={stock}
                />
                <Label>Category</Label>
                <p>1.Shampo</p>
                <p>2.Sabun</p>
                <p>3.Parfume</p>
                <Input
                  type="number"
                  id="categoryName"
                  onChange={this.onChangeInput}
                  // value={categoryName}
                  min="1"
                  max="4"
                />
                <Label>Image</Label>
                <CustomInput
                  id="inputImage"
                  type="file"
                  label={this.state.image.imageName}
                  onChange={this.onChangeImage}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.editButton}>
              Confirm Edit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
