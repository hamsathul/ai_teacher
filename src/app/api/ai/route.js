// import OpenAI from "openai";

// const openai = new OpenAI({
//   apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
// });

// const formalExample = {
//   japanese: [
//     { word: "日本", reading: "にほん" },
//     { word: "に" },
//     { word: "住んで", reading: "すんで" },
//     { word: "います" },
//     { word: "か" },
//     { word: "?" },
//   ],
//   grammarBreakdown: [
//     {
//       english: "Do you live in Japan?",
//       japanese: [
//         { word: "日本", reading: "にほん" },
//         { word: "に" },
//         { word: "住んで", reading: "すんで" },
//         { word: "います" },
//         { word: "か" },
//         { word: "?" },
//       ],
//       chunks: [
//         {
//           japanese: [{ word: "日本", reading: "にほん" }],
//           meaning: "Japan",
//           grammar: "Noun",
//         },
//         {
//           japanese: [{ word: "に" }],
//           meaning: "in",
//           grammar: "Particle",
//         },
//         {
//           japanese: [{ word: "住んで", reading: "すんで" }, { word: "います" }],
//           meaning: "live",
//           grammar: "Verb + て form + います",
//         },
//         {
//           japanese: [{ word: "か" }],
//           meaning: "question",
//           grammar: "Particle",
//         },
//         {
//           japanese: [{ word: "?" }],
//           meaning: "question",
//           grammar: "Punctuation",
//         },
//       ],
//     },
//   ],
// };

// const casualExample = {
//   japanese: [
//     { word: "日本", reading: "にほん" },
//     { word: "に" },
//     { word: "住んで", reading: "すんで" },
//     { word: "いる" },
//     { word: "の" },
//     { word: "?" },
//   ],
//   grammarBreakdown: [
//     {
//       english: "Do you live in Japan?",
//       japanese: [
//         { word: "日本", reading: "にほん" },
//         { word: "に" },
//         { word: "住んで", reading: "すんで" },
//         { word: "いる" },
//         { word: "の" },
//         { word: "?" },
//       ],
//       chunks: [
//         {
//           japanese: [{ word: "日本", reading: "にほん" }],
//           meaning: "Japan",
//           grammar: "Noun",
//         },
//         {
//           japanese: [{ word: "に" }],
//           meaning: "in",
//           grammar: "Particle",
//         },
//         {
//           japanese: [{ word: "住んで", reading: "すんで" }, { word: "いる" }],
//           meaning: "live",
//           grammar: "Verb + て form + いる",
//         },
//         {
//           japanese: [{ word: "の" }],
//           meaning: "question",
//           grammar: "Particle",
//         },
//         {
//           japanese: [{ word: "?" }],
//           meaning: "question",
//           grammar: "Punctuation",
//         },
//       ],
//     },
//   ],
// };

// export async function GET(req) {
//   // WARNING: Do not expose your keys
//   // WARNING: If you host publicly your project, add an authentication layer to limit the consumption of ChatGPT resources

//   const speech = req.nextUrl.searchParams.get("speech") || "formal";
//   const speechExample = speech === "formal" ? formalExample : casualExample;

//   const chatCompletion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `You are a Japanese language teacher. 
// Your student asks you how to say something from english to japanese.
// You should respond with: 
// - english: the english version ex: "Do you live in Japan?"
// - japanese: the japanese translation in split into words ex: ${JSON.stringify(
//           speechExample.japanese
//         )}
// - grammarBreakdown: an explanation of the grammar structure per sentence ex: ${JSON.stringify(
//           speechExample.grammarBreakdown
//         )}
// `,
//       },
//       {
//         role: "system",
//         content: `You always respond with a JSON object with the following format: 
//         {
//           "english": "",
//           "japanese": [{
//             "word": "",
//             "reading": ""
//           }],
//           "grammarBreakdown": [{
//             "english": "",
//             "japanese": [{
//               "word": "",
//               "reading": ""
//             }],
//             "chunks": [{
//               "japanese": [{
//                 "word": "",
//                 "reading": ""
//               }],
//               "meaning": "",
//               "grammar": ""
//             }]
//           }]
//         }`,
//       },
//       {
//         role: "user",
//         content: `How to say ${
//           req.nextUrl.searchParams.get("question") ||
//           "Have you ever been to Japan?"
//         } in Japanese in ${speech} speech?`,
//       },
//     ],
//     // model: "gpt-4-turbo-preview", // https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
//     model: "gpt-3.5-turbo", // https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4
//     response_format: {
//       type: "json_object",
//     },
//   });
//   console.log(chatCompletion.choices[0].message.content);
//   return Response.json(JSON.parse(chatCompletion.choices[0].message.content));
// }



import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["AI71_API_KEY"],
  baseURL: process.env["AI71_BASE_URL"]
});

const formalExample = {
  arabic: [
    { word: "هل" },
    { word: "تعيش" },
    { word: "في" },
    { word: "اليابان", reading: "اليابان" },
    { word: "؟" },
  ],
  grammarBreakdown: [
    {
      english: "Do you live in Japan?",
      arabic: [
        { word: "هل" },
        { word: "تعيش" },
        { word: "في" },
        { word: "اليابان", reading: "اليابان" },
        { word: "؟" },
      ],
      chunks: [
        {
          arabic: [{ word: "هل" }],
          meaning: "Do",
          grammar: "Question particle",
        },
        {
          arabic: [{ word: "تعيش" }],
          meaning: "live",
          grammar: "Verb",
        },
        {
          arabic: [{ word: "في" }],
          meaning: "in",
          grammar: "Preposition",
        },
        {
          arabic: [{ word: "اليابان", reading: "اليابان" }],
          meaning: "Japan",
          grammar: "Noun",
        },
        {
          arabic: [{ word: "؟" }],
          meaning: "question",
          grammar: "Punctuation",
        },
      ],
    },
  ],
};

const casualExample = {
  arabic: [
    { word: "هل" },
    { word: "بتعيش" },
    { word: "في" },
    { word: "اليابان", reading: "اليابان" },
    { word: "؟" },
  ],
  grammarBreakdown: [
    {
      english: "Do you live in Japan?",
      arabic: [
        { word: "هل" },
        { word: "بتعيش" },
        { word: "في" },
        { word: "اليابان", reading: "اليابان" },
        { word: "؟" },
      ],
      chunks: [
        {
          arabic: [{ word: "هل" }],
          meaning: "Do",
          grammar: "Question particle",
        },
        {
          arabic: [{ word: "بتعيش" }],
          meaning: "live",
          grammar: "Verb",
        },
        {
          arabic: [{ word: "في" }],
          meaning: "in",
          grammar: "Preposition",
        },
        {
          arabic: [{ word: "اليابان", reading: "اليابان" }],
          meaning: "Japan",
          grammar: "Noun",
        },
        {
          arabic: [{ word: "؟" }],
          meaning: "question",
          grammar: "Punctuation",
        },
      ],
    },
  ],
};

export async function GET(req) {
  const speech = req.nextUrl.searchParams.get("speech") || "formal";
  const speechExample = speech === "formal" ? formalExample : casualExample;

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an Emarati Arabic language teacher. 
Your student asks you how to say something from English to Emarati Arabic Dielect.
You should respond with: 
- english: the english version ex: "Do you live in Japan?"
- arabic: the arabic translation split into words ex: ${JSON.stringify(
          speechExample.arabic
        )}
- grammarBreakdown: an explanation of the grammar structure per sentence ex: ${JSON.stringify(
          speechExample.grammarBreakdown
        )}
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
        content: `How to say ${
          req.nextUrl.searchParams.get("question") ||
          "How are you doing?"
        } in Arabic in ${speech} speech?`,
      },
    ],
    model: "tiiuae/falcon-180B-chat",
    response_format: {
      type: "json_object",
    },
  });

  console.log(chatCompletion.choices[0].message.content);
  return Response.json(JSON.parse(chatCompletion.choices[0].message.content));
}
