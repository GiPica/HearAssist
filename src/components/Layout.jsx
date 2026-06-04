export default function Layout({ children }) {
  return (
    <div className="w-full max-w-[390px] min-h-screen mx-auto overflow-hidden relative flex flex-col">
      {children}
    </div>
  )
}
