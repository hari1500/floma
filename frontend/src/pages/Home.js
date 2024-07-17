import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { createDoc, getDocs } from "../store/DocumentSlice";

// TODO: Use loading to display circualar progress bar and error to error handling
export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { documents } = useSelector((state) => state.document);

    const [loggedOut, setLoggedOut] = useState(!localStorage.getItem("user"));
    const handleLogout = () => {
        localStorage.removeItem("user");
        setLoggedOut(true);
    };

    const handleNewDoc = (e) => {
        e.preventDefault();

        dispatch(createDoc()).then((res) => {
            if (res.payload) {
                navigate(`/doc/${res.payload._id}`);
            }
        });
    };

    useEffect(() => {
        if (!loggedOut) {
            dispatch(getDocs());
        }
    }, [dispatch, loggedOut]);

    if (loggedOut) {
        return (
            <Container className="d-flex gap-2 align-items-center justify-content-center" >
                <Link to="/login" className="btn btn-primary btn-md">LOGIN</Link>
                <Link to="/register" className="btn btn-primary btn-md">SIGN UP</Link>
            </Container>
        );
    }

    return (
        <Container style={{ minHeight: "100vh", maxWidth: "60vw" }}>
            <Container className="d-flex gap-2 justify-content-between" style={{ marginTop: "24px", marginBottom: "24px" }} >
                <button type="submit" className="btn btn-primary btn-md" onClick={handleNewDoc}> New Document </button>
                <button type="submit" className="btn btn-primary btn-md" onClick={handleLogout}> Log out </button>
            </Container>
            {
                documents && documents.map((doc) => {
                    return (
                        <Card key={doc._id} style={{ marginBottom: "24px" }} onClick={() => navigate(`/doc/${doc._id}`)}>
                            <Card.Body>
                                <Container className="d-flex gap-2 align-items-center justify-content-between" style={{ padding: "4px"}} >
                                    <p style={{ margin: "0", cursor: "default" }}>{doc.title}</p>
                                    <p style={{ margin: "0", cursor: "default" }}>{doc.owner}</p>
                                </Container>
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </Container>
    );
};
