import { connectToDatabase } from "@utils/db";
import Prompt from "@models/prompt";


export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({ Author: params.id }).populate('Author');
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (e) {
        return new Response('failed to get prompts', {status: 500});
    }
}
