
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/curate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1>Instagram Curator</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Paste Instagram URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <button type="submit" disabled={!url || loading} style={styles.button}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {response && (
        <pre style={styles.response}>{JSON.stringify(response, null, 2)}</pre>
      )}
    </main>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  form: {
    marginTop: '1rem',
  },
  input: {
    padding: '0.5rem',
    width: '70%',
    marginRight: '1rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
  },
  response: {
    marginTop: '2rem',
    textAlign: 'left',
    background: '#f0f0f0',
    padding: '1rem',
    borderRadius: '4px',
  },
};
