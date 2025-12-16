import { useMemo, useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiUrl = "http://127.0.0.1:8000/predict";

  useMemo(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handlePredict() {
    if (!file) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Backend error ${res.status}: ${txt}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", fontFamily: "system-ui" }}>
      <h2 style={{ marginBottom: 6 }}>Cat vs Dog AI</h2>
      <div style={{ color: "#666", marginBottom: 18 }}>
        Upload an image and the model will predict cat vs dog.
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <div style={{ marginTop: 12 }}>
            <button
              onClick={handlePredict}
              disabled={!file || loading}
              style={{ padding: "10px 14px", cursor: !file || loading ? "not-allowed" : "pointer" }}
            >
              {loading ? "Predicting..." : "Predict"}
            </button>
          </div>

          {error && (
            <div style={{ marginTop: 14, padding: 12, border: "1px solid #f5c2c7", background: "#f8d7da" }}>
              <b>Error:</b> {error}
            </div>
          )}

          {result && (
            <div style={{ marginTop: 14, padding: 12, border: "1px solid #ddd" }}>
              <div><b>Label:</b> {result.label}</div>
              <div><b>Dog probability:</b> {Number(result.dog_probability).toFixed(4)}</div>
            </div>
          )}
        </div>

        <div style={{ width: 320 }}>
          <div style={{ marginBottom: 8, fontWeight: 600 }}>Preview</div>
          <div style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden", height: 320 }}>
            {previewUrl ? (
              <img src={previewUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ padding: 16, color: "#777" }}>Choose an image to preview</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
