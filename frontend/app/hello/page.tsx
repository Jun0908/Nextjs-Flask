// app/hello/page.tsx
export default async function HelloPage() {
    // Fetch data from the Flask server
    const res = await fetch("http://127.0.0.1:5000/", {
      // 'no-store' ensures data is refetched on each request in dev
      // You can adjust for production needs (e.g., caching, revalidation)
      cache: "no-store",
    });
  
    // Read the text response (e.g., "Hello, World!")
    const message = await res.text();
  
    return (
      <main style={{ padding: "1rem" }}>
        <h1>Message from Flask</h1>
        <p>{message}</p>
      </main>
    );
  }
  