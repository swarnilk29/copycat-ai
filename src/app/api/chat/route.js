import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use a server-side environment variable
  baseURL: 'https://api.openai.com/v1', // Correct API base URL
});

// POST request handler
export async function POST(request) {
  try {
    const requestBody = await request.json();
    const prompt = requestBody.prompt;

    if (!prompt || prompt === '') {
      return new Response('Please send your prompt', { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a social media assistant that helps to create captions or content or script for people.",
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo',
    });

    const completionResponse = completion.choices[0].message.content;
    console.log("generation is successful");

    return new Response(JSON.stringify({ completionResponse }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("OpenAI API call failed:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// GET request handler
export async function GET(request) {
  try {
    const prompt = request.url.includes('?') ? new URL(request.url).searchParams.get('prompt') : null;

    if (!prompt || prompt === '') {
      return new Response('Please provide a prompt in the query parameter "prompt"', { status: 400 });
    }

    return new Response(JSON.stringify({ prompt }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("GET request failed:", error);
    return new Response('An error occurred', { status: 500 });
  }
}





// import OpenAI from "openai";

// // Initialize the OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Replace with your OpenAI API key
//   baseURL: 'https://api.openai.com/v1', // Replace with the appropriate API base URL
// });

// // POST request handler
// export async function POST(request) {
//   try {
//     // Parse the request body JSON
//     const requestBody = await request.json();
//     const prompt = requestBody.prompt;

//     if (!prompt || prompt === '') {
//       return new Response('Please send your prompt', { status: 400 });
//     }

//     // Create a chat completion using OpenAI
//     const completion = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: "You are a social media assistant that helps to create captions or content or script for people.",
//         },
//         { role: 'user', content: prompt }]
//         , // Use the provided prompt
//       model: 'gpt-3.5-turbo', // Use the desired OpenAI model
//     });

//     // Extract the response from OpenAI's completion
//     const completionResponse = completion.choices[0].message.content;
//     // console.log(completion)

//     console.log("generation is successful")

//     // Return the response as JSON
//     return new Response(JSON.stringify({ completionResponse }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response('An error occurred', { status: 500 });
//   }
// }

// // GET request handler
// export async function GET(request) {
//   try {
//     // Retrieve the prompt from the query parameter named "prompt"
//     const prompt = request.url.includes('?') ? new URL(request.url).searchParams.get('prompt') : null;

//     if (!prompt || prompt === '') {
//       return new Response('Please provide a prompt in the query parameter "prompt"', { status: 400 });
//     }

//     // Return the prompt as a JSON response
//     return new Response(JSON.stringify({ prompt }), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response('An error occurred', { status: 500 });
//   }
// }
