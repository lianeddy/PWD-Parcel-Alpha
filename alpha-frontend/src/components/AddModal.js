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

class AddModal extends Component {
  state = {
    productName: "",
    description: "",
    stock: 0,
    price: 0,
    categoryID: 0,
    image: {
      imageName: "Choose File",
      imageFile: undefined,
    },
  };

  onChangeInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };
  onChangeNumber = (e) => {
    this.setState({
      ...this.state,
      [e.target.id]: e.target.value,
    });
  };

  onChangeImage = (e) => {
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

  addButton = () => {
    const { toggle, addData } = this.props;
    toggle();
    addData(this.state);
  };

  toggleCancel = () => {
    const { toggle } = this.props;
    toggle();
    this.setState({
      image: {
        imageName: "Choose File",
        imageFile: undefined,
      },
    });
  };

  render() {
    const { isOpen, toggle } = this.props;
    console.log(this.state);
    return (
      <div>
        <Button
          onClick={toggle}
          color="none"
          style={{ backgroundColor: "#ff8ba7" }}
        >
          ADD
          <Modal isOpen={isOpen} toggle={this.toggleCancel}>
            <ModalHeader toggle={this.toggleCancel}>Add a Product</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Product Name</Label>
                  <Input
                    type="text"
                    id="productName"
                    onChange={this.onChangeInput}
                  />
                  <Label>Caption</Label>
                  <Input
                    type="text"
                    id="description"
                    onChange={this.onChangeInput}
                  />
                  <Label>Price</Label>
                  <Input
                    type="number"
                    id="price"
                    onChange={this.onChangeNumber}
                  />
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    id="stock"
                    onChange={this.onChangeNumber}
                    min="1"
                  />
                  <Label>Category</Label>
                  <p>1.Shampo</p>
                  <p>2.Sabun</p>
                  <p>3.Parfume</p>
                  <Input
                    type="number"
                    id="categoryID"
                    onChange={this.onChangeNumber}
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
              <Button color="primary" onClick={this.addButton}>
                Add
              </Button>
              <Button color="secondary" onClick={this.toggleCancel}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Button>
      </div>
    );
  }
}

export default AddModal;

// import React, { Component } from "react";
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Form,
//   Label,
//   FormGroup,
//   Input,
//   CustomInput,
// } from "reactstrap";

// class AddModal extends Component {
//   state = {
//     isOpen: false,
//     nama: "",
//     caption: "",
//     stock: 0,
//     harga: 0,
//     image: {
//       imageName: "Choose File",
//       imageFile: undefined,
//     },
//   };

//   toggle = (id) => {
//     this.setState({ isOpen: !this.state.isOpen });
//   };
//   render() {
//     return (
//       <div>
//         <Button onClick={this.toggle}>Add</Button>
//         <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
//           <ModalHeader toggle={this.toggleCancel}>Add a Product</ModalHeader>
//           <ModalBody>
//             <Form>
//               <FormGroup>
//                 <Label>Product Name</Label>
//                 <Input type="text" id="nama" onChange={this.onChangeInput} />
//                 <Label>Caption</Label>
//                 <Input type="text" id="caption" onChange={this.onChangeInput} />
//                 <Label>Price</Label>
//                 <Input type="number" id="harga" onChange={this.onChangeInput} />
//                 <Label>Stock</Label>
//                 <Input type="number" id="stock" onChange={this.onChangeInput} />
//                 <Label>Image</Label>
//                 {/* File masuk disini */}
//                 {/* Ketika file diisi jalan function onchangeimage */}
//                 <CustomInput
//                   id="inputImage"
//                   type="file"
//                   label={this.state.image.imageName}
//                   onChange={this.onChangeImage}
//                 />
//               </FormGroup>
//             </Form>
//           </ModalBody>
//           <ModalFooter>
//             <Button color="primary" onClick={this.addButton}>
//               Add
//             </Button>
//             <Button color="secondary" onClick={this.toggleCancel}>
//               Cancel
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default AddModal;
