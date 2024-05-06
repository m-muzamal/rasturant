import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useFetch } from "../utils/useFetch";
import axios from "axios";

const Dashboard = () => {
  const fetch = useFetch("http://localhost:3001/api/v1/products/all-products");
  const [totalProd, setTotalProd] = useState();
  const [menu, setMenu] = useState();
  const [prod, setProd] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [input, setInput] = useState({
    name: "",
    newPrice: "",
    oldPrice: "",
    image: "",
  });

  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addProd = (category) => {
    (async () => {
      const formData = new FormData();
      // console.log("selectedImage", selectedImage);
      formData.append("name", input.name);
      formData.append("category", category);
      formData.append("oldPrice", input.oldPrice);
      formData.append("newPrice", input.newPrice);
      formData.append("image", selectedImage);

      try {
        const res = await axios.post(
          "http://localhost:3001/api/v1/products/add-product",
          formData
        );

        setTotalProd(totalProd + 1);
        alert("Product added successfully!");
        // console.log(res);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const menuItem = () => {
    if (
      input.name !== "" &&
      input.newPrice !== "" &&
      input.oldPrice !== "" &&
      input.img !== ""
    ) {
      addProd("menu");
    } else {
      alert("Please fill all the fields!");
    }
  };

  const prodItem = () => {
    if (
      input.name !== "" &&
      input.newPrice !== "" &&
      input.oldPrice !== "" &&
      input.img !== ""
    ) {
      addProd("prod");
    } else {
      alert("Please fill all the fields!");
    }
  };

  useEffect(() => {
    if (fetch) {
      setMenu(fetch?.data?.products.filter((item) => item.category === "menu"));
      setProd(fetch?.data?.products.filter((item) => item.category === "prod"));
    }
  }, [fetch, totalProd]);

  return (
    <section className="dashboard">
      <h1 className="loginForm-title">menu items</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>New Price</th>
            <th>Old Price</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {menu?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.newPrice}</td>
              <td>{item.oldPrice}</td>
              <td>{item.image.slice(0, 30)}...</td>
              <td
                className="del"
                // onClick={() => dispatch(removeFromMenu(item))}
              >
                <MdDelete />
              </td>
            </tr>
          ))}
          <tr>
            <td>.</td>
            <td>
              <TextField
                variant="standard"
                label="name"
                name="name"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "15px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    fontSize: "15px",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                }}
                required
              />
            </td>
            <td>
              <TextField
                variant="standard"
                label="newPrice"
                name="newPrice"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "15px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    fontSize: "15px",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                }}
                required
              />
            </td>
            <td>
              <TextField
                variant="standard"
                label="oldPrice"
                name="oldPrice"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "15px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    fontSize: "15px",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                }}
                required
              />
            </td>
            <td>
              {/* <input
                type="file"
                name="img"
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg"
              /> */}
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  // console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </td>
            <td>
              <button className="btn" onClick={menuItem}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <h1 className="loginForm-title">products items</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>New Price</th>
            <th>Old Price</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prod?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.newPrice}</td>
              <td>{item.oldPrice}</td>
              <td>{item.image.slice(0, 30)}...</td>
              <td
                className="del"
                // onClick={() => dispatch(removeFromProd(item))}
              >
                <MdDelete />
              </td>
            </tr>
          ))}
          <tr>
            <td>.</td>
            <td>
              <TextField
                variant="standard"
                label="name"
                name="name"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "15px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    fontSize: "15px",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                }}
                required
              />
            </td>
            <td>
              <TextField
                variant="standard"
                label="newPrice"
                name="newPrice"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "15px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    fontSize: "15px",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                }}
                required
              />
            </td>
            <td>
              <TextField
                variant="standard"
                label="oldPrice"
                name="oldPrice"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontSize: "15px",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    fontSize: "15px",
                    "&.Mui-focused": {
                      color: "white",
                    },
                  },
                }}
                required
              />
            </td>
            <td>
              {/* <input
                type="file"
                name="img"
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg"
              /> */}
              <input
                type="file"
                name="image"
                onChange={(event) => {
                  // console.log(event.target.files[0]);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </td>
            <td>
              <button className="btn" onClick={prodItem}>
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Dashboard;
