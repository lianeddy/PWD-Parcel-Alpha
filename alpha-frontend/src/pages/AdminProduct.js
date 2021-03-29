import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Table,
  Input,
  //   Spinner,
  InputGroup,
  InputGroupAddon,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { api } from "../helpers";
// import { api_url } from "../helpers";
import {
  fetchProductsAdmin,
  deleteProductsAction,
  filterByName,
  filterByPrice,
  addProductAction,
  nullifyErrorAction,
  editProductsAction,
} from "../redux/actions";
import style from "../components/component.module.css";
import Swal from "sweetalert2";
import { AddModal, EditModal } from "../components";
import { FcSearch } from "react-icons/fc";

class AdminProduct extends Component {
  state = {
    valProduct: {},
    productName: "",
    isOpenAdd: false,
    isOpendEdit: false,
    dropdownOpen: false,
  };
  ////Admin melihat
  //// admin hapus product
  // admnin edit product
  // admin restock
  // admin add product
  componentDidMount() {
    const { fetchProductsAdmin } = this.props;
    fetchProductsAdmin();
  }

  //   componentDidUpdate(prevState, prevProps) {
  //     // console.log("this update");
  //   }

  onClickSearch = () => {
    const { filterByName } = this.props;
    const { productName } = this.state;
    filterByName({ productName });
  };
  onChangeSearch = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  deleteSwal = (id) => {
    const { deleteProductsAction } = this.props;
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductsAction(id);
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  toggleAdd = () => {
    this.setState({ isOpenAdd: !this.state.isOpenAdd });
  };
  toggleEdit = (val) => {
    this.setState({ isOpendEdit: !this.state.isOpendEdit });
    this.setState({ valProduct: val });
  };
  toggleEditModal = (val) => {
    this.setState({ isOpendEdit: !this.state.isOpendEdit });
  };

  render() {
    const { productList, addProductAction, editProductsAction } = this.props;
    const { valProduct } = this.state;
    // console.log(productList);
    return (
      <div>
        <h1 style={{ textAlign: "center", marginTop: 10, color: "#33272a" }}>
          Admin DasBoard
        </h1>
        <div>
          <div style={{ display: "flex", flexDirection: "row", margin: 30 }}>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle
                caret
                color="none"
                style={{ backgroundColor: "#ff8ba7" }}
              >
                Add Product ?
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>Category 1 = Shampo</DropdownItem>
                <DropdownItem header>Category 2 = Sabun</DropdownItem>
                <DropdownItem header>Category 3 = Parfume</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <AddModal
                    toggle={this.toggleAdd}
                    isOpen={this.state.isOpenAdd}
                    addData={addProductAction}
                  />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <InputGroup>
              <InputGroupAddon addonType="prepend" className={style.inputGroup}>
                <Button
                  onClick={this.onClickSearch}
                  style={{ backgroundColor: "#ff8ba7", border: "none" }}
                >
                  <FcSearch />
                </Button>
              </InputGroupAddon>
              <Input
                id="productName"
                placeholder="Search product..."
                type="text"
                onChange={this.onChangeSearch}
              />
            </InputGroup>
          </div>
          <div>
            <Table>
              <thead>
                <th>No</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Available</th>
                <th>Stock</th>
                <th>Category Name</th>
                <th>Image</th>
                <th>Edit</th>
              </thead>
              {productList
                ? productList.map((val) => {
                    return (
                      <tbody>
                        <tr>
                          <th scope="row">{val.id_product}</th>
                          <td>{val.productName}</td>
                          <td>{val.price}</td>
                          <td>{val.isAvailable}</td>
                          <td>{val.stock}</td>
                          <td>{val.categoryName}</td>
                          <td>
                            <img
                              src={`${api}${val.imagepath}`}
                              alt="nophoto"
                              className={style.imgcard}
                            ></img>
                          </td>
                          <td>
                            <Button
                              onClick={() => this.deleteSwal(val.id_product)}
                              color="none"
                              style={{ backgroundColor: "#ff8ba7" }}
                            >
                              Delete
                            </Button>
                            <Button
                              onClick={() => this.toggleEdit(val)}
                              color="none"
                              style={{ backgroundColor: "#ff8ba7" }}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                : null}
              <EditModal
                data={valProduct}
                toggle={this.toggleEditModal}
                isOpen={this.state.isOpendEdit}
                editData={editProductsAction}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = ({ product, user }) => {
  return {
    loading: product.loading,
    productList: product.productList,
    roleID: user.roleID,
  };
};

export default connect(mapStatetoProps, {
  fetchProductsAdmin,
  deleteProductsAction,
  filterByName,
  filterByPrice,
  addProductAction,
  nullifyErrorAction,
  editProductsAction,
})(AdminProduct);
