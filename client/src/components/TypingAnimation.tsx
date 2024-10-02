import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {

  return (
    <TypeAnimation
      sequence={[
        "Chat With Your OWN AI",
        1000,
        "Built With OpenAI 🤖",
        2000,
        "Your Own Customized ChatGPT 💻",
        1500,
      ]}
      speed={50}
      className="type-animation"
      repeat={Infinity}
    />
  );
};

export default TypingAnimation;