export function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Sahan Global Health File Access</h1>
      <p className="mb-4">Your health records, accessible anytime, anywhere.</p>
      <a href="/register" className="text-blue-600 underline">Register now</a> or <a href="/login" className="text-blue-600 underline">Login</a>
    </div>
  );
}