const modelPath = process.argv[2];
const prompt = process.argv[3] || "What is OpenVINO?";

if (!modelPath) {
	console.error("Usage: node Local/Noema/script.js <model-folder> [prompt]");
	process.exit(1);
}

(async () => {
	try {
		const { LLMPipeline } = await import("openvino-genai-node");
		const pipe = await LLMPipeline(modelPath, "CPU");
		const result = await pipe.generate(prompt, { max_new_tokens: 128 });
		console.log("\nModel output:\n");
		console.log(result);
	} catch (error) {
		console.error("Failed to run local model.");
		console.error(error?.message || error);
		process.exit(1);
	}
})();