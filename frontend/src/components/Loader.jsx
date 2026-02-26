function Loader({ text = 'Loading...' }) {
  return (
    <div className="page-shell flex flex-col items-center justify-center gap-4 rounded-3xl p-12 text-center">
      <span className="loading loading-ring loading-lg text-teal-600"></span>
      <p className="subtle-text text-sm">{text}</p>
    </div>
  )
}

export default Loader
