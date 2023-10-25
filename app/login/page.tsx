export default function Login({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  return (
    <div className="max-w-xs mx-auto mt-10">
      <form
        action="/auth/login"
        method="post"
        className="border border-black rounded-lg p-4"
      >
        <div className="">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            name="email"
            className="border rounded-md w-full px-1 py-px mb-4"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="border rounded-md w-full px-1 py-px mb-4"
            required
          />
        </div>
        <div className="flex justify-between">
          <button>Sign In</button>
          <button formAction="/auth/sign-up">Sign Up</button>
        </div>
      </form>
      {searchParams.error && (
        <div className="mt-2 bg-red-600 text-white rounded-full px-2 py-1">
          <p>Error: {searchParams.error}</p>
        </div>
      )}
    </div>
  );
}
