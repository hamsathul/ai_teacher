const { create } = require("zustand");


export const teachers = ["Fatima", "Hamdan"]

export const useAITeacher = create((set, get) => ({

	messages: [],
	currentMessage: null,
	teacher: teachers[0], 
	setTeacher: (teacher) => set({ 
		teacher,
		messages: get().messages.map((message) => {
			message.audioPlayer = null;
			return message;
		}),
	}),
	classroom: "default",
	setClassroom: (classroom) => set({ classroom }),
	furigana: true,
	setFurigana: (furigana) => {
	  set(() => ({
		furigana,
	  }));
	},
	english: true,
	setEnglish: (english) => {
	  set(() => ({
		english,
	  }));
	},
	speech: "formal",
	setSpeech: (speech) => {
	  set(() => ({
		speech,
	  }));
	},
	loading: false,
	askAI: async (question) => {
		if (!question) return;
		const message = {
			question, 
			id: get().messages.length,
		};
		set(() => ({
			loading: true,
		}));

		const speech = get().speech;

		const res = await fetch(`/api/ai?speech=${speech}&question=${question}`);
		const data = await res.json();
		message.answer = data;
		message.speech;

		set(() => ({
			currentMessage: message,
		}));

		set((state) => ({
			messages: [...state.messages, message],
			loading: false,
		}));
		get().playMessage(message);
	},
	playMessage: async (message) => {
		set(() => ({
			currentMessage: message,
		}));
		if (!message.audioPlayer) {
			set(() => ({
				loading: true,
			}));

			const audioRes = await fetch(
				`/api/tts?teacher=${get().teacher}&text=${message.answer.arabic.map((word) => word.word).join(" ")}`
			);
			const audio = await audioRes.blob();
			const visemes = JSON.parse(await audioRes.headers.get("Visemes"));
			const audioUrl = URL.createObjectURL(audio);
			const audioPlayer = new Audio(audioUrl);

			message.audioPlayer = audioPlayer;
			message.visemes = visemes;
			message.audioPlayer.onended = () => {
				set(() => ({
					currentMessage: null,
				}));
			};
			set(() => ({
				loading: false,
				messages: get().messages.map((m) => (m.id === message.id ? message : m)),
			}));
		}
		message.audioPlayer.currentTime = 0;
		message.audioPlayer.play();
	},
	stopMessage: (message) => {
		message.audioPlayer.pause();
		set(() => ({
			currentMessage: null,
		}));
	},
}));