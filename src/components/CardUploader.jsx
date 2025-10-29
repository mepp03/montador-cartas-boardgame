import { useState } from "react";

export default function CardUploader({ onUpload }) {
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);

  const handleUpload = () => {
    if (front && back) {
      onUpload({ front, back });
      setFront(null);
      setBack(null);
    }
  };

  return (
    <div className="flex gap-4 mb-4">
      <input type="file" accept="image/*" onChange={e => setFront(URL.createObjectURL(e.target.files[0]))} />
      <input type="file" accept="image/*" onChange={e => setBack(URL.createObjectURL(e.target.files[0]))} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-2 py-1 rounded">Adicionar</button>
    </div>
  );
}
