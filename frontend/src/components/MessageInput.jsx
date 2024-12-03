import { useState, useRef } from "react";
import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="w-4 h-4 text-base-100" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400  "
            }`}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-circle btn-sm"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

/*
///! "Why should we hire you?"
"I believe I am a strong fit for this position at Cognizant because of my technical background, eagerness to learn, and ability to adapt quickly to new challenges. As a recent graduate in Computer Science Engineering, I have developed a solid foundation in programming, algorithms, data structures, and problem-solving, with hands-on experience in languages such as Python, Java, and C++.

During my academic years, I worked on several projects that involved [mention any relevant projects, e.g., building a web application, developing a mobile app, working on data analysis, etc.]. These projects helped me hone my technical skills and my ability to work collaboratively in teams—skills that I know are important for success at Cognizant.

I am particularly drawn to Cognizant’s commitment to innovation and excellence in the IT services industry. I admire the company’s focus on digital transformation, and I am eager to contribute to these initiatives by applying my knowledge of [mention any relevant technologies you are familiar with, e.g., cloud computing, AI, machine learning, etc.].

Moreover, I am excited by Cognizant's emphasis on continuous learning and development, and I am confident that my drive to expand my technical knowledge and contribute to meaningful projects will make me an asset to your team. I am motivated by the opportunity to work with diverse clients and projects, which will allow me to grow both professionally and personally."
 */

/*
///! Tell me about yourself
"Hello, my name is Nirmalya, and I am currently pursuing a B.Tech in Computer Science Engineering from ABC College. I completed my secondary education in 2018 with 83% and my higher secondary education in 2020 with 93%, which laid a strong academic foundation for my further studies.

Throughout my academic journey, I have developed a keen interest in programming and web development. I have earned a Python certification from Google, which involved completing projects like a Stone-Paper-Scissors game, a guessing number game, and a simple calculator. Additionally, I am a Wipro-certified Java Developer, further expanding my skill set.

I have technical expertise in various programming languages and frameworks, including HTML, CSS, JavaScript, React, MongoDB, Express, Node.js, MySQL, C++, Java, Python, TypeScript, TailwindCSS, and Next.js. I have actively applied these skills in over 20 HTML, CSS, JS projects, 15 ReactJS projects, 5 Next.js projects, and 5 MERN stack projects. Some of my notable projects include building a sorting visualizer to visualize different sorting algorithms, a chat application using MERN, and an online IDE in the MERN stack.

In addition to my technical abilities, I am always eager to learn new technologies and improve my coding skills. I believe my hands-on experience with various technologies and my problem-solving mindset will allow me to contribute effectively to any project. I’m excited to apply my knowledge and skills in real-world scenarios and grow as a software developer."
*/
