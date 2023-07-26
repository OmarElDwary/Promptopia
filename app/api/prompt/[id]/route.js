import { connectToDatabase } from "@utils/db";
import Prompt from "@models/prompt";


// read

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();
        const prompt = await Prompt.findById(params.id).populate('Author');

        if (!prompt) {
            return new Response('prompt not found', {status: 404});
        }

        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (e) {
        return new Response('failed to get prompts', {status: 500});
    }
}

// update

export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    
    try {
        await connectToDatabase();
        const existingPrompt = await Prompt.findById(params.id)

        if (!existingPrompt) {
            return new Response('prompt not found', {status: 404});
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});
    }
    catch (e) {
        return new Response('failed to update prompt', {status: 500});
    }
}

// delete

export const DELETE = async (req, { params }) => {
    try {
        await connectToDatabase();
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted succesfully", {status: 200});
    }
    catch (e) {
        return new Response('failed to delete prompt', {status: 500});
    }
}