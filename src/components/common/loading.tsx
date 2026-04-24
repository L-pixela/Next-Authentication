"use client";

import { Loader } from "rsuite";

export default function Loading() {
	return (
		<div
			className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40"
			style={{ backdropFilter: "blur(2px)" }}
		>
			<div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-3">
				<Loader size="md" />
				<span className="font-medium">Loading</span>
			</div>
		</div>
	);
}
