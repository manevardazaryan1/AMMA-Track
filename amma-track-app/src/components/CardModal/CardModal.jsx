import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addDescription } from '../../redux/slices/cardModalSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './CardModal.css'
export default function CardModal({ cardID }) {
    const dispatch = useDispatch();
    const descriptions = useSelector((state) => state.cardModal.descriptions);
    const description = descriptions.find(card => card.cardID === cardID)
    const [text, setText] = useState("");

    const handleChange = (value) => {
        setText(() => value);
    };

    const handleSave = () => {
        dispatch(addDescription({ cardID, description: text }))
        setText(() => "");
    };

    const edit = () => {
        setText(() => description.description);
    }

    const clearText = () => {
        setText(() => "");
    }

    return (
        <div className="card-modal-block">
            <div className="card-modal scroll_effect"> 
            <h3>AMMA-Track</h3>
                <div className="description-block">
                    <h3 className="description-title"> <sup className="description-quote"><i className="fa-solid fa-quote-left"></i></sup> Card description </h3>
                    <div className="description">
                        <div className="description-text">
                            { 
                                description &&
                                <div dangerouslySetInnerHTML={{ __html: description.description }} />
                            }

                            {
                                !description && <div> Add description </div>
                            }
                        </div>
                        <button onClick={edit} className="edit-btn" disabled={!description}><i className="fa-solid fa-pen"></i></button>
                    </div>
                    <ReactQuill
                        value={text}
                        onChange={handleChange}
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'header': 1 }, { 'header': 2 }],
                                [{ 'script': 'sub' }, { 'script': 'super' }],
                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                [{ 'color': [] }, { 'background': [] }],
                                ['clean'],
                            ],
                        }}
                        formats={[
                            'bold', 'italic', 'underline', 'strike',
                            'header', 'script', 'size',
                            'color', 'background',
                        ]}
                    />
                    <button onClick={handleSave} className="save-description-btn" disabled={!text}><i className="fa-solid fa-floppy-disk"></i></button>
                    <button onClick={clearText} className="save-description-btn" disabled={!text}><i className="fa-solid fa-ban"></i></button>
                </div>
            </div>
        </div>
    )
}