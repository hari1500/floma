import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userLogin } from "../store/UserSlice";

// TODO: Add extra conditions like char limit and others
// TODO: On loading add circular progress bar
export const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const userCreds = { username, password };

        dispatch(userLogin(userCreds)).then((res) => {
            if (res.payload) {
                setUsername("");
                setPassword("");

                navigate("/");
            }
        });
    }

    return (
        <form className="form-group custom-form" onSubmit={handleLogin}>
            <label>Username</label>
            <input type="text" required className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
            <br />

            <label>Password</label>
            <input type="password" required className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            <br />

            <button type="submit" className="btn btn-primary btn-md w-100">
                {loading ? "Loading..." : "Login"}
            </button>

            {
                error && (
                    <div className="alert alert-danger" role="alert">{error}</div>
                )
            }
        </form>
    );
};
