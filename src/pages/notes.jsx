import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/utils";
import toast from "react-hot-toast";

export default function NotesPage() {
	let toastId = null;
	let intervalId = null;

	const checkPayment = (id) => {
		fetch(`${BASE_URL}/payments/check/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				// this stops shot polling

				clearInterval(intervalId);

				if (data.data.ResultCode == "0") {
					toast.success("Payment successfull", { id: toastId });
				} else {
					toast.error("Payment not successfull", { id: toastId });
				}
			});
	};

	const handleInitiatePayment = () => {
		const accessToken = localStorage.getItem("session");

		toastId = toast.loading("Initiating stk push");

		fetch(`${BASE_URL}/payments`, {
			method: "POST",
			body: JSON.stringify({
				phone: "",
			}),
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				toast.loading("Confirming payment", { id: toastId });
				// initiate shot polling
				// The interval should only run for at most 2 mins
				intervalId = setInterval(
					() => checkPayment(data.data.CheckoutRequestID),
					10_000
				);
			});
	};

	return (
		<div>
			<Input />

			<Button onClick={() => handleInitiatePayment()}>Pay</Button>
		</div>
	);
}
