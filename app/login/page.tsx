import CompButton from "@/assets/button";

export default function Login() {
  return (
    <form
      action="/auth/login"
      method="post"
      className="border border-black rounded-lg p-4 max-w-xs mx-auto mt-10"
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
  );
}
