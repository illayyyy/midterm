const LoadingSpinner = ({ size = "medium" }) => {
    const sizeClass = size === "small" ? "w-5 h-5" : "w-10 h-10"
  
    return (
      <div className={`spinner ${sizeClass}`} aria-label="Loading">
        <div className="spinner-inner"></div>
      </div>
    )
  }
  
  export default LoadingSpinner
  