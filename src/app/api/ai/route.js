import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env["AI71_API_KEY"],
  baseURL: process.env["AI71_BASE_URL"],
});


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
	  ]
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
	  ]
	},
	additionalExamples: {
	  formal: {
		arabic: [
		  { word: "كيف" },
		  { word: "حالك", reading: "حالك" },
		  { word: "؟" }
		],
		grammarBreakdown: [
		  {
			english: "How are you?",
			arabic: [
			  { word: "كيف" },
			  { word: "حالك", reading: "حالك" },
			  { word: "؟" }
			],
			chunks: [
			  {
				arabic: [{ word: "كيف" }],
				meaning: "How",
				grammar: "Interrogative word used to ask about state or condition."
			  },
			  {
				arabic: [{ word: "حالك", reading: "حالك" }],
				meaning: "your condition",
				grammar: "Noun phrase, with 'حال' meaning condition and 'ك' indicating second person singular possessive."
			  },
			  {
				arabic: [{ word: "؟" }],
				meaning: "question mark",
				grammar: "Punctuation indicating a question."
			  }
			]
		  }
		]
	  },
	  casual: {
		arabic: [
		  { word: "كيفك", reading: "كيفك" },
		  { word: "؟" }
		],
		grammarBreakdown: [
		  {
			english: "How are you?",
			arabic: [
			  { word: "كيفك", reading: "كيفك" },
			  { word: "؟" }
			],
			chunks: [
			  {
				arabic: [{ word: "كيفك", reading: "كيفك" }],
				meaning: "How are you?",
				grammar: "Colloquial expression combining 'كيف' (how) and 'ك' (you, informal)."
			  },
			  {
				arabic: [{ word: "؟" }],
				meaning: "question mark",
				grammar: "Punctuation indicating a question."
			  }
			]
		  }
		]
	  },
	  newFormalExample: {
		arabic: [
		  { word: "متى" },
		  { word: "موعد", reading: "موعد" },
		  { word: "الاجتماع", reading: "الاجتماع" },
		  { word: "؟" }
		],
		grammarBreakdown: [
		  {
			english: "When is the meeting?",
			arabic: [
			  { word: "متى" },
			  { word: "موعد", reading: "موعد" },
			  { word: "الاجتماع", reading: "الاجتماع" },
			  { word: "؟" }
			],
			chunks: [
			  {
				arabic: [{ word: "متى" }],
				meaning: "When",
				grammar: "Interrogative word used to ask about time."
			  },
			  {
				arabic: [{ word: "موعد", reading: "موعد" }],
				meaning: "the time",
				grammar: "Noun meaning the time or appointment."
			  },
			  {
				arabic: [{ word: "الاجتماع", reading: "الاجتماع" }],
				meaning: "of the meeting",
				grammar: "Noun meaning the meeting."
			  },
			  {
				arabic: [{ word: "؟" }],
				meaning: "question mark",
				grammar: "Punctuation indicating a question."
			  }
			]
		  }
		]
	  },
	  newCasualExample: {
		arabic: [
		  { word: "إيمتى", reading: "إيمتى" },
		  { word: "الاجتماع", reading: "الاجتماع" },
		  { word: "؟" }
		],
		grammarBreakdown: [
		  {
			english: "When is the meeting?",
			arabic: [
			  { word: "إيمتى", reading: "إيمتى" },
			  { word: "الاجتماع", reading: "الاجتماع" },
			  { word: "؟" }
			],
			chunks: [
			  {
				arabic: [{ word: "إيمتى", reading: "إيمتى" }],
				meaning: "When",
				grammar: "Colloquial interrogative word used to ask about time."
			  },
			  {
				arabic: [{ word: "الاجتماع", reading: "الاجتماع" }],
				meaning: "the meeting",
				grammar: "Noun meaning the meeting."
			  },
			  {
				arabic: [{ word: "؟" }],
				meaning: "question mark",
				grammar: "Punctuation indicating a question."
			  }
			]
		  }
		]
	  },
	  anotherFormalExample: {
		arabic: [
		  { word: "هل" },
		  { word: "أنت", reading: "أنت" },
		  { word: "مستعد", reading: "مستعد" },
		  { word: "؟" }
		],
		grammarBreakdown: [
		  {
			english: "Are you ready?",
			arabic: [
			  { word: "هل" },
			  { word: "أنت", reading: "أنت" },
			  { word: "مستعد", reading: "مستعد" },
			  { word: "؟" }
			],
			chunks: [
			  {
				arabic: [{ word: "هل" }],
				meaning: "Are",
				grammar: "Interrogative particle used to form yes/no questions."
			  },
			  {
				arabic: [{ word: "أنت", reading: "أنت" }],
				meaning: "you",
				grammar: "Pronoun for the second person singular."
			  },
			  {
				arabic: [{ word: "مستعد", reading: "مستعد" }],
				meaning: "ready",
				grammar: "Adjective meaning prepared or ready."
			  },
			  {
				arabic: [{ word: "؟" }],
				meaning: "question mark",
				grammar: "Punctuation indicating a question."
			  }
			]
		  }
		]
	  },
	  anotherCasualExample: {
		arabic: [
		  { word: "جاهز", reading: "جاهز" },
		  { word: "؟" }
		],
		grammarBreakdown: [
		  {
			english: "Are you ready?",
			arabic: [
			  { word: "جاهز", reading: "جاهز" },
			  { word: "؟" }
			],
			chunks: [
			  {
				arabic: [{ word: "جاهز", reading: "جاهز" }],
				meaning: "Ready",
				grammar: "Colloquial adjective meaning prepared or ready."
			  },
			  {
				arabic: [{ word: "؟" }],
				meaning: "question mark",
				grammar: "Punctuation indicating a question."
			  }
			]
		  },
		  
		]
	  }
	},
	secondexampleformal: { 
		"english": "apple", 
		"arabic": [{"word": "تفاح"}], 
		"grammarBreakdown": [
		  {
			"english": "apple",
			"arabic": [{"word": "تفاح"}],
			"chunks": [
			  {
				"arabic": [{"word": "تفاح"}],
				"meaning": "apple",
				"grammar": "Noun used to refer to the fruit, singular form."
			  }
			]
		  }
		]
	  },
	secondexamplecasual: { 
		"english": "apple", 
		"arabic": [{"word": "تفاح"}], 
		"grammarBreakdown": [
		  {
			"english": "apple",
			"arabic": [{"word": "تفاح"}],
			"chunks": [
			  {
				"arabic": [{"word": "تفاح"}],
				"meaning": "apple",
				"grammar": "Noun used to refer to the fruit, singular form."
			  }
			]
		  }
		]
	}
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
          content: `You are an Emirati Arabic language teacher. 
          Your student asks you how to say something from English to Emirati Arabic Dialect.
          You should respond with: 
          - english: the English version e.g., "what is your name?"
          - arabic: the Arabic translation split into words e.g., ${JSON.stringify(speechExample.arabic)}
          - grammarBreakdown: an explanation of the grammar structure per sentence e.g., ${JSON.stringify(speechExample.grammarBreakdown)}
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
