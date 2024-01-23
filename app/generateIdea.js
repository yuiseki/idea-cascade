import adjectives from "./adjectives";

let counter = 0;

async function generateNewText(prompt, openai, limit) {
    counter++;
    if (counter > limit) return "Generation Stopped for safety.";
    
    if (prompt === "") return "Prompt not defined.";

    if (openai === undefined) return "OpenAI not initialized.";
    console.log(prompt)

    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const chatCompletion = await openai.chat.completions.create({
        messages: [{
            role: 'user',
            content: "Generate a new idea for: " + prompt + "\n" +
            "Language: Japanese.\n" + 
            "Idea must be " + adjective + ".\n" +
            "Only output the idea.",
        }],
        model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion);
    const newText = chatCompletion.choices[0].message.content;
    return newText;
}

export default generateNewText;