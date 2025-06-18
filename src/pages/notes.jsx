import { BASE_URL } from "@/utils";

export default function NotesPage() {
	const handleAddNote = () => {
		const accessToken = localStorage.getItem("session");

		fetch(`${BASE_URL}/entries`, {
			method: "POST",
			body: JSON.stringify({}),
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
	};

	return <>Notes</>;
}
