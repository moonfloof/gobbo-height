import crypto from 'node:crypto';

const main = async () => {
	const [_, __, ...usernames] = process.argv;

	for (const username of usernames) {
		// Convert string into uint8array
		const data = new TextEncoder().encode(username);

		// Hash input
		const hashBuffer = await crypto.subtle.digest("SHA-256", data);

		// Convert into regular array
		const hashArray = Array.from(new Uint8Array(hashBuffer));

		// Convert back into string
		const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

		console.log(`${username}: ${hashHex}`);
	}
}

main();
