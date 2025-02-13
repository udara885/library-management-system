import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"

const GoBackBtn = () => {
	const navigate = useNavigate()

	return (
		<button
			className="border-gray-600 text-gray-200 border p-2 md:p-2 rounded-lg font-semibold cursor-pointer flex items-center justify-center gap-1 mt-5 ml-10"
			onClick={() => navigate(-1)}
		>
			<ArrowLeft /> Go Back
		</button>
	)
}

export default GoBackBtn
