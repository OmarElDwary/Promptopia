import { connectToDatabase } from "@utils/db";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDatabase();
        const newPrompt = new Prompt({
            Author: userId,
            prompt,
            tag,
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 200});

    } catch (e) {
        return new Response('failed to create a prompt', {status: 500});
    }
}