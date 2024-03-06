import 'react-quill/dist/quill.snow.css'
import ReactQuill from "react-quill";
import {useState} from "react";

TextEditToolbar.modules = {
    toolbar: [
        [{header: [false,1,2,3]}, {font: []}],
        [{size: []}, {align: []}, {color: []}],
        ["bold","italic","underline","strike","blockquote","code-block"],
        [{list: 'ordered'},{list: 'bullet'}],
        ['link','image','video'],
    ]
}

export function TextEditToolbar() {
    const [text, setText] = useState("")

    const handleChange = (content) => {
        setText(content);
    };

    return (
        <ReactQuill value={text} onChange={handleChange} modules={TextEditToolbar.modules}/>
    )
}