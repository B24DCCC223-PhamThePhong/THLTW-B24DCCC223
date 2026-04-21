import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">

      {/* Avatar */}
      <img
        src="https://i.pravatar.cc/150"
        alt="avatar"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />

      {/* Name */}
      <h1 className="text-2xl font-bold">Nguyễn Văn A</h1>

      {/* Bio */}
      <p className="text-gray-600 mt-2">
        Frontend Developer yêu thích React, UI/UX và xây dựng ứng dụng web hiện đại.
      </p>

      {/* Skills */}
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Kỹ năng</h2>
        <div className="flex justify-center gap-2 flex-wrap">
          {["React", "TypeScript", "Tailwind", "Node.js"].map(skill => (
            <span
              key={skill}
              className="bg-gray-200 px-3 py-1 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="flex justify-center gap-6 mt-6 text-xl">
        <a href="https://github.com" target="_blank">
          <FaGithub />
        </a>
        <a href="https://facebook.com" target="_blank">
          <FaFacebook />
        </a>
        <a href="https://linkedin.com" target="_blank">
          <FaLinkedin />
        </a>
      </div>

    </div>
  );
}