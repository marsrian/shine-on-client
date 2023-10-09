

const Footer = () => {
  return (
    <div className="bg-gray-400 p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between">
            <div>
                <h5 className="text-lg font-medium text-gray-800 mb-3">COMPANY</h5>
                <ul className="flex flex-col gap-2">
                    <li>About us</li>
                    <li>Careers</li>
                    <li>Affiliates</li>
                    <li>Blog</li>
                </ul>
            </div>
            <div>
                <h5 className="text-lg font-medium text-gray-800 mb-3">SHOP</h5>
                <ul className="flex flex-col gap-2">
                    <li>New Arrivals</li>
                    <li>Accessories</li>
                </ul>
            </div>
            <div>
                <h5 className="text-lg font-medium text-gray-800 mb-3">SUPPORT</h5>
                <ul className="flex flex-col gap-2">
                    <li>Contact Us</li>
                    <li>Returns</li>
                    <li>FAQ</li>
                    <li>Privacy</li>
                </ul>
            </div>
            <div>
                <h5 className="text-lg font-medium text-gray-800 mb-3">LEGAL</h5>
                <ul className="flex flex-col gap-2">
                    <li>Terms & Conditions</li>
                    <li>Privacy & Cookies</li>
                    <li>Legal Issues</li>
                    <li>Accessibility</li>
                </ul>
            </div>
        </div>
        <p className="text-center mt-6">Copyright All right reserves - Mars Rian</p>
    </div>
  )
}

export default Footer