export default function Login() {
  return (
    <a className="btn bg-blue text-slate-50" href={`/login?${new URLSearchParams({ redirect: '/' }).toString()}`}>
      Login
    </a>
  );
}
