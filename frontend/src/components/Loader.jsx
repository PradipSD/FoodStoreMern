function Loader({ text = 'Loading...' }) {
  return (
    <div className="page-shell flex flex-col items-center justify-center gap-4 rounded-2xl p-12 text-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="subtle-text text-sm">{text}</p>
    </div>
  )
}

export default Loader
