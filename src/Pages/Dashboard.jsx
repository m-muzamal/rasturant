import { TextField } from "@mui/material";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addToMenu,
  addToProd,
  removeFromMenu,
  removeFromProd,
} from "../Redux/resturantSlice/resturantSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { menu, products } = useSelector((state) => state.resturant);
  const [input, setInput] = useState({
    name: "",
    newPrice: "",
    oldPrice: "",
    img: "",
  });

  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const addMenu = () => {
    if (
      input.name !== "" &&
      input.newPrice !== "" &&
      input.oldPrice !== "" &&
      input.img !== ""
    ) {
      dispatch(addToMenu(input));
    } else {
      alert("Please fill all the fields!");
    }
  };

  const addProd = () => {
    if (
      input.name !== "" &&
      input.newPrice !== "" &&
      input.oldPrice !== "" &&
      input.img !== ""
    ) {
      dispatch(addToProd(input));
    } else {
      alert("Please fill all the fields!");
    }
  };

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
              <td>{item.img}</td>
              <td
                className="del"
                onClick={() => dispatch(removeFromMenu(item))}
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
              <input
                type="file"
                name="img"
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg"
              />
            </td>
            <td>
              <button className="btn" onClick={addMenu}>
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
          {products?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.newPrice}</td>
              <td>{item.oldPrice}</td>
              <td>{item.img}</td>
              <td
                className="del"
                onClick={() => dispatch(removeFromProd(item))}
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
              <input
                type="file"
                name="img"
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg"
              />
            </td>
            <td>
              <button className="btn" onClick={addProd}>
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
