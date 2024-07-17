import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import 'draft-js/dist/Draft.css';

import RichEditor from "../components/RichEditor";

import { getDoc, updateDoc } from "../store/DocumentSlice";
import { getCollaborators } from "../store/CollaboratorsSlice";
import useWebSocket, { ReadyState } from "react-use-websocket";
import config from "../config";


// TODO: On loading add circular progress bar
// TODO: Add option to edit title
// TODO: Auto save/Save button
// TODO: cursor management
// TODO: CRDTs for data management
export const Document = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { docId } = useParams();
    const { currDocument: doc, error } = useSelector((state) => state.document);
    const { collaborators } = useSelector((state) => state.collaborators);
    const [selectedValue, setSelectedValue] = useState('');
    const [editorContent, setEditorContent] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));
    const username = user?.username;
    const loggedOut = !username;
    const mode = getMode(username, doc);

    const { sendJsonMessage, readyState } = useWebSocket(config.wsUrl, {
        onOpen: () => {
            console.log("Websocket connection established");
        },
        onMessage: (r) => {
            if (!r?.data) {
                return;
            }
            
            const { data, error } = JSON.parse(r.data);
            if (error) {
                console.error("Websocket conn received error", error);
                return;
            }
            console.log("Websocket conn received msg", data);
            setEditorContent(data);
        },
        onClose: () => {
            console.log("Websocket connection closed");
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true,
    });

    const handleOnEditorContentChange = (content) => {
        sendJsonMessage({ type: "UPDATE", content });
    };

    const handleAddCollaborator = (mode) => {
        if (selectedValue === "") {
            return
        }

        // TODO: Add checks on mode or change them to enums
        let updatedDoc = JSON.parse(JSON.stringify(doc));
        if (!updatedDoc?.collaborators) {
            updatedDoc.collaborators = {};
        }
        updatedDoc.collaborators[selectedValue] = mode;
        console.log(`Adding ${selectedValue} as ${mode}`);
        dispatch(updateDoc(updatedDoc));
    };

    useEffect(() => {
        if (loggedOut) {
            navigate("/");
            return;
        }

        dispatch(getDoc(docId));
        dispatch(getCollaborators());

        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({ type: "INIT", username, docId});
        }
    }, [
        dispatch, navigate, loggedOut, docId,
        sendJsonMessage, readyState, username,
    ]);

    if (loggedOut) {
        return (<>Please login</>);
    }
    if (!doc) {
        return (<></>);
    }

    return (
        <Container className="d-flex flex-column" style={{ minHeight: "100vh", maxWidth: "60vw" }}>
            <Container className="d-flex flex-column gap-2 justify-content-between" style={{ marginTop: "24px", marginBottom: "24px" }} >
                <h2 style={{ margin: "0", textAlign: "center" }}>{doc.title}</h2>
                <p style={{ margin: "0", textAlign: "right" }}>--  <b>{doc.owner}</b></p>
            </Container>
            <RichEditor content={editorContent} mode={mode} onContentChange={handleOnEditorContentChange} />
            {
                (doc?.owner === username) && collaborators && (
                    <Container className="d-flex gap-2 justify-content-between" style={{ padding: "24px" }} >
                        <Form.Select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
                            <option disabled selected value={""}>Choose collaborators</option>
                            {collaborators.map((user) => (
                                <option key={user._id} value={user.username}>{user.username}</option>
                            ))}
                        </Form.Select>
                        <button className="btn btn-primary btn-md" onClick={() => handleAddCollaborator("EDIT")}> Add as Editor </button>
                        <button className="btn btn-primary btn-md" onClick={() => handleAddCollaborator("VIEW")}> Add as Viewer </button>
                    </Container>
                )
            }
            {
                error && (
                    <div className="alert alert-danger" role="alert">{error}</div>
                )
            }
        </Container>
    );
};

const getMode = (username, document) => {
    if (document?.owner === username) {
        return "EDIT";
    }

    if (document?.collaborators) {
        return document.collaborators[username];
    }

    return "";
}
