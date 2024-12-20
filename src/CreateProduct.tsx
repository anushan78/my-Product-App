import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IFormInput } from "./types/interfaces";

function CreateProduct() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<IFormInput>({
    criteriaMode: "all",
    defaultValues: {
      productName: "sample",
    },
  });
  const [productList, setProductList] = useState<IFormInput[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      //throw new Error();
      setProductList((previousProduct) => [...previousProduct, data]);
    } catch (error) {
      setError("root", { message: "Error in Saving" });
    }
  };

  return (
    <div>
      <h1>Create a Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Product Name:</label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              {...register("productName", {
                required: "Product Name is required",
                maxLength: {
                  value: 10,
                  message: "Product Name should not be more than 10 characters",
                },
              })}
            />
          </div>
          <div className="col-sm-4">
            {isSubmitted && errors.productName && (
              <p className="text-danger">{errors.productName.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row mt-2">
          <label className="col-sm-2 col-form-label">Category:</label>
          <div className="col-sm-4">
            <select className="form-select" {...register("category")}>
              <option value="book">Book</option>
              <option value="pen">Pen</option>
              <option value="pencil">Pencil</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
        </div>
        <div className="form-group row mt-2">
          <label className="col-sm-2 col-form-label">Quantity:</label>
          <div className="col-sm-4">
            <input
              type="number"
              className="form-control"
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity should be more than 0" },
                max: {
                  value: 100,
                  message: "Quantity should be less than 100",
                },
              })}
            />
          </div>
          <div className="col-sm-4">
            {isSubmitted && errors.quantity && (
              <p className="text-danger">{errors.quantity.message}</p>
            )}
          </div>
        </div>
        <div className="form-group row mt-3">
          <div className="col-sm-2"></div>
          <div className="col-sm-4">
            <button type="submit" className="btn btn-primary">
              {isSubmitting ? "...Saving" : "Save"}
            </button>
          </div>
          <div className="col-sm-4">
            {isSubmitted && errors.root && (
              <p className="text-danger">{errors.root.message}</p>
            )}
          </div>
        </div>
      </form>

      <div className="mt-3">
        {productList.length === 0 ? (
          <p>No product(s) available</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product, index) => (
                <tr key={index}>
                  <td>{product.productName}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CreateProduct;
