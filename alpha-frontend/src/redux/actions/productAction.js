import Axios from "axios";
import { api } from "../../helpers";
import {
  API_PRODUCT_START,
  API_PRODUCT_SUCCESS,
  API_PRODUCT_FAILED,
  PRODUCT_BY_ID_SUCCESS,
  API_PRODUCT_FILL,
  FILTER_BY_PRICE,
  NULLIFY_ERROR,
} from "../types";
import Swal from "sweetalert2";

const url = api + "/products";

export const fetchProduct = () => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const response = await Axios.get(url);
      dispatch({ type: API_PRODUCT_SUCCESS, payload: response.data });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};

export const fetchProductsAction = () => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const res = await Axios.get(url);
      dispatch({
        type: API_PRODUCT_FILL,
        payload: res.data,
      });
      dispatch({
        type: API_PRODUCT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};
export const fetchProductsAdmin = () => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const res = await Axios.get(`${url}/admin/product`);
      dispatch({
        type: API_PRODUCT_FILL,
        payload: res.data,
      });
      dispatch({
        type: API_PRODUCT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};

export const filterByPrice = (query) => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const response = await Axios({
        method: "get",
        url: `${url}?priceMax=${query.priceMax}&priceMin=${query.priceMin}`,
      });
      dispatch({
        type: FILTER_BY_PRICE,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};

export const filterByName = (query) => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const response = await Axios({
        method: "get",
        url: `${url}?productName=${query.productName}`,
      });
      dispatch({
        type: FILTER_BY_PRICE,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};

export const addProductAction = (data) => {
  return async (dispatch) => {
    const { productName, description, stock, image, price, categoryID } = data;
    let formData = new FormData();
    console.log(image);
    const value = JSON.stringify({
      productName,
      description,
      stock,
      price,
      categoryID,
    });
    formData.append("image", image.imageFile);
    formData.append("data", value);
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await Axios.post(`${url}/admin/products`, formData,headers);
      dispatch(fetchProductsAdmin());
      dispatch({
        type: API_PRODUCT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};
export const deleteProductsAction = (id) => {
  return (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    Axios.delete(`${url}/${id}`)
      .then((res) => {
        dispatch(fetchProductsAdmin());
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch({
          type: API_PRODUCT_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: API_PRODUCT_FAILED,
          payload: err.message,
        });
      });
  };
};

export const editProductsAction = (data) => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });

    const { id_product, productName, price, description, stock, image,categoryName } = data;

    // const value = JSON.stringify({ productName, description, stock, price,categoryName });
    // let formData = new FormData();
    // formData.append("image", image.imageFile);
    // formData.append("data", value);
    try {
      const value = JSON.stringify({ productName, description, stock, price,categoryName });
    let formData = new FormData();
    formData.append("image", image.imageFile);
    formData.append("data", value);
      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await Axios.patch(`${url}/${id_product}`, formData, headers);
      dispatch(fetchProductsAdmin());
      dispatch({
        type: API_PRODUCT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};
export const nullifyErrorAction = () => {
  return {
    type: NULLIFY_ERROR,
  };
};

export const productById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: API_PRODUCT_START,
    });
    try {
      const response = await Axios.get(`${url}/${id}`);
      dispatch({
        type: PRODUCT_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: API_PRODUCT_FAILED,
        payload: err.message,
      });
    }
  };
};

export const changeIsCheckedAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: API_PRODUCT_START,
      });
      await Axios.patch(`${url}/change-ischecked/${id}`);
      console.log("eaea");
      dispatch({
        type: API_PRODUCT_SUCCESS,
      });
    } catch (err) {
      dispatch({ type: API_PRODUCT_FAILED, payload: err.message });
    }
  };
};
