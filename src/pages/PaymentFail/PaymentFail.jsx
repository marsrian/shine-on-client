

const PaymentFail = () => {
  return (
	<div className="mt-20">
      <div className=" border-2 border-red-600 rounded-full p-4 mb-1">
        <p className="text-center text-5xl font-bold text-red-700">❌</p>
      </div>
      <h1 className="text-green-600 text-center text-lg mb-2">
        Payment Failed
      </h1>
      <p className="text-center">Try Again</p>
    </div>
  )
}

export default PaymentFail