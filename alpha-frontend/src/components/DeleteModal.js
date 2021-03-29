import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class DeleteModal extends Component {
  state = {
      isOpen : false
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const {  toggle, deleteData } = this.props;
    return (
      <div>
        <Button color="danger"  onClick={this.toggle}>
          Delete
        </Button>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader toggle={toggle}>Delete product ?</ModalHeader>
          <ModalBody>Apakah anda yakin mau menghapus produk ?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteData}>
              Delete Product
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
