export default function () {
  return (
    <div className="bg-gray-400 min-h-screen min-w-full flex items-center justify-center">
      <div className="bg-white m-auto rounded-2xl p-8 flex flex-col gap-4">
        <h1 className="h1">Login</h1>
        <form className="flex flex-col gap-2">
          <input placeholder="Email" className="input w-full max-w-xs" />
          <input placeholder="Password" className="input w-full max-w-xs" />
          <button className="btn btn-primary">Masuk</button>
        </form>
      </div>
    </div>
  );
}
