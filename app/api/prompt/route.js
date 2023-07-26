import { connectToDatabase } from "@utils/db";
import Prompt from "@models/prompt";


export const GET = async (req) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate('Author');
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (e) {
        return new Response('failed to get prompts', {status: 500});
    }
}
