import OpenAI from "openai";

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env["AI71_API_KEY"],
  baseURL: process.env["AI71_BASE_URL"],
});

// Define enhanced examples for formal and casual Arabic translations
const examples = {
  formal: {
    arabic: [
		{ "word": "ما" },
		{ "word": "اسمك", "reading": "إسمك" },
		{ "word": "؟" }
	  ],
	  
    grammarBreakdown: [
		{
		  "english": "What is your name?",
		  "arabic": [
			{ "word": "ما" },
			{ "word": "اسمك", "reading": "إسمك" },
			{ "word": "؟" }
		  ],
		  "chunks": [
			{
			  "arabic": [{ "word": "ما" }],
			  "meaning": "What",
			  "grammar": "Interrogative word used to ask for information."
			},
			{
			  "arabic": [{ "word": "اسمك", "reading": "إسمك" }],
			  "meaning": "your name",
			  "grammar": "Noun phrase, with 'اسم' meaning name and 'ك' indicating second person singular possessive."
			},
			{
			  "arabic": [{ "word": "؟" }],
			  "meaning": "question mark",
			  "grammar": "Punctuation indicating a question."
			}
		  ]
		}
	  ],
	  
  },
  casual: {
    arabic: [
		{ "word": "شو" },
		{ "word": "اسمك", "reading": "إسمك" },
		{ "word": "؟" }
	  ],
	  
    grammarBreakdown: [
		{
		  "english": "What's your name?",
		  "arabic": [
			{ "word": "شو" },
			{ "word": "اسمك", "reading": "إسمك" },
			{ "word": "؟" }
		  ],
		  "chunks": [
			{
			  "arabic": [{ "word": "شو" }],
			  "meaning": "What",
			  "grammar": "Colloquial interrogative word used to ask for information."
			},
			{
			  "arabic": [{ "word": "اسمك", "reading": "إسمك" }],
			  "meaning": "your name",
			  "grammar": "Noun phrase, with 'اسم' meaning name and 'ك' indicating second person singular possessive."
			},
			{
			  "arabic": [{ "word": "؟" }],
			  "meaning": "question mark",
			  "grammar": "Punctuation indicating a question."
			}
		  ]
		}
	  ],
	  
  },
  additionalExamples: {
    formal: {
      arabic: [
        { word: "كيف" },
        { word: "حالك", reading: "حالك" },
        { word: "؟" },
      ],
      grammarBreakdown: [
        {
          english: "How are you?",
          arabic: [
            { word: "كيف" },
            { word: "حالك", reading: "حالك" },
            { word: "؟" },
          ],
          chunks: [
            {
              arabic: [{ word: "كيف" }],
              meaning: "How",
              grammar: "Interrogative word used to ask about state or condition.",
            },
            {
              arabic: [{ word: "حالك", reading: "حالك" }],
              meaning: "your condition",
              grammar: "Noun phrase, with 'حال' meaning condition and 'ك' indicating second person singular possessive.",
            },
            {
              arabic: [{ word: "؟" }],
              meaning: "question mark",
              grammar: "Punctuation indicating a question.",
            },
          ],
        },
      ],
    },
    casual: {
      arabic: [
        { word: "كيفك", reading: "كيفك" },
        { word: "؟" },
      ],
      grammarBreakdown: [
        {
          english: "How are you?",
          arabic: [
            { word: "كيفك", reading: "كيفك" },
            { word: "؟" },
          ],
          chunks: [
            {
              arabic: [{ word: "كيفك", reading: "كيفك" }],
              meaning: "How are you?",
              grammar: "Colloquial expression combining 'كيف' (how) and 'ك' (you, informal).",
            },
            {
              arabic: [{ word: "؟" }],
              meaning: "question mark",
              grammar: "Punctuation indicating a question.",
            },
          ],
        },
      ],
    },
  },
};

// Function to handle GET requests and generate language teaching response
export async function GET(req) {
  try {
    const speech = req.nextUrl.searchParams.get("speech") || "formal";
    const question = req.nextUrl.searchParams.get("question") || "How are you doing?";
    const speechExample = examples[speech] || examples.formal;

    // Construct the request payload for OpenAI API
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a Native Emirati Arabic language teacher with expertise in both formal and casual speech. 
          Your task is to help a student translate a sentence from English to Emarati Arabic Dialect.
          Provide the following information in a structured JSON format:
       
          - english: the English sentence e.g., "How are you doing?"
          - arabic: The Arabic translation, broken down word by word with al harakat and write the arabic sentence from right to left. For each word, include the correct Arabic spelling and,
            if applicable, a phonetic reading. e.g., ${JSON.stringify(speechExample.arabic)}
          - grammarBreakdown: A detailed explanation of the grammar structure used in the translation. e.g., e.g., ${JSON.stringify(speechExample.grammarBreakdown)}
            - Include the meaning of each word and how it contributes to the sentence.
            - Highlight any cultural nuances, idiomatic expressions, or dialect-specific variations.
            - Provide a brief explanation of the sentence structure, including verb conjugations, noun phrases, and punctuation.
          Ensure that your response is accurate, culturally appropriate, and considers the context of the sentence. 
          The JSON format should be clean, well-structured, and easy to parse.
          `,
        },
        {
          role: "system",
          content: `You always respond with a JSON object with the following format: 
          {
            "english": "",
            "arabic": [{
              "word": "",
              "reading": ""
            }],
            "grammarBreakdown": [{
              "english": "",
              "arabic": [{
                "word": "",
                "reading": ""
              }],
              "chunks": [{
                "arabic": [{
                  "word": "",
                  "reading": ""
                }],
                "meaning": "",
                "grammar": ""
              }]
            }]
          }`,
        },
        {
          role: "user",
          content: `How to say "${question}" in Arabic in ${speech} speech?`,
        },
      ],
      model: "tiiuae/falcon-180B-chat",
      response_format: "json",
    });

    // Parse and return the response
    const responseContent = JSON.parse(chatCompletion.choices[0].message.content);
	console.log("Response:", responseContent);
    return new Response(JSON.stringify(responseContent), { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "An error occurred while processing the request." }), { status: 500 });
  }
}
